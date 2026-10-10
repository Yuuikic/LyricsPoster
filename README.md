# TAiONS

> **T**he **A**ria **i**n **O**wari **N**o **S**ekai
>
> 在世界终结时的咏叹调。

一个在线歌词海报生成器。搜索歌曲、挑选歌词，一键生成歌词海报。

在线使用：<https://taions.nonon.moe>

## 技术栈

- [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [anime.js](https://animejs.com/)、[Color Thief](https://lokeshdhakar.com/projects/color-thief/)、[vuedraggable](https://github.com/SortableJS/vue.draggable.next)
- 歌曲数据来自 [网易云音乐 API](https://github.com/Binaryify/NeteaseCloudMusicApi)

## 本地开发

需要 Node.js 18 及以上（推荐使用 [`.nvmrc`](./.nvmrc) 中的版本）。

```bash
npm ci            # 按 package-lock.json 安装依赖
npm run dev       # 启动开发服务器
npm run build     # 构建到 dist/
npm run preview   # 本地预览构建结果
```

## 部署

项目部署在 Cloudflare Pages，由 Git 集成自动构建：

| 配置项 | 值 |
| --- | --- |
| 生产分支 | `main` |
| 构建命令 | `npm run build` |
| 输出目录 | `dist` |

`node_modules/` 与 `dist/` 不纳入版本控制。

## 历史版本

- **v1**（jQuery + Bootstrap，2022）：源码见 [`v1`](https://github.com/Yuuikic/LyricsPoster/tree/v1) 分支或 [`v1.0.0`](https://github.com/Yuuikic/LyricsPoster/releases/tag/v1.0.0) 标签；当年发布的压缩版见 `v1.0.0-dist` 标签。
- **v2**（Vue 3 重构，2024）：当前 `main` 分支。

## 许可证

[GPL-3.0](./LICENSE)
