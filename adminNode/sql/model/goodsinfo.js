const mongoose = require("../db.js");//引入模块
const {Schema} = mongoose;//es6 解构赋值

//确定一个数据集合字段和类型
const goodsinfoSchema = new Schema({
    id:{type:String},	//_id
    name:{type:String},//商品名称
    shop_name:{type:String},//商品名称
    image_url:{type:String},//图片地址
    normal_price:{type:Number},//正常价格
    promotion_price:{type:Number},//促销价格
    more_txt:{type:String},//详情文字
    more_url:{type:String},//详情图片
    tag:{type:String},//分类
    num:{type:Number},//数量
    state:{type:Number},//商品状态
    promotion:{type:Number},//新品标签
    new:{type:Number},//新品标签
})
// 创建一个集合并且将它暴露出去，供其他人增删改查
// 会在数据库中创建出一个 users 的集合，与mongoose.model()的第一个参数有关
module.exports = mongoose.model('goodsinfo', goodsinfoSchema)

