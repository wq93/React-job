const model = require('../models')
const User = model.getModel('user')

module.exports = async (ctx, next) => {
  let {type} = ctx.request.query
  console.log(type)
  try {
    let list = await User.find({type})
    ctx.body = {
      code: 0,
      data: list
    }
  } catch (e) {
    ctx.state = {
      code: -1,
      data: {
        errorInfo: e,
        msg: '失败'
      },
    }
  }

}