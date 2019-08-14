var express = require('express');
var router = express.Router();
var goodsinfo = require('../sql/model/goodsinfo');
var sql = require('./../sql/index'); // <==>  ./../sql

// 商品名模糊搜索数量统计
router.get('/gsearchNum', function(req, res, next) {
	//console.log("/gsearchNum")
	var gSearch = req.query.sear;
	const reg = new RegExp(gSearch, 'i')
	//console.log(reg)
	sql.count(goodsinfo,{
		$or: [{
				name: {
					$regex: reg
				}
			},
			{
				more_txt: {
					$regex: reg
				}
			}
		]
		
	}).then(data=>{
		//console.log(data)
		res.send({count:data})
	})
	
});

// 商品名模糊搜索
router.get('/gsearch', function(req, res, next) {
	var gSearch = req.query.sear;
	let countnum = 12; //默认显示多少条数据
	let startnum = 0; //默认从多少条开始数据
	if (req.query.count) {
		countnum = Number(req.query.count)
	} else {
		countnum = 12
	}
	if (req.query.start) {
		startnum = Number(req.query.start)
	} else {
		startnum = 0
	}
	const reg = new RegExp(gSearch, 'i')
	if (gSearch) {
		sql.find(goodsinfo, {
			$or: [{
					name: {
						$regex: reg
					}
				},
				{
					more_txt: {
						$regex: reg
					}
				}
			]
		}, countnum, startnum).then(data => {
			if (data.length > 0) {
				//console.log(data)
				res.send({
					"code": "1",
					"msg": "查询成功",
					"data": data
				})
			} else {
				res.send({
					"code": "0",
					"msg": "未查询到符合条件的商品"
				})
			}
		})
	} else {
		res.send({
			"code": "-1",
			"msg": "您未输入数据"
		})
	}
})


// 商品增加上传
router.post('/insert', function(req, res, next) {
	console.log(Date.now())
	var insertData = req.body;
	console.log(insertData)
	insertData.id = Date.now()
	console.log(typeof(insertData))
	if (insertData.name !== "" && insertData.shop_name !== "" && insertData.image_url && insertData.normal_price !== "" &&
		insertData.promotion_price !== "" && insertData.more_txt !== "" && insertData.more_url !== "" &&
		insertData.tag !== "" && insertData.num !== "" && insertData.state !== "" && insertData.promotion !== "" &&
		insertData.new !== "" && insertData.specification !== "" && insertData.id !== "") {
		sql.insert(goodsinfo, insertData).then((data) => {
			res.send({
				"code": "1",
				"msg": "数据上传成功"
			})
		})

	} else {
		res.send({
			"code": "0",
			"msg": "参数输入不合法，请检查"
		})
	}

})
// 商品删除，改变商品State状态，数据保存数据库，可恢复
router.post('/delete', function(req, res, next) {
	console.log(req.body)
	if (req.body.id) {
		sql.find(goodsinfo, {
			id: req.body.id
		}).then((data) => {
			if (data.length === 1) {
				sql.update(goodsinfo, {
					id: req.body.id
				}, {
					state: -1
				}).then((err, data) => {
					res.send({
						"code": "1",
						"msg": "删除成功"
					})
				})
			} else {
				res.send({
					"code": "-1",
					"msg": "删除失败，传入ID不存在"
				})
			}
		})

	} else {
		res.send({
			"code": "0",
			"msg": "删除失败，未传入ID"
		})
	}

})
// 商品恢复，改变商品State状态
router.post('/resume', function(req, res, next) {
	console.log(req.body)
	if (req.body.id) {
		sql.find(goodsinfo, {
			id: req.body.id
		}).then((data) => {
			if (data.length === 1) {
				sql.update(goodsinfo, {
					id: req.body.id
				}, {
					state: 1
				}).then((err, data) => {
					res.send({
						"code": "1",
						"msg": "恢复成功"
					})
				})
			} else {
				res.send({
					"code": "-1",
					"msg": "恢复失败，传入ID不存在"
				})
			}
		})

	} else {
		res.send({
			"code": "0",
			"msg": "恢复失败，未传入ID"
		})
	}

})
// 修改参数
router.post('/updata', function(req, res, next) {

	if (req.body.id) {
		sql.find(goodsinfo, {
			id: req.body.id
		}).then((data) => {
			if (data.length === 1) {
				if (req.body.name !== "" && req.body.image_url !== "" && req.body.normal_price !== "" &&
					req.body.promotion_price !== "" && req.body.more_txt !== "" && req.body.more_url !== "" &&
					req.body.tag !== "" && req.body.num !== "" && req.body.state !== "" &&
					req.body.promotion !== "" && req.body.new !== "" && req.body.specification !== ""
				) {
					sql.update(goodsinfo, {
						id: req.body.id
					}, {
						name: req.body.name,
						shop_name: req.body.shop_name,
						image_url: req.body.image_url,
						normal_price: req.body.normal_price,
						promotion_price: req.body.promotion_price,
						more_txt: req.body.more_txt,
						more_url: req.body.more_url,
						tag: req.body.tag,
						num: req.body.num,
						state: req.body.state,
						promotion: req.body.promotion,
						new: req.body.new,
						specification: req.body.specification
					}).then(() => {
						res.send({
							"code": "1",
							"msg": "修改成功"
						})
					})
				} else {
					res.send({
						"code": "0",
						"msg": "传入参数不全，请检查"
					})
				}
			} else {
				res.send({
					"code": "-1",
					"msg": "传入ID不存在，请检查"
				})
			}
		})
	} else {
		res.send({
			"code": "-1",
			"msg": "未传入ID，请检查"
		})
	}


})



