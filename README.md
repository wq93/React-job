# React实时聊天APP
## 项目描述:
​	使用Redux + React Router + Node.js开发高颜值实时聊天APP，项目采用前后端分离，使用Node.js提供RESTful接口、mongoDB数据库存储真实数据。主要模块包括登录注册、实时聊天、联系人列表、个人信息管理等模块。

## 技术描述:

1.	支持在线聊天, 利用React和websocket技术提供支持,极大的提高响应速度
2.	区分无状态组件和状态组件, 定制shouldComponentUpdate生命周期
3.	使用Redux并配合react-redux,以组件为核心划分reducer实现应用状态的统一管理
4.	组件中列表元素添加唯一的key值,提高diff算法效率
5.	利用Node.js提供RESTful接口,mongoDB数据库存储数据,使用Mongoose做桥接
6.	配置 ESLint语法校验，保证代码的规范性

### 安装与运行

- clone项目

  `git clone https://github.com/wq93/React-job.git`

- 进入项目

  `cd React-job`

- 安装依赖

  `npm install`

- 本地编译

  `npm start // 开发环境运行`

- 打包编译

  `npm run build  // 项目打包编译`