"""Build localized static entry pages from the site's shared, verified content."""
from pathlib import Path
import html
import json


root = Path(__file__).resolve().parent
dist = root / 'dist'
origin = 'https://bingkun-qi-lab.bingkunq.chatgpt.site'
scholar = 'https://scholar.google.com/citations?user=V6ELkxMAAAAJ&hl=en'
github = 'https://github.com/phytnesskun'
data = json.loads((dist / 'assets/content.json').read_text(encoding='utf-8-sig'))

labels = {
    'zh': {
        'html_lang': 'zh-CN', 'locale': 'zh_CN',
        'home': '首页', 'about': '关于', 'research': '研究与论文',
        'teaching': '教学与学习工具', 'projects': '教学工具与项目',
        'education': '学习与研究经历', 'experience': '教学经历',
        'life': '书桌之外', 'features': '功能与使用场景',
        'overview': '项目介绍', 'visit': '访问项目',
        'explainers': '从一个问题读懂研究', 'source': '阅读原文',
        'learning_goal': '学习目标', 'lab': '波的叠加实验',
        'skip': '跳至正文', 'nav': '主导航', 'languages': '语言',
        'home_title': '亓炳堃 Bingkun Qi — 物理 · 教学 · AI',
        'about_title': '关于亓炳堃 — Bingkun Qi',
        'research_description': '非厄米光子学、PT 对称性与光学零模相关研究及精选论文。',
        'teaching_description': '物理、数学与高等数学教学经历，以及从课堂需求出发开发的题库和学生反馈工具。',
        'noscript': '此页提供完整文字内容；启用 JavaScript 可体验交互演示与完整视觉界面。',
    },
    'en': {
        'html_lang': 'en', 'locale': 'en_US',
        'home': 'Home', 'about': 'About', 'research': 'Research & publications',
        'teaching': 'Teaching & learning tools', 'projects': 'Teaching tools & projects',
        'education': 'Learning & research', 'experience': 'Teaching experience',
        'life': 'Beyond the desk', 'features': 'Features and use cases',
        'overview': 'About this project', 'visit': 'Open project',
        'explainers': 'A question to enter the research', 'source': 'Read the source',
        'learning_goal': 'Learning goal', 'lab': 'Wave superposition lab',
        'skip': 'Skip to content', 'nav': 'Main navigation', 'languages': 'Language',
        'home_title': 'Bingkun Qi — Physics · Teaching · AI',
        'about_title': 'About Bingkun Qi',
        'research_description': 'Selected research and publications on non-Hermitian photonics, parity–time symmetry and photonic zero modes.',
        'teaching_description': 'Teaching physics, mathematics and advanced mathematics, with question banks and student feedback tools built around classroom needs.',
        'noscript': 'The full text is available on this page. Enable JavaScript for interactive demonstrations and the complete visual experience.',
    },
}


def esc(value):
    return html.escape(str(value), quote=True)


def localized_path(language, route=''):
    return f'/{language}/' + (f'{route}/' if route else '')


def localized_url(language, route=''):
    return origin + localized_path(language, route)


def paragraphs(values):
    return ''.join(f'<p>{esc(value)}</p>' for value in values)


def item_list(values):
    return '<ul>' + ''.join(f'<li>{esc(value)}</li>' for value in values) + '</ul>'


def project_cards(language, projects):
    return ''.join(
        f'<article><p class="small-label">{esc(project["kicker"])}</p>'
        f'<h3><a href="{localized_path(language, "projects/" + project["id"])}">'
        f'{esc(project["title"])}</a></h3>'
        f'<p>{esc(project["summary"])}</p></article>'
        for project in projects
    )


def paper_cards(papers):
    return ''.join(
        f'<article><p class="paper-meta">{esc(paper["journal"])} · {esc(paper["year"])}</p>'
        f'<h3><a href="{esc(paper["url"])}">{esc(paper["title"])}</a></h3>'
        f'<p class="authors">{esc(paper["authors"])}</p>'
        f'<p>{esc(paper["summary"])}</p></article>'
        for paper in papers
    )


