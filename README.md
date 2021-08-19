# 嘟嘟早教卡
【嘟嘟早教卡】是专门为 3-6 岁婴幼儿童学习普通话、英语研发的早教启蒙认知识字的小程序，由 Taro 及 Tailwind CSS 构建而成。

## 关于项目
想法源于小时候玩的认知卡片，基本大部分家庭都买过认知卡片，我按照那些卡片分类，收集了一些常见的物品，加入中文英文音频，学习统计。第一版可能还有点粗糙，但慢慢在完善中。目前只做了小程序版，app 应该没有，因为不太会，而且这个需求在小程序中应该更有优势吧（不是为懒找借口），哈哈哈哈
### 项目截图
![项目截图](https://user-images.githubusercontent.com/24596908/129997286-bccf057c-4945-4314-8791-6db36589c660.png)

### 安装
目前只上线了微信小程序端，其他平台没有测试。该项目需要配合后端接口使用
> 本地预览与线上使用的接口地址是不一样的，请先修改 `utils/request.js` 下的 `baseUrl` 为你对应的后端接口地址

后端地址：[https://github.com/hipig/ddcard](https://github.com/hipig/ddcard)
```
npm install
// 修改 `utils/request.js` 下的 baseUrl
vim utils/request.js
// 本地预览
npm run dev:weapp
// 或线上打包
npm run build:weapp
```
导入 `dist` 目录至小程序开发者工具，【详情-本地设置】勾选不校验合法域名

### 线上预览
![小程序码](https://user-images.githubusercontent.com/24596908/129997131-666a1ac5-da7d-4bf1-a743-7a188184b0c0.jpg)
