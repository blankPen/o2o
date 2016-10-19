# o2o外卖电商
=======

## API地址
[http://o2o.leimingtech.com/leimingtech-front/doc/view/index](http://o2o.leimingtech.com/leimingtech-front/doc/view/index)

## 技术栈
项目基于webpack构建，用到的技术有：
- reactjs
- react-router 路由管理
- react-redux 状态树管理
- reqwest 异步请求操作
- ant-design react 组件库

## 起步

```
    npm install // 下载项目开发依赖包
    npm start // 运行项目
    npm run dist // 打包项目
```

### 工程目录
- cfg 配置文件目录
- dist 打包生成文件目录
- src
    - actions
    - common 公用工具类等
    - components 组件目录
        - Home
            - index.jsx 组件jsx代码
            - index.less 组件样式文件(组件样式文件单独引入)
        - ...
    - images 图片等资源文件
    - reducers
    - stores
    - styles 公用样式文件
- package.json
- server.js node 服务文件
- webpack.config.js webpack配置文件

### 基本配置

#### 关于端口
默认端口8000，如需修改请修改/cfg/default.js -> dfltPort

#### 关于代理

```
    // 文件 /cfg/base.js
    devServer: {
        ...,
        proxy: {
          '/api/*': {
            pathRewrite: {'^/api' : '/rest/api'},
            target: 'http://o2o.leimingtech.com/leimingtech-front',
            changeOrigin: true
          }
        }
    }
    // 默认代理到http://o2o.leimingtech.com/leimingtech-front
    pathRewrite 路径重写参数，将匹配路径替换为想要修改的路径
    target: 代理目标地址
    changeOrigin: 是否开启跨域
```

## 任务

- [ ] 【业务】支付流程
- [ ] 【业务】订单页
- [ ] 【业务】个人中心页 ly
- [ ] 【业务】商户详情页 cjw
- [ ] 【业务】登录注册等 mzq
- [ ] 【业务】首页功能开发
- [x] ListView开发 2016.10.19
- [x] Img组件开发
- [x] demo页开发
- [x] 工程构建
