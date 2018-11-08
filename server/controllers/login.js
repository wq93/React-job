const model = require('../models')
const config = require('../common/config')
const User = model.getModel('user')

module.exports = async (ctx, next) => {
  const {pwd, user} = ctx.request.body
  const maxAge = config.maxAge
  try {
    let userInfo = await User.findOne({user, pwd}, config._filter)

    ctx.cookies.set('userId', userInfo._id, {maxAge})
    ctx.body = {
      code: 0,
      data: userInfo
    }
  } catch (e) {
    ctx.state = {
      code: 1,
      msg: '用户名或密码错误'
    }
  }

}