def explainer_cards(language, explainers):
    t = labels[language]
    return ''.join(
        f'<article id="{esc(item["id"])}"><h3>{esc(item["title"])}</h3>'
        f'<p><strong>{esc(item["question"])}</strong></p>'
        f'{paragraphs([item["why"], item["finding"], item["credit"]])}'
        f'<p><a href="{esc(item["sourceUrl"])}">{esc(t["source"])}</a></p></article>'
        for item in explainers
    )


def teaching_example(language, example):
    t = labels[language]
    sections = [
        f'<p class="eyebrow">{esc(example["eyebrow"])}</p>',
        paragraphs([example['duration']]),
        f'<section><h2>{esc(t["learning_goal"])}</h2>'
        f'<p>{esc(example["learningGoal"])}</p></section>',
        f'<section><h2>{esc(example["assumptionsTitle"])}</h2>'
        f'{item_list(example["assumptions"])}</section>',
    ]
    for index, step in enumerate(example['steps']):
        equations = ''.join(
            f'<p class="static-equation">{esc(equation)}</p>'
            for equation in step.get('equations', [])
        )
        sections.append(
            f'<section><p class="small-label">{esc(step["time"])}</p>'
            f'<h2>{esc(step["title"])}</h2><p>{esc(step["text"])}</p>'
            f'{equations}{item_list(step["prompts"])}</section>'
        )
        if index == 1:
            sections.append(
                f'<section aria-label="{esc(t["lab"])}"><wave-lab lang="{language}"></wave-lab></section>'
            )
    table = example.get('predictionTable')
    if table:
        table_head = ''.join(f'<th scope="col">{esc(cell)}</th>' for cell in table['headers'])
        table_rows = ''.join(
            '<tr>' + ''.join(f'<td>{esc(cell)}</td>' for cell in row) + '</tr>'
            for row in table['rows']
        )
        sections.append(
            f'<section><h2>{esc(table["title"])}</h2><div class="static-table-wrap">'
            f'<table><thead><tr>{table_head}</tr></thead><tbody>{table_rows}</tbody></table></div></section>'
        )
    challenge = example['challenge']
    sections.append(
        f'<section><p class="small-label">{esc(challenge["time"])}</p>'
        f'<h2>{esc(challenge["title"])}</h2>'
        f'{paragraphs([challenge["question"], challenge["extension"]])}</section>'
    )
    answers = ''.join(
        f'<article><h3>{esc(answer["label"])}</h3><p>{esc(answer["text"])}</p></article>'
        for answer in example['answers']
    )
    sections.append(
        f'<section><h2>{esc(example["answersTitle"])}</h2>{answers}</section>'
    )
    for title_key, text_key in [('keyDistinctionTitle', 'keyDistinction'),
                              ('teachingTipTitle', 'teachingTip')]:
        sections.append(
            f'<section><h2>{esc(example[title_key])}</h2><p>{esc(example[text_key])}</p></section>'
        )
    sections.append(paragraphs([example['scopeNote']]))
    return ''.join(sections)


def page_details(language, route):
    """Use the same source as the interactive page, including each project's copy."""
    d, t = data[language], labels[language]
    if not route:
        return t['home_title'], d['about']['intro']
    if route == 'about':
        return t['about_title'], d['about']['intro']
    if route == 'research':
        return f'{t["research"]} — Bingkun Qi', t['research_description']
    if route == 'teaching':
        return f'{d["teachingOverview"]["title"]} — Bingkun Qi', d['teachingOverview']['intro']
    project_id = route.removeprefix('projects/')
    project = next(p for p in d['projects'] if p['id'] == project_id)
    return f'{project["title"]} — Bingkun Qi', project['summary']


def physics_hub(language):
    hub = data[language]['physicsHub']
    cards = ''.join(
        f'<article><p class="small-label">{i+1:02d} / {esc(lesson["category"])} · 9702 {esc(lesson["syllabus"])}</p>'
        + (f'<h3>{esc(lesson["title"])}</h3><p>{esc(lesson["status"])}</p>'
           if lesson.get('available') is False else
           f'<h3><a href="{esc(lesson["url"])}" target="_blank" rel="noopener noreferrer">{esc(lesson["title"])} ↗</a></h3>') +
        f'<p>{esc(lesson["description"])}</p></article>'
        for i, lesson in enumerate(hub['lessons'])
    )
    return (f'<section id="physics-lab"><h2>{esc(hub["title"])}</h2><p>{esc(hub["intro"])}</p>'
            f'<p>{esc(hub["badge"])} · {esc(hub["course"])}</p>{cards}<p>{esc(hub["access"])}</p></section>')


