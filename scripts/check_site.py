"""Check generated routes, metadata and local resources without third-party packages."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
import json


root = Path(__file__).resolve().parents[1]
dist = root / 'dist'
data = json.loads((dist / 'assets/content.json').read_text(encoding='utf-8-sig'))
origin = 'https://bingkun-qi-lab.bingkunq.chatgpt.site'


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path = path
        self.links = []
        self.ids = set()
        self.canonical = []
        self.alternates = {}
        self.language = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            assert attrs['id'] not in self.ids, f'Duplicate ID in {self.path}: {attrs["id"]}'
            self.ids.add(attrs['id'])
        if tag == 'html':
            self.language = attrs.get('lang')
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonical.append(attrs['href'])
        if tag == 'link' and attrs.get('rel') == 'alternate':
            self.alternates[attrs['hreflang']] = attrs['href']
        for name in ('src', 'href'):
            if attrs.get(name):
                self.links.append(attrs[name])


pages = {}
for path in sorted(dist.rglob('*.html')):
    relative = path.relative_to(dist).as_posix()
    parser = Page(relative)
    parser.feed(path.read_text(encoding='utf-8-sig'))
    pages[relative] = parser

checked = 0
for relative, page in pages.items():
    for link in page.links:
        url = urlsplit(urljoin('/' + relative, link))
        assert url.scheme != 'file', f'Local file URL in {relative}'
        assert url.hostname not in {'localhost', '127.0.0.1'}, f'Preview URL in {relative}'
        if url.scheme or url.netloc:
            continue
        target = dist / unquote(url.path).lstrip('/')
        assert target.resolve().is_relative_to(dist.resolve()), f'Escaping path: {link}'
        if target.is_dir():
            target /= 'index.html'
        assert target.is_file(), f'Missing resource from {relative}: {link}'
        if url.fragment and target.suffix == '.html':
            target_page = pages[target.relative_to(dist).as_posix()]
            assert unquote(url.fragment) in target_page.ids, f'Missing anchor from {relative}: {link}'
        checked += 1

ids = [project['id'] for project in data['zh']['projects']]
assert len(ids) == len(set(ids)), 'Duplicate project IDs'
assert ids == [project['id'] for project in data['en']['projects']], 'Language route mismatch'
routes = ['', 'about', 'research', 'teaching'] + ['projects/' + item for item in ids]
for language in ('zh', 'en'):
    for route in routes:
        relative = f'{language}/{route + "/" if route else ""}index.html'
        page = pages[relative]
        assert page.language == ('zh-CN' if language == 'zh' else 'en'), relative
        assert page.canonical == [origin + '/' + language + '/' + (route + '/' if route else '')], relative
        for code, hreflang in [('zh', 'zh-CN'), ('en', 'en'), ('zh', 'x-default')]:
            expected = origin + '/' + code + '/' + (route + '/' if route else '')
            assert page.alternates.get(hreflang) == expected, relative
    for project in data[language]['projects']:
        if project.get('cover'):
            assert (dist / 'assets' / project['cover']['file']).is_file(), project['id']
        for resource in project.get('downloads', []):
            pdf = dist / resource['url'].lstrip('/')
            assert pdf.read_bytes().startswith(b'%PDF-'), resource['url']
    for lesson in data[language]['physicsHub']['lessons']:
        assert (dist / 'assets' / f'lab-{lesson["id"]}.svg').is_file(), lesson['id']
        if lesson.get('available') is False:
            assert lesson['status'], lesson['id']

print(f'PASS: {len(pages)} HTML files, {len(routes) * 2} localized routes, '
      f'{checked} local references, metadata and lesson resources.')
