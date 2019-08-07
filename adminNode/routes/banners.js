var express = require('express');
var router = express.Router();
var banner = require('../sql/model/banner');
var sql = require('./../sql/index'); // <==>  ./../sql

/* 商品查询. */
router.get('/find', function(req, res, next) {
    // console.log(whereObj)
    var count = 4;
    var start = 0;
    if (req.query.count) {
        count = Number(req.query.count)
    }
    if (req.query.start) {
        start = Number(req.query.start)
    }
    // if (whereObj.count) {
    //     delete req.query.count;
    // }
    // if (whereObj.start) {
    //     delete req.query.start;
    // }
    sql.find(banner, {}, count, start).then((data) => {
        // console.log(whereObj)
        console.log(count,start)
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

//判断时候有值,并且转换成数字，如没有使用默认值
function isparam(dataObj, num) {
    if (dataObj) {
        return Number(dataObj);
    } else {
        return num
    }
}
function getTimeFM(){
    let date = new Date();
    date= date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()+" "+(date.getHours())+":"+date.getMinutes()+":"+date.getSeconds();
    //alert(date)
    return date
}
module.exports = router;