def fallback_content(language, route):
    """Keep meaningful copy and navigation available before JS or without it."""
    d, t = data[language], labels[language]
    title, description = page_details(language, route)
    navigation = []
    for target, key in [('', 'home'), ('teaching', 'teaching'),
                        ('research', 'research'), ('about', 'about')]:
        current = ' aria-current="page"' if route == target else ''
        navigation.append(
            f'<a href="{localized_path(language, target)}"{current}>{esc(t[key])}</a>'
        )
    navigation.insert(1, f'<a href="{localized_path(language)}#physics-lab">'
                      f'{"物理演示" if language == "zh" else "Physics demos"}</a>')
    language_links = ' / '.join(
        f'<a href="{localized_path(code, route)}" lang="{labels[code]["html_lang"]}"'
        f' hreflang="{labels[code]["html_lang"]}">{name}</a>'
        for code, name in [('zh', '中文'), ('en', 'English')]
    )
    sections = []
    if not route:
        sections.append(paragraphs(d['about']['paragraphs']))
        sections.append(f'<section id="projects"><h2>{esc(t["projects"])}</h2>'
                        f'{project_cards(language, d["projects"])}</section>')
        sections.append(physics_hub(language))
        sections.append(f'<section><h2>{esc(t["research"])}</h2>'
                        f'{paper_cards(d["papers"])}</section>')
    elif route == 'about':
        sections.append(paragraphs(d['about']['paragraphs']))
        education = ''.join(
            f'<article><h3>{esc(item["institution"])}</h3>'
            f'<p>{esc(item["detail"])}</p><p>{esc(item["period"])}</p></article>'
            for item in d['education']
        )
        sections.append(f'<section><h2>{esc(t["education"])}</h2>{education}</section>')
        sections.append(f'<section><h2>{esc(t["experience"])}</h2>'
                        f'{item_list(d["about"]["teaching"])}</section>')
        sections.append(f'<section><h2>{esc(t["life"])}</h2>'
                        f'{item_list(d["about"]["life"])}</section>')
    elif route == 'research':
        if d.get('explainers'):
            sections.append(f'<section><h2>{esc(t["explainers"])}</h2>'
                            f'{explainer_cards(language, d["explainers"])}</section>')
        sections.append(f'<section><h2>{esc(t["research"])}</h2>'
                        f'{paper_cards(d["papers"])}</section>')
    elif route == 'teaching':
        sample = next(p for p in d['projects'] if p['id'] == 'teaching-design')
        sections.append(project_cards(language, [sample]))
        sections.append(f'<p><a href="{localized_path(language)}#physics-lab">{esc(d["physicsHub"]["teachingLink"])} →</a></p>')
        if d.get('teachingExample'):
            sections.append(teaching_example(language, d['teachingExample']))
        sections.append(f'<section><h2>{esc(t["experience"])}</h2>'
                        f'{item_list(d["about"]["teaching"])}</section>')
        sections.append(paragraphs(d['about']['paragraphs'][-1:]))
        sections.append(f'<section id="projects"><h2>{esc(t["projects"])}</h2>'
                        f'{project_cards(language, d["projects"])}</section>')
    else:
        project = next(p for p in d['projects'] if route == f'projects/{p["id"]}')
        sections.append(f'<section><h2>{esc(t["overview"])}</h2>'
                        f'{paragraphs(project["story"])}</section>')
        sections.append(f'<section><h2>{esc(t["features"])}</h2>'
                        f'{item_list(project["features"])}</section>')
        if project.get('status'):
            sections.append(f'<p>{esc(project["status"])}</p>')
        case = project.get('case')
        if case:
            sections.append(f'<section><h2>{esc(case["title"])}</h2>')
            for heading, text in case['cards']:
                sections.append(f'<h3>{esc(heading)}</h3><p>{esc(text)}</p>')
            for image in case.get('images', []):
                sections.append(f'<figure><img src="/assets/{esc(image[0])}" '
                                f'alt="{esc(image[1])}" style="max-width:100%;height:auto">'
                                f'<figcaption>{esc(image[1])}</figcaption></figure>')
            for heading, text in case['steps']:
                sections.append(f'<h3>{esc(heading)}</h3><p>{esc(text)}</p>')
            sections.append(f'<p>{esc(case["note"])}</p></section>')
        if project.get('downloads'):
            sections.append('<section id="lesson-resources"><h2>'
                            + ('课例材料' if language == 'zh' else 'Lesson materials') + '</h2>')
            sections.append(f'<p>{esc(project["sampleNote"])}</p>')
            for item in project['downloads']:
                sections.append(f'<p><a href="{esc(item["url"])}">{esc(item["label"])}</a></p>')
            sections.append('</section>')
        if project.get('url'):
            sections.append(f'<p><a href="{esc(project["url"])}">'
                            f'{esc(project.get("actionLabel", t["visit"]))}</a></p>')
        sections.append(f'<section><h2>{esc(t["projects"])}</h2>'
                        f'{project_cards(language, [p for p in d["projects"] if p["id"] != project["id"]])}</section>')
    return (
        f'<a class="skip" href="#main">{esc(t["skip"])}</a>'
        f'<header class="static-header wrap"><a class="brand" href="{localized_path(language)}">'
        f'Bingkun Qi / 亓炳堃</a><nav aria-label="{esc(t["nav"])}">{" ".join(navigation)}</nav>'
        f'<div aria-label="{esc(t["languages"])}">{language_links}</div></header>'
        f'<main id="main" class="wrap inner-main static-main"><p class="eyebrow">PHYSICS / TEACHING / AI</p>'
        f'<h1>{esc(title)}</h1><p>{esc(description)}</p>{"".join(sections)}'
        f'<noscript><p>{esc(t["noscript"])}</p></noscript></main>'
        f'<footer class="static-footer wrap"><span>Bingkun Qi / 亓炳堃</span>'
        f'<a href="{esc(scholar)}">Google Scholar</a></footer>'
    )


