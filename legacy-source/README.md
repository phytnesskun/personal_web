# Bingkun Qi personal website

亓炳堃的中英文个人网站，展示物理研究、理科教学、AI 教学工具与个人经历。

Website: https://bingkun-qi-lab.bingkunq.chatgpt.site

The current Sites deployment is private and requires its owner's ChatGPT account. Repository visibility and website access are configured separately.

## Features

- Separate Chinese (`/zh/`) and English (`/en/`) URLs, with in-place language switching that preserves the wave experiment.
- Five project pages, led by the CAIE 9702 AS Physics question bank.
- Student Feedback & Teaching Administration project.
- Selected publications and education background.
- Interactive wave-superposition experiment with phase and amplitude controls.
- Responsive layouts and keyboard-accessible controls.
- Two project case studies with actual interface screenshots and clearly labelled illustrative workflows.
- Two research explainers with original conceptual diagrams and links to the papers.
- A ten-minute wave-superposition lesson and a bilingual printable worksheet.

## Run locally

This is a static website. No npm installation or framework build is required.

With Python 3 installed, run from the repository root:

```sh
python -m http.server 8765 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:8765 in your browser. Serve the files over HTTP; opening `index.html` directly does not support the JSON content request.

## Edit the website

| File | Purpose |
| --- | --- |
| `dist/assets/content.json` | Bilingual biography, education, publications and project details |
| `dist/assets/app.js` | Shared interface copy, page rendering, navigation and language switching |
| `dist/assets/style.css` | Dark technology theme and responsive styles |
| `dist/assets/wave-lab.js` | Self-contained wave-superposition web component |
| `dist/assets/enhancements.js` | Project case studies, research explainers and guided teaching page |
| `dist/assets/enhancements.css` | Responsive styles for the new sections |
| `dist/assets/wave-handout.html` | Two-page bilingual worksheet; browser Print / Save as PDF |
| `dist/assets/portrait.png` | Original supplied portrait asset |
| `build.py` | Generate page shells, metadata, robots.txt and sitemap.xml |
| `.openai/hosting.json` | Existing Sites project identity and static deployment directory |

After changing content or page metadata, regenerate the localized static content:

```sh
python build.py
```

If deploying to another origin, update `origin` in `build.py` and run it again. Internal asset and page URLs assume the site is served at the domain root. GitHub Pages under a repository subpath requires adapting these paths.

The build creates 18 canonical language pages and retains 9 Chinese legacy paths. Each page includes readable static text, localized metadata and `hreflang`; the sitemap lists only canonical language URLs. The original links continue to work. Teaching is at `/zh/teaching/` and `/en/teaching/`.

The `dist` directory is the deployable website. External question banks and the feedback system continue to run independently. Their login credentials and private data are not included here.

## Content notes

- The ASU degree is **Master of Engineering, Computing and Technology**, awarded as confirmed by the owner; no graduation year is assumed.
- CUNY and EPFL entries describe doctoral study and do not claim awarded doctoral degrees.
- The CAIE AS count of 3,232 questions was read from its interface on 22 October 2026.
- The feedback-system description covers its publicly verified interface; internal administration modules were not verified.
- Feedback screenshots contain empty login fields. Its scenario is fictional, local to the portfolio and explicitly labelled; no live student records are used.
- Research diagrams are original conceptual illustrations, not numerical or experimental results. Author order is stated; individual contributions are not inferred.
- The research explainers use https://arxiv.org/abs/1704.04713 and https://arxiv.org/abs/2311.01566. Statements retain the scope and coupling conditions of the papers.

## Deployment

The existing deployment uses Sites. Preserve the project ID in `.openai/hosting.json` when updating it. No GitHub Actions workflow or GitHub Pages publishing is configured in this repository.

Run the following optional syntax checks after changing JavaScript, if Node.js is installed:

```sh
node --check dist/assets/app.js
node --check dist/assets/wave-lab.js
node --check dist/assets/enhancements.js
```

All rights reserved unless the owner chooses a separate license. Linked papers and external tools retain their respective rights.
