const mongoose = require("mongoose");//mongoose模块引入
const DB_URL = "mongodb://127.0.0.1:27017/goods";//设置数据库表

mongoose.connect(DB_URL,{useNewUrlParser:true});//创建新的格式化的链接，为了安全

mongoose.connection.on("connected",()=>{
	console.log("数据库连接成功");
})
//监控数据库是否成功
mongoose.connection.on("disconnected",()=>{
	console.log("数据库连接失败");
})

	//报错
mongoose.connection.on("error",()=>{
	console.log("数据库异常");
})
module.exports = mongoose;
