require('./db') //链接数据库
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser')
const config = require('./common/config')
const router = require('./routes')
const response = require('./middlewares/response')
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);

io.on('connection', function (socket) {
  socket.emit('connect', 'ok');
  socket.on('sendmsg', (data) => {
    console.log(data)
  });
});
app.use(response)
  .use(bodyParser())// 解析请求体
  .use(router.routes()) // 路由分发
  .use(router.allowedMethods())
server.listen(
  config.port, () => console.log(`listening on port ${config.port}`))