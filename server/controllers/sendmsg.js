const model = require('../models')
const config = require('../common/config')
const Chat = model.getModel('chat')

module.exports = async ({from, to, msg}) => {
  const chatid = [from, to].sort().join('_')
  return await Chat.create({chatid, from, to, content: msg, read: false})
}