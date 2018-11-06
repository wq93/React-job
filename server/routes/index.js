const router = require('koa-router')()
const users = require('../controllers/getUsers')

router.get('/users', users)

module.exports = router