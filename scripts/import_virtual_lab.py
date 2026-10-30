"""Build the resistance lab for this site's subdirectory and record its provenance."""
from pathlib import Path
from datetime import datetime, timezone
import argparse
import hashlib
import json
import shutil
import subprocess
import tempfile


root = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('source', type=Path, help='Checkout of virtual-physics-lab with dependencies installed')
source = parser.parse_args().source.resolve()
inputs = ['src', 'public', 'index.html', 'package.json', 'package-lock.json',
          'tsconfig*', 'vite.config.*']
changes = subprocess.check_output(
    ['git', 'status', '--porcelain', '--untracked-files=all', '--', *inputs],
    cwd=source, text=True)
if changes:
    raise SystemExit('Commit the lab build inputs before importing:\n' + changes)
commit = subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=source, text=True).strip()
qa = root / 'qa'
qa.mkdir(exist_ok=True)
staging = Path(tempfile.mkdtemp(prefix='virtual-lab-build-', dir=qa))
subprocess.run(['npm', 'run', 'build', '--', '--base=/lab/resistance/',
                '--outDir=' + str(staging)], cwd=source, check=True)
page = staging / 'index.html'
text = page.read_text(encoding='utf-8')
assert '/lab/resistance/assets/' in text, 'Lab assets must use the subdirectory'
assert (staging / 'THREE-LICENSE.txt').is_file(), 'Keep the Three.js license with the release'
text = text.replace('<head>', '<head>\n    <script src="/assets/virtual-lab-site.js"></script>', 1)
page.write_text(text, encoding='utf-8')
target = root / 'dist/lab/resistance'
shutil.copytree(staging, target, dirs_exist_ok=True)
files = {
    path.relative_to(staging).as_posix(): hashlib.sha256(path.read_bytes()).hexdigest()
    for path in sorted(staging.rglob('*')) if path.is_file()
}
(target / 'release.json').write_text(json.dumps({
    'source_repository': 'https://github.com/phytnesskun/virtual-physics-lab',
    'source_commit': commit,
    'built_at': datetime.now(timezone.utc).isoformat(),
    'base': '/lab/resistance/',
    'integration_script': '/assets/virtual-lab-site.js',
    'sha256': files,
}, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Imported {len(files)} lab files from {commit[:12]} into {target}')
