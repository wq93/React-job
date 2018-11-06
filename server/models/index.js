const mongoose = require('mongoose')
const Schema = mongoose.Schema
const models = {
  user: {
    'user': {type: String, 'require': true},
    'pwd': {type: String, 'require': true},
    'type': {'type': String, 'require': true},
    //头像
    'avatar': {'type': String},
    // 个人简介或者职位简介
    'desc': {'type': String},
    // 职位名
    'title': {'type': String},
    // 如果你是boss 还有两个字段
    'company': {'type': String},
    'money': {'type': String}
  },
  // 聊天模型
  chat: {
    'chatid': {'type': String, 'require': true},
    'from': {'type': String, 'require': true},
    'to': {'type': String, 'require': true},
    'read': {'type': Boolean, 'require': false},
    'content': {'type': String, 'require': true, 'default': ''},
    'create_time': {'type': Number, 'default': new Date().getTime()}
  }
}

for (let m in models) {
  mongoose.model(m, new Schema(models[m]))
}

module.exports = {
  getModel: function (name) {
    return mongoose.model(name)
  }
}
