# 休憩
## 项目介绍
  休憩是一个小程序项目，由wxml，wxss，js 原生开发，主要包括音乐期刊、电影期刊、美文期刊、图书推荐、图书搜索、图书详情展示、个人信息等模块。本项目基于组件化开发模式，封装了 12 个组件，使得代码复用性高，开发高效，便于维护。

## 项目预览
### 首页（期刊）
![home.png](https://i.loli.net/2019/08/11/T7f1bvc64n9zHBs.png)

### 书籍页面
#### 书籍推荐
![books.png](https://i.loli.net/2019/08/11/er3i6AqkJjonNPK.png)

#### 书籍搜索
  ![search.png](https://i.loli.net/2019/08/11/L9sKyDAnqhOm6g7.png)

#### 书籍搜索结果
![search_result.png](https://i.loli.net/2019/08/11/VSumO7qBAwfab23.png)

#### 书籍详情
![book_detail.png](https://i.loli.net/2019/08/11/zvmG8IgAqHwhxNy.png)

#### 书籍评论
![short_comment.png](https://i.loli.net/2019/08/11/K6zipd3NsjqcP19.png)

### 个人信息页面
![user.png](https://i.loli.net/2019/08/11/Z341RscpiDJoK9r.png)

### 收藏期刊页面
![fav_item.png](https://i.loli.net/2019/08/11/VKWgPBI5cLMQU3j.png)

## 项目结构
```bash
.
|-- README.md
|-- app.js     # 入口文件
|-- app.json   # 配置文件
|-- app.wxss   # 全局样式文件
|-- components # 自定义组件            
|   |-- behaviors
|   |   `-- pagination-beh.js
|   |-- book
|   |   | ...
|   |-- classic
|   |   |-- classic-beh.js
|   |   |-- classicCommon.wxss # 组件公共样式
|   |   |-- essay
|   |   | ...
|   |   |-- movie
|   |   | ...
|   |   |-- music
|   |   | ...
|   |-- episode
|   |   | ...
|   |-- favItem
|   |   | ...
|   |-- imageButton
|   |   | ...
|   |-- images # 组件图片文件
|   |-- like
|   |   | ...
|   |-- loading
|   |   | ...
|   |-- mask
|   |   | ...
|   |-- navi
|   |   | ...
|   |-- search
|   |   | ...
|   `-- tag
|       | ...
|-- components.js
|-- config.js  # url 接口配置文件
|-- images     # 页面图片文件
|-- modules    # service 层，HTTP 请求封装
|   |-- book.js
|   |-- classic.js
|   |-- keyword.js
|   `-- like.js
|-- pages     # 页面
|   |-- about
|   |   | ...
|   |-- book
|   |   | ...
|   |-- bookDetail
|   |   | ...
|   |-- classic
|   |   | ...
|   |-- common
|   |   `-- classic_common.wxss
|   |-- favClassic
|   |   | ...
|   `-- userInfo
|       | ...
|-- project.config.json
|-- sitemap.json
`-- utils     # 公用逻辑
    |-- fetch.js
    |-- format.wxs
    `-- util.js
```

## 项目实现功能
* 点赞书籍、期刊
* 转发小程序页面内容
* 预览期刊内容（分为 3 类：音乐、电影、文章）
* 音乐期刊音乐播放、暂停
* 跳转页面
* 展示推荐图书
* 搜索书籍，实时显示搜索历史，热门搜索，展示搜索结果
* 评论书籍，点击标签评论书籍
* 点击头像实现授权
* 展示个人信息页面
* 展示收藏期刊

## 项目封装组件
### 期刊组件
* essay --文章期刊
* movie --电影期刊
* music --音乐期刊
* episode -- 展示当前日期、期刊推送顺序
* navi    -- 实现期刊间跳转
### 公共组件
* favItem  -- 展示用户收藏期刊
* imageButton  -- 授权按钮（用于授权分享、获取用户头像）
* like         -- 点赞按钮
* loading      -- 加载图像
* mask         -- 页面蒙层
* search       -- 复杂组件，书籍搜索
* tag          -- 短评组件（可用于展示短评或期刊类别）

## TODO
* 完善关于页面