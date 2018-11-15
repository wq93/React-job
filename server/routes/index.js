const router = require('koa-router')()
const users = require('../controllers/getUsers')
const login = require('../controllers/login')
const register = require('../controllers/register')
const updata = require('../controllers/updata')
const usersList = require('../controllers/users_list')
const getmsglist = require('../controllers/getmsglist')
const readmsg = require('../controllers/readmsg')

router.get('/users', users) // 获取用户列表

router.post('/user/login', login) // 注册

router.post('/user/register', register) // 登录

router.post('/user/update', updata) // 修改

router.get('/user/list', usersList) // 获取用户列表(分类别)

router.get('/user/getmsglist', getmsglist) // 获取用户列表(分类别)

router.post('/user/readmsg', readmsg) // 读取消息

module.exports = router