const model = require('../models')
const config = require('../common/config')
const Chat = model.getModel('chat')

module.exports = async (ctx, next) => {
  const {from} = ctx.request.body
  const userId = ctx.cookies.get('userId');
  try {
    let result = await Chat.update({from, to: userId},
      {'$set': {read: true}},
      {'multi': true} // 多行修改
    )
    ctx.body = {
      code: 0,
      num: result.nModified // 修改了几条
    }
  } catch (e) {
    ctx.state = {
      code: 1,
      msg: '修改失败'
    }
  }

}