"""Prepare the small static site. Run with the bundled Python runtime."""
from pathlib import Path
import json
import html

root = Path(__file__).resolve().parent
dist = root / 'dist'
origin = 'https://bingkun-qi-lab.bingkunq.chatgpt.site'
data = json.loads((dist / 'assets/content.json').read_text(encoding='utf-8-sig'))
pages = [('', '亓炳堃 Bingkun Qi', '亓炳堃的个人网站。探索物理研究、国际课程教学与 AI 教学工具。'),
         ('research', '研究与论文 — Bingkun Qi', '非厄米光子学、PT 对称性与光学零模相关研究及精选论文。'),
         ('about', '关于亓炳堃 — Bingkun Qi', '国际学校理科教师与理论物理研究者，亚利桑那州立大学工程硕士。')]
for p in data['zh']['projects']:
    pages.append((f"projects/{p['id']}", p['title'] + ' — Bingkun Qi', p['summary']))
for route, title, description in pages:
    directory = dist / route
    directory.mkdir(parents=True, exist_ok=True)
    canonical = origin + '/' + (route + '/' if route else '')
    document = f'''<!doctype html>
<html lang="zh-CN"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{html.escape(title)}</title><meta name="description" content="{html.escape(description, quote=True)}">
<meta name="theme-color" content="#080d18"><meta property="og:type" content="website">
<meta property="og:title" content="{html.escape(title, quote=True)}"><meta property="og:description" content="{html.escape(description, quote=True)}">
<meta property="og:url" content="{canonical}"><meta property="og:image" content="{origin}/assets/portrait.png">
<link rel="canonical" href="{canonical}"><link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/style.css"><script src="/assets/wave-lab.js" defer></script><script src="/assets/app.js" defer></script>
</head><body id="top"><div id="app"><main class="wrap inner-main"><p class="eyebrow">BINGKUN QI / 亓炳堃</p><h1>{html.escape(title)}</h1><p>{html.escape(description)}</p><noscript><p>请启用 JavaScript 以浏览完整网站。 Please enable JavaScript to browse this website.</p><a href="https://scholar.google.com/citations?user=V6ELkxMAAAAJ">Google Scholar</a></noscript></main></div></body></html>'''
    (directory / 'index.html').write_text(document, encoding='utf-8')
(dist / 'robots.txt').write_text(f'User-agent: *\nAllow: /\nSitemap: {origin}/sitemap.xml\n', encoding='utf-8')
urls = ''.join(f'<url><loc>{origin}/{route + "/" if route else ""}</loc></url>' for route, _, _ in pages)
(dist / 'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + urls + '</urlset>', encoding='utf-8')
print(f'Prepared {len(pages)} pages')
