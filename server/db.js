const mongoose = require('mongoose');
const config = require('./common/config');
const db = mongoose.connection;

// 连接mongoDB数据库
mongoose.connect(config.db_url)

db.on("connected", function () {
  console.log("MongoDB connected sucess")
})
db.on("error", function () {
  console.log("MongoDB connected error")
})
db.on("disconnected", function () {
  console.log("MongoDB connected disconnected")
})
