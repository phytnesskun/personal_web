# Bingkun Qi personal website

亓炳堃的中英文个人网站。本项目于 2026-10-25 从 Windows 迁移备份恢复。

## 版本与目录

- `dist/`：当前发布文件与可编辑 HTML/CSS/JS/JSON，作为预览和后续修改的基准。
- `build.py`：2026-10-26 从原 Sites 源仓库恢复的当前生成器，负责中英文入口、静态文字、元数据和站点地图。
- `legacy-source/`：可构建的旧源码快照，包含原 README、`build.py` 和自己的 `dist/`，共 50 个文件。它不代表较新发布版的完整源码。
- `.openai/hosting.json`：保留原 Sites 项目配置，部署目录为顶层 `dist/`，继续使用原网站和原访问权限。

旧构建器保留在 `legacy-source/` 内，不要把其输出复制到顶层 `dist/`。当前生成器已与迁入的发布文件核对：重新构建仅有换行符差异。GitHub 与 Sites 的提交历史以普通合并保留；原 Windows 未提交/未推送内容仍不在此确认范围内。

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

修改当前内容后，在根目录运行 `python3 build.py`，同步生成页面及站点地图。根路径资源链接要求网站部署在域名根目录；推送 GitHub 不等于发布 GitHub Pages。

## 2026-10-26 作品集更新

- 首页新增三个精选案例：3D 伏安法虚拟实验室、原创受力分析课例、繁荣之路经济决策游戏，均有中英文页面。
- 物理演示由 6 个扩为 12 个；ESAT 案例补充练习、解析、错题统计与再练习的流程。
- 教学页保留原波动互动课，并提供完整受力分析样章：学生题纸 5 页、解答与评分点 4 页、教师教案 3 页。
- 虚拟实验室截图来自 `virtual lab/docs/qa/` 的实际原型；游戏截图来自既有游戏 QA。受力图及三份 PDF 来自原创备课目录 `BPHO and Physics Bowl/备课/第01讲_受力图与牛顿第二定律/`。未附官方试卷原卷或学生数据。
- 虚拟实验室标为本地原型，课例标为待试教；不声明已验证的学生学习成效。游戏试玩地址本次返回 HTTP 403，暂不显示启动按钮。物理演示沿用独立实验室的访问权限。

日常内容在 `dist/assets/content.json` 中维护，页面生成后可运行：

```sh
python3 build.py
python3 scripts/check_site.py
node --check dist/assets/app.js
node --check dist/assets/enhancements.js
node --check dist/assets/wave-lab.js
```

本轮检查：37 个 HTML（24 个本地化入口、12 个兼容入口和 1 份讲义）、823 处本地引用、页面元数据与 PDF 文件格式通过；3 份 PDF 经 HTTP 下载哈希比对通过。浏览器检查了中英文新案例、ESAT 与教学页、语言切换、案例步骤、390px 手机布局和菜单 Escape 关闭，未发现 JS 错误或横向溢出。

## 2026-10-30 · 本地整合 3D 电阻实验

- 个人站首页及中英文实验介绍页提供“进入 3D 实验”入口，实际体验页为 `/lab/resistance/`，以 `?lang=zh` 或 `?lang=en` 指定语言。
- 实验完整保留自己的布局；页头可返回对应语言的项目介绍。切换语言不清空实验，刷新或离开实验会清空接线和记录。
- 发布文件包含 Three.js MIT 许可。`dist/lab/resistance/release.json` 记录来源仓库、精确提交、构建路径及文件 SHA-256；首次接入来源提交为 `f477a3264c4f79fce705ef0ab969f920fd409100`。
- 更新实验时，从已安装依赖且构建输入已提交的实验源码工作区重新导入，再运行个人站构建和检查：

```sh
python3 scripts/import_virtual_lab.py '/Volumes/Bingkun2TB/virtual lab'
python3 build.py
python3 scripts/check_site.py
node --check dist/assets/app.js
node --check dist/assets/enhancements.js
node --check dist/assets/virtual-lab-site.js
```

导入脚本固定使用 `/lab/resistance/` 作为资源路径，构建中间文件保留在已忽略的 `qa/` 中。个人站日常构建保留实验子目录；只需在实验更新时重新导入。服务器上仅需托管整个 `dist/`，不需要 Node.js 或数据库。十二课物理演示仍是独立网站。

本次为本地整合，尚未发布或更改域名。Chrome 实测七线接线、闭合开关得到 1.000 V / 0.100 A、手动记录 10.0 Ω，切换英文保留记录；滑片 75% 时为 1.200 V / 0.120 A。手机模拟视口用于检查布局，尚未进行手机实机触控测试。

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

外部题库、实验室、反馈系统与论文链接不是本仓库源码的一部分，迁移校验不代表其在线状态；本轮新增物理演示链接另外进行了访问检查。

All rights reserved unless the owner chooses a separate license. Linked papers and external tools retain their respective rights.
