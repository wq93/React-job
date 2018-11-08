const model = require('../models')
const config = require('../common/config')
const User = model.getModel('user')
module.exports = async (ctx, next) => {
  const {user, pwd, type} = ctx.request.body
  const maxAge = config.maxAge
  if (user && pwd && type) {
    try {
      let userInfo = await User.findOne({user, pwd})
      if (userInfo) {
        return ctx.state = {
          code: 1,
          msg: '用户名重复'
        }
      } else {
        const userModel = new User({user, type, pwd})
        let result = await userModel.save()
        ctx.cookies.set('userId', result._id, {maxAge})
        ctx.state = {
          code: 0,
          data: {
            user, type,
            '_id': result._id
          }
        }
      }

    } catch (e) {
      ctx.state = {
        code: 1,
        msg: e
      }
    }
  } else {
    ctx.state = {
      code: 2,
      msg: '参数不正确',
    }
  }
}