def structured_data(language, route, canonical, title, description):
    if route not in ('', 'about'):
        return ''
    person = {
        '@type': 'Person', '@id': origin + '/#person',
        'name': 'Bingkun Qi', 'alternateName': '亓炳堃',
        'url': localized_url(language), 'image': origin + '/assets/portrait.png',
        'description': data[language]['about']['intro'], 'sameAs': [scholar, github],
        'alumniOf': {'@type': 'CollegeOrUniversity', 'name': 'Arizona State University'},
        'hasCredential': {
            '@type': 'EducationalOccupationalCredential',
            'name': 'Master of Engineering, Computing and Technology',
        },
    }
    profile = {
        '@context': 'https://schema.org', '@type': 'ProfilePage',
        '@id': canonical + '#profile', 'url': canonical,
        'name': title, 'description': description,
        'inLanguage': labels[language]['html_lang'], 'mainEntity': person,
    }
    # Keep JSON valid while preventing content from closing the script element.
    serialized = json.dumps(profile, ensure_ascii=False).replace('<', '\\u003c')
    return f'<script type="application/ld+json">{serialized}</script>'


def write_page(language, route, output_route):
    t = labels[language]
    title, description = page_details(language, route)
    canonical = localized_url(language, route)
    alternates = ''.join(
        f'<link rel="alternate" hreflang="{labels[code]["html_lang"]}"'
        f' href="{localized_url(code, route)}">'
        for code in labels
    ) + f'<link rel="alternate" hreflang="x-default" href="{localized_url("zh", route)}">'
    other_locale = labels['en' if language == 'zh' else 'zh']['locale']
    document = f'''<!doctype html>
<html lang="{t['html_lang']}"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{esc(title)}</title><meta name="description" content="{esc(description)}">
<meta name="theme-color" content="#080d18"><meta property="og:type" content="website">
<meta property="og:site_name" content="Bingkun Qi / 亓炳堃">
<meta property="og:title" content="{esc(title)}"><meta property="og:description" content="{esc(description)}">
<meta property="og:url" content="{canonical}"><meta property="og:image" content="{origin}/assets/share-card.png">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Bingkun Qi / 亓炳堃"><meta property="og:locale" content="{t['locale']}">
<meta property="og:locale:alternate" content="{other_locale}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{esc(title)}"><meta name="twitter:description" content="{esc(description)}">
<meta name="twitter:image" content="{origin}/assets/share-card.png">
<link rel="canonical" href="{canonical}">{alternates}
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/style.css"><link rel="stylesheet" href="/assets/enhancements.css"><link rel="stylesheet" href="/assets/physics-hub.css">
<script src="/assets/wave-lab.js" defer></script><script src="/assets/enhancements.js" defer></script><script src="/assets/app.js" defer></script>
<style>
.static-header{{display:flex;flex-wrap:wrap;align-items:center;gap:20px;padding-block:28px;border-bottom:1px solid var(--line)}}
.static-header nav{{display:flex;flex-wrap:wrap;gap:18px}}.static-header a:hover,.static-main a:hover{{text-decoration:underline}}
.static-main{{max-width:900px;padding-bottom:48px;overflow-wrap:anywhere}}.static-main h1{{margin-bottom:24px;font-size:clamp(32px,5vw,58px)}}
.static-main section{{margin-top:48px}}.static-main h2{{margin-bottom:24px}}.static-main article{{padding-block:24px;border-bottom:1px solid var(--line)}}
.static-main h3{{margin:10px 0}}.static-main li+li{{margin-top:10px}}.static-footer{{display:flex;flex-wrap:wrap;gap:24px;padding-block:24px;border-top:1px solid var(--line)}}
.static-equation{{font-family:monospace;white-space:normal}}.static-table-wrap{{overflow-x:auto}}.static-main table{{border-collapse:collapse;width:100%}}
.static-main th,.static-main td{{border:1px solid var(--line);padding:12px;text-align:left;min-width:70px}}
</style>
{structured_data(language, route, canonical, title, description)}
</head><body id="top" data-language="{language}"><div id="app">{fallback_content(language, route)}</div></body></html>'''
    directory = dist / output_route
    directory.mkdir(parents=True, exist_ok=True)
    (directory / 'index.html').write_text(document, encoding='utf-8')


