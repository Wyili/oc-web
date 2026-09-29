# oc-web

opencode 相关网页的统一静态托管（GitHub Pages）。

**站点入口**：<https://wyili.github.io/oc-web/>

## 站点结构

| 路径 | 内容 | 维护方式 |
|---|---|---|
| `/` | 入口页（站点导航） | `index.html`，单文件直接编辑 |
| `/oc-lark/` | oc-lark 展示页（飞书 × OpenCode 连接服务官网） | `oc-lark/index.html`，单文件直接编辑 |
| `/docs/` | opencode 运行时使用手册（25 页） | 由配套构建脚本整目录同步覆盖 |

## 维护说明

- 纯静态：仅 HTML/CSS/JS，无前端构建依赖；GitHub Pages 直接托管 `main` 分支根目录。
- 新增页面：建子目录 + `index.html`（或单文件 `xxx.html`），并在根入口页增加对应卡片。
- 本地预览：仓库根目录执行 `python -m http.server 8080`，访问 <http://localhost:8080/>。

## 安全边界

GitHub Pages 只托管静态内容，不运行任何后端。页面中的控制台、审批等为前端演示，凭证仅保留在浏览器内存；真实服务由各自仓库自托管部署，不要向页面或仓库写入凭证与内网地址。
