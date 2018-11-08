const router = require('koa-router')()
const users = require('../controllers/getUsers')
const login = require('../controllers/login')
const register = require('../controllers/register')
const updata = require('../controllers/updata')

router.get('/users', users) // 获取用户列表

router.post('/user/login', login) // 注册

router.post('/user/register', register) // 登录

router.post('/user/update', updata) // 修改

module.exports = router