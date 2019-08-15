const mongoose = require("../db.js");//引入模块
const {Schema} = mongoose;//es6 解构赋值

//确定一个数据集合字段和类型
const accountSchema = new Schema({
    username:{type:String},	//管理用户名
    password:{type:String},//密码
})
// 创建一个集合并且将它暴露出去，供其他人增删改查
// 会在数据库中创建出一个 users 的集合，与mongoose.model()的第一个参数有关
module.exports = mongoose.model('account', accountSchema)