routes = ['', 'about', 'research', 'teaching'] + [
    f'projects/{project["id"]}' for project in data['zh']['projects']
]
if {project['id'] for project in data['zh']['projects']} != {
    project['id'] for project in data['en']['projects']
}:
    raise ValueError('Chinese and English project routes must match.')

for language in labels:
    for route in routes:
        write_page(language, route, f'{language}/{route}'.rstrip('/'))

# Keep existing links usable; their canonical URL points to the Chinese edition.
for route in routes:
    write_page('zh', route, route)

(dist / 'robots.txt').write_text(
    f'User-agent: *\nAllow: /\nSitemap: {origin}/sitemap.xml\n', encoding='utf-8'
)
sitemap_entries = []
for language in labels:
    for route in routes:
        alternates = ''.join(
            f'<xhtml:link rel="alternate" hreflang="{labels[code]["html_lang"]}"'
            f' href="{localized_url(code, route)}"/>'
            for code in labels
        )
        alternates += (
            f'<xhtml:link rel="alternate" hreflang="x-default"'
            f' href="{localized_url("zh", route)}"/>'
        )
        sitemap_entries.append(
            f'<url><loc>{localized_url(language, route)}</loc>{alternates}</url>'
        )
(dist / 'sitemap.xml').write_text(
    '<?xml version="1.0" encoding="UTF-8"?>'
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'
    ' xmlns:xhtml="http://www.w3.org/1999/xhtml">'
    + ''.join(sitemap_entries) + '</urlset>', encoding='utf-8'
)
print(f'Prepared {len(routes) * len(labels)} localized pages and {len(routes)} legacy pages')
