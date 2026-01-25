# README.md

本项目是一个用于展示与承载二次创作系列 《乐队子世代：那美好的未来》 的前端静态网站。

## ✨ 项目简介

《乐队子世代：那美好的未来》是基于 **《BanG Dream! It's MyGO!!!!!》** 与 **《BanG Dream! Ave Mujica》** 的二次创作子世代世界观设定，时间线位于原作结局二十余年后。

本网站作为该系列的 **统一展示与整理平台**，用于：

- 世界观与设定的集中呈现
- 人物关系、称呼表、亲缘谱的可视化展示
- 小说、文本类内容的长期收录
- 作为公开、可访问的静态内容站点部署

## 🛠 技术栈

- **框架**：Vue 3
- **语言**：TypeScript
- **构建工具**：Vite
- **路由**：Vue Router
- **样式方案**：Scoped CSS
- **部署方式**：GitHub Pages（静态托管）

## 📁 项目结构（简要）

```text
src/
├─ components/        # 通用组件
├─ views/             # 页面级视图
├─ assets/            # 静态资源
├─ data/              # JSON / 内容索引数据
├─ content/           # Markdown 长文本内容（小说、设定等）
├─ router/            # 路由配置
├─ App.vue            # 应用壳组件
└─ main.ts            # 入口文件
```

> 说明：
>
> - **JSON** 用于描述结构与索引
> - **Markdown（.md）** 用于承载长文本内容
> - 前端负责解析与渲染，不直接存储用户隐私数据

## 🔐 隐私与内容说明

本项目为 **非商业、展示性质网站**。

- 不收集访问者的个人信息
- 不包含用户登录、评论、追踪等功能
- 若页面中出现署名、签名或创作者内容，均基于明确同意或匿名展示

如有内容需要修改或撤下，请通过项目主页提供的联系方式进行反馈。

## 🚀 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 📌 免责声明

本项目中涉及的原作角色与世界观，其版权归原作者及相关权利方所有。

本网站仅用于同人创作交流与展示，不用于任何商业用途。

## 📄 License

本项目代码部分遵循 MIT License。

内容部分（文本、设定、创作作品）版权归各自作者所有，未经许可请勿转载或商用。

```
band-next-gen
├─ .prettierrc.json
├─ .stylelintrc.json
├─ components.d.ts
├─ env.d.ts
├─ index.html
├─ md-image
│  └─ rikki.png
├─ package-lock.json
├─ package.json
├─ public
│  ├─ bgm
│  │  ├─ yan.m4a
│  │  ├─ yan.mp3
│  │  ├─ yingsewu.m4a
│  │  └─ yingsewu.mp3
│  ├─ favicon.ico
│  └─ images
│     ├─ avatar
│     │  ├─ ameha.png
│     │  ├─ anna.png
│     │  ├─ anon.png
│     │  ├─ hazuki.png
│     │  ├─ mirei.png
│     │  ├─ muna.png
│     │  ├─ mutsumi.png
│     │  ├─ nyamu.png
│     │  ├─ rana.png
│     │  ├─ riko.png
│     │  ├─ sakiko.png
│     │  ├─ shizuku.png
│     │  ├─ sora.png
│     │  ├─ soyo.png
│     │  ├─ taki.png
│     │  ├─ tomori.png
│     │  ├─ uika.png
│     │  ├─ umiri.png
│     │  └─ wakaho.png
│     ├─ band-logo
│     │  ├─ ave-mujica.png
│     │  ├─ ex-lilith.png
│     │  ├─ gorai.png
│     │  └─ mygo.png
│     ├─ card
│     │  └─ default-card.png
│     ├─ group1.png
│     ├─ relative-network.png
│     └─ stand-image
│        ├─ ameha1.png
│        ├─ anna1.png
│        ├─ anon1.png
│        ├─ default-stand-image.png
│        ├─ hazuki1.png
│        ├─ mana1.png
│        ├─ mirei1.png
│        ├─ muna1.png
│        ├─ mutsumi1.png
│        ├─ nyamu1.png
│        ├─ rana1.png
│        ├─ riko1.png
│        ├─ sakiko1.png
│        ├─ shizuku1.png
│        ├─ sora1.png
│        ├─ soyo1.png
│        ├─ taki1.png
│        ├─ tomori1.png
│        ├─ uika1.png
│        ├─ umiri1.png
│        └─ wakaho1.png
├─ README.md
├─ scripts
│  └─ release.js
├─ src
│  ├─ App.vue
│  ├─ assets
│  │  └─ data
│  │     ├─ characters.json
│  │     └─ relations.json
│  ├─ components
│  │  ├─ BackToTop.vue
│  │  ├─ Footer.vue
│  │  ├─ home
│  │  │  ├─ HeroSection.vue
│  │  │  └─ StarryBackground.vue
│  │  ├─ MarkDownViewer.vue
│  │  ├─ NavigationBar.vue
│  │  ├─ relations
│  │  │  ├─ CallTable.vue
│  │  │  ├─ FamilyTree.vue
│  │  │  ├─ RelationNetwork.vue
│  │  │  ├─ SectionTitle.vue
│  │  │  └─ SidebarNav.vue
│  │  └─ SpecialNoteBox.vue
│  ├─ config
│  │  └─ env.ts
│  ├─ content
│  │  ├─ 免责声明.md
│  │  ├─ 纪事.md
│  │  └─ 项目介绍.md
│  ├─ main.ts
│  ├─ router
│  │  └─ index.ts
│  ├─ styles
│  │  └─ global.css
│  ├─ types
│  │  ├─ character.list.ts
│  │  └─ character.model.ts
│  ├─ utils
│  │  └─ assets.ts
│  └─ views
│     ├─ AboutView.vue
│     ├─ CharacterDetailView.vue
│     ├─ CharactersView.vue
│     ├─ ChronicleView.vue
│     ├─ HomeView.vue
│     ├─ NotFound.vue
│     └─ RelationsView.vue
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```
