require('./db') //链接数据库
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser')
const config = require('./common/config')
const router = require('./routes')
const response = require('./middlewares/response')
app.use(response)
  .use(bodyParser())// 解析请求体
  .use(router.routes()) // 路由分发
  .use(router.allowedMethods())
  .listen(config.port, () => console.log(`listening on port ${config.port}`))