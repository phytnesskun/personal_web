# Bingkun Qi personal website

亓炳堃的中英文个人网站。本项目于 2026-10-25 从 Windows 迁移备份恢复。

## 版本与目录

- `dist/`：较新发布版，作为当前预览和后续页面修改的基准。共 54 个文件、28 个 HTML 页面。
- `legacy-source/`：可构建的旧源码快照，包含原 README、`build.py` 和自己的 `dist/`，共 50 个文件。它不代表较新发布版的完整源码。
- `.openai/hosting.json`：保留原 Sites 项目配置，部署目录为顶层 `dist/`。本次迁移不执行部署。

旧构建器仅保留在 `legacy-source/` 内。不要把其输出复制到顶层 `dist/`，否则会覆盖较新版内容。最新完整源码、原 Windows 分支及未提交/未推送内容仍需另行确认。

## 本地预览

在本项目根目录运行，无需安装第三方依赖：

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory dist
```

打开 <http://127.0.0.1:8765/>。页面通过 HTTP 加载 JSON，请勿直接双击 HTML 文件。

若需查看旧版，可使用另一个端口：

```sh
python3 -m http.server 8766 --bind 127.0.0.1 --directory legacy-source/dist
```

旧版构建需要 Python 3.9 或更新版本；该命令只更新 `legacy-source/dist/`：

```sh
python3 legacy-source/build.py
```

当前发布版可直接编辑 `dist/` 内的 HTML/CSS/JS/JSON，但尚未恢复与它完全匹配的生成器。根路径资源链接要求网站部署在域名根目录；推送 GitHub 不等于发布 GitHub Pages。

## 迁移来源与校验

来源基目录：

```text
/Users/bingkunqi/Documents/windows迁移/migration-stage-2026-10-24_115737Z/mac-recovery/run-20261024-210545/
```

- 当前 `dist/` 来自 `projects/web-personal-current/dist/`，原发布包为 `payload/web-portal-dist/caie/work/personal-physics-hub-deploy.tar.gz`。
- `legacy-source/` 来自 `build-checks/web-source-snapshot/`；原始提取基线仍保存在来源目录的 `projects/web-source-snapshot/`。
- 原文件保留不动，旧 `.venv/` 未迁入；Python 环境无需随源码备份。
- 迁入后逐文件 SHA-256 核对通过：当前发布版 54 文件 / 906,811 字节，旧源码 50 文件 / 903,224 字节。
- 当前发布版全部 54 个文件通过本地 HTTP 内容校验；两版共 6 个 JavaScript 文件通过 `node --check`；浏览器中文首页及英文切换已验证。
- 迁入后的旧构建器成功生成 18 个双语入口和 9 个兼容入口，构建前后全部 104 个迁入文件的哈希保持不变。
- Git 历史接续 `phytnesskun/personal_web` 的原 `main` 提交 `8e872b61064ab4351d4bde14ed0f3a062137d206`；该版本与旧源码快照仅有换行符差异。

外部题库、实验室、反馈系统与论文链接不是本仓库源码的一部分，本次未验证其在线状态。

All rights reserved unless the owner chooses a separate license. Linked papers and external tools retain their respective rights.
