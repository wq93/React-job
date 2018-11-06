const model = require('../models')
const User = model.getModel('user')

module.exports = async (ctx, next) => {
  let list = []

  try {
    list = await User.find()
  } catch (e) {
    ctx.state = {
      code: -1,
      data: {
        errorInfo: e,
        msg: '失败'
      },
    }
  }
  ctx.body = {
    code: 0,
    data: {
      list
    }
  }
}