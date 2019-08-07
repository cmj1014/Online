var express = require('express');
var router = express.Router();
var Account = require('../sql/model/account');
var sql = require('./../sql/index'); // <==>  ./../sql


/* 调用管理账户. */
router.post('/admin', function(req, res, next) {
    /* db.getCollection('users').aggregate([
    { $group: { _id : '$openid', count: { $sum : 1 } } },
    { $match: { count: { $gt : 1} } }
]) */
    let whereObj = {"username": req.body.username};
    console.log(whereObj)
    sql.find(Account, whereObj).then((data) => {
        let arr = new Object; //存内容
        console.log(data)
            if (data.length !== 0){
                console.log(data[0].password,req.body.password)
                if (data[0].password === req.body.password) {
                    arr = {
                        "code": "1",
                        "msg": "登录成功"
                    };
                }else {
                    arr = {
                        "code": "-1",
                        "msg": "密码错误"
                    };
                }
            }else {
                arr = {
                    "code": "0",
                    "msg": "账户不存在"
                };
            }
            res.send(arr);
        })

});
router.post('/change', function(req, res, next) {
    let arr = new Object
    console.log(res.body)
    let whereObj = {"username": req.body.username,"password": req.body.password};
    sql.find(Account, whereObj).then((data)=>{
        if (data.length !== 0 ) {
            if (req.body.reset) {
                sql.update(Account,whereObj,{$set: {password: req.body.reset}}).then(() =>{
                        console.log(888,arr)
                        arr = {
                            "code": "1",
                            "msg": "密码修改成功"
                        }
                    res.send(arr);
                    }
                )
            }else {
               arr = {
                   "code": "0",
                   "msg": "密码修改失败"
               }
                res.send(arr);
           }
        }else {
            arr = {
                "code": "-1",
                "msg": "当前密码输入错误"
            }
            res.send(arr);
        }
    })
    console.log(whereObj)



});
//判断时候有值
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
