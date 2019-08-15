const mongoose = require("../db.js");//引入模块
const {Schema} = mongoose;//es6 解构赋值
//确定一个数据集合字段和类型
const userSchema = new Schema({
    user_id:{type:String},	//用户id
    user_name:{type:String},//用户名称
    user_tel:{type:String},//用户手机号
    user_regtime:{type:String},//注册时间
    user_lv:{type:Number},//用户等级
    user_pwd:{type:String},//用户密码
    user_age:{type:String},//用户年龄
    user_add:{type:String},//住址
    user_headurl:{type:String},//头像
    user_state:{type:Number},//用户状态
})
// 创建一个集合并且将它暴露出去，供其他人增删改查
// 会在数据库中创建出一个 users 的集合，与mongoose.model()的第一个参数有关
module.exports = mongoose.model('user', userSchema)

