const model = require('../models')
const Chat = model.getModel('chat')
const User = model.getModel('user')

module.exports = async (ctx, next) => {
  const userId = ctx.cookies.get('userId');
  let users = {}
  try {
    let userList = await User.find()
    userList.forEach(item => {
      users[item.id] = {name: item.user, avatar: item.avatar} // 获取所有的用户名和头像
    })
    let chatList = await Chat.find({'$or': [{'from': userId}, {'to': userId}]})
    ctx.body = {
      code: 0,
      msgs: chatList,
      users
    }
  } catch (e) {
    ctx.state = {
      code: 1,
      msg: '后端出错了'
    }
  }

}