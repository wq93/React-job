const model = require('../models')
const User = model.getModel('user')
const config = require('../common/config')
module.exports = async (ctx, next) => {
  const {userId: _id, avatar, company, desc, money, title} = ctx.request.body
  if (!_id) {
    return ctx.state = {
      code: -1,
      msg: '修改失败'
    }
  } else {
    try {
      let updates = {$set: {avatar, company, desc, money, title}}
      let result = await User.update({_id}, updates) // 修改
      if (result.ok) {
        let data = await User.find({_id}, config._filter) // 查这条数据
        ctx.body = {
          code: 0,
          data
        }
      } else {
        ctx.state = {
          code: -1,
          msg: '失败'
        }
      }
    } catch (e) {
      ctx.state = {
        code: -1,
        errorInfo: e,
        msg: '失败'
      }
    }

  }
}