/* 商品查询. */
router.get('/find', function(req, res, next) {

	let whereObj = req.query;
	//console.log("whereObj",req)
	//console.log("whereObj.count",req.query.count)
	//console.log("whereObj.name",req.query.name)
	// console.log(whereObj)
	let count = 12; //默认显示多少条数据
	let start = 0; //默认从多少条开始数据
	let sort = {
		id: -1
	}; //默认排序
	let range_gt = 0; //默认大于多少价格
	let range_lt = 999999; //默认小于多少价格
	count = isparam(whereObj.count, 12);
	start = isparam(whereObj.start, 0);
	console.log(count)
	range_gt = isparam(whereObj.range_gt, 0);
	range_lt = isparam(whereObj.range_lt, 999999);
	if (whereObj.range_gt && whereObj.range_lt) {
		whereObj.normal_price = {
			$gt: whereObj.range_gt,
			$lt: whereObj.range_lt
		}
	} else if (whereObj.range_gt) {
		whereObj.normal_price = {
			$gt: range_gt
		}
		// console.log(whereObj)
		// console.log(whereObj.normal_price)
	} else if (whereObj.range_lt) {
		whereObj.normal_price = {
			$lt: range_lt
		}
	}
	if (whereObj.count) {
		delete whereObj.count;
	}
	if (whereObj.start) {
		delete whereObj.start;
	}
	if (whereObj.sort) {
		sort = whereObj.sort;
		delete whereObj.sort;
	}
	if (whereObj.range_gt) {
		delete whereObj.range_gt;
	}
	if (whereObj.range_lt) {
		delete whereObj.range_lt;
	}
	//let allnum = sql.find(goodsinfo,whereObj)
	sql.find(goodsinfo, whereObj, count, start, sort).then((data) => {
		console.log(whereObj)
		// console.log(data)
		let arr = new Object; //存内容
		let len = data.length;
		if (len == 0) { // 没有查询到
			arr = {
				"code": "-1",
				"msg": "没有查询到内容",
				"data": data
			};
		} else if (len > 0) {
			arr = {
				"code": "1",
				"msg": "查询成功",
				"data": data
			};
		} else {
			arr = {
				"code": "0",
				"msg": "查询异常",
				"data": data
			};
		}
		res.send(arr);
	})
});
// 统计查询数量
router.get('/num', function(req, res, next) {
	//console.log("/num")
	let whereObj = req.query;
console.log("whereObj",whereObj)
	sql.count(goodsinfo, whereObj).then((data) => {
		//console.log("data",data)
		res.send({count:data});
	})
});
//判断时候有值,并且转换成数字，如没有使用默认值
function isparam(dataObj, num) {
	if (dataObj !== "" && dataObj !== undefined) {
		return Number(dataObj);
	} else {
		return num
	}
}

function getTimeFM() {
	let date = new Date();
	date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + " " + (date.getHours()) + ":" + date.getMinutes() +
		":" + date.getSeconds();
	//alert(date)
	return date
}
module.exports = router;
