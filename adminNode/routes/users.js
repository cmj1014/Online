var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs') //哈希加密
var user = require('../sql/model/user');
var sql = require('./../sql/index'); // <==>  ./../sql
var codeInfo = false;
// 用户数据上传（注册）接口
router.post('/register', function(req, res, next) {
  var whereObj = req.body;
  function initial(obj, init) {
    if (obj){
      return obj;
    }else{
      return  init;
    }
  }
  whereObj.user_id = 'rh' + Date.now();
  whereObj.user_regtime = Date.now();
  whereObj.user_lv = 1;
  initial(whereObj.user_headurl,whereObj.user_headurl = 'http://img5.imgtn.bdimg.com/it/u=15931221,351467408&fm=26&gp=0.jpg');
  whereObj.user_state =1;
  if (whereObj.user_name && whereObj.user_pwd && whereObj.user_tel){
    sql.find(user, {user_tel: whereObj.user_tel }).then(data => {
      if (data.length === 0 ){
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        whereObj.user_pwd = bcrypt.hashSync(whereObj.user_pwd, salt);
        // 查询
        // const pwdMatchFlag = bcrypt.compareSync('1223123',hash);
        sql.insert(user, whereObj).then((data) => {
          res.send({
            "code": "1",
            "msg": "注册成功"
          })
        })
      }else{
        res.send({
          "code": "0",
          "msg": "手机号已注册，请更换"
        })
      }
    })
  }else{
    res.send({
          "code": "-1",
          "msg": "未入传必要参数，请检查"
        }
    );
  }
});
// 用户查询（登录）接口
router.post('/login', function(req, res, next) {
  var whereObj =req.body;
  if ( whereObj.user_pwd && whereObj.user_tel) {
    // console.log(1111)
    sql.find(user, {user_tel: whereObj.user_tel}).then(data => {
      if (data.length === 1 ){
        console.log(data[0].user_pwd)
        console.log(whereObj.user_pwd)
          if(bcrypt.compareSync(whereObj.user_pwd,data[0].user_pwd)){
            res.send({
                  "code": "1",
                  "msg": "登陆成功"
                }
            );
          }else{
            res.send({
                  "code": "0",
                  "msg": "密码错误，请检查"
                }
            );
          }
      }else{
        res.send({
              "code": "-1",
              "msg": "账号不存在，请检查"
            }
        );
      }
    })
  }else{
    res.send({
          "code": "-2",
          "msg": "未入传必要参数，请检查"
        }
    );
  }
})

// 用户条件查询

router.get('/find', function(req, res, next) {
  let whereObj = req.query;
  console.log(whereObj)
  // console.log(whereObj)
  let count = 10; //默认显示多少条数据
  let start = 0; //默认从多少条开始数据
  let sort = -1; //默认排序
  let range_gt = 0 ; //默认大于多少年龄
  let range_lt = 999999 ; //默认小于多少年龄
  count = isparam(whereObj.count, 10);
  start = isparam(whereObj.start, 0);
  sort = isparam(whereObj.sort, -1);
  // whereObj.user_state =  isparam(whereObj.user_state, 0);
  range_gt = isparam(whereObj.range_gt, 0);
  range_lt = isparam(whereObj.range_lt, 999999);
  if(whereObj.range_gt && whereObj.range_lt) {
    whereObj.user_age = {$gt: whereObj.range_gt, $lt: whereObj.range_lt}
  }else if (whereObj.range_gt) {
    whereObj.user_age ={ $gt: range_gt}
    // console.log(whereObj)
    // console.log(whereObj.normal_price)
  }else if ( whereObj.range_lt) {
    whereObj.user_age = { $lt: range_lt}
  }
  if (whereObj.count) {
    delete whereObj.count;
  }
  if (whereObj.start) {
    delete whereObj.start;
  }
  if (whereObj.sort) {
    delete whereObj.sort;
  }
  if (whereObj.range_gt) {
    delete whereObj.range_gt;
  }
  if (whereObj.range_lt) {
    delete whereObj.range_lt;
  }
  sql.find(user, whereObj, count, start, {user_regtime: sort}).then((data) => {
    console.log(whereObj)
    console.log(data)
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



// 封禁账号，改变账号State状态，数据保存数据库，可恢复
router.post('/delete', function(req, res, next) {
  console.log(req.body)
  if (req.body.user_tel) {
    sql.find(user,{user_tel: req.body.user_tel}).then( (data) =>{
      if (data.length === 1 ) {
        sql.update(user,{user_tel: req.body.user_tel}, {user_state: -1}).then((err,data) =>{
          res.send({
            "code": "1",
            "msg": "封禁成功"
          })
        })
      }else{
        res.send({
          "code": "-1",
          "msg": "封禁失败，传入手机号不存在"
        })
      }
    })

  }else {
    res.send({
      "code": "0",
      "msg": "封禁失败，未传入手机号"
    })
  }

})
// 商品恢复，改变商品State状态
router.post('/resume', function(req, res, next) {
  console.log(req.body)
  if (req.body.user_tel) {
    sql.find(user,{user_tel: req.body.user_tel}).then( (data) =>{
      if (data.length === 1 ) {
        sql.update(user,{user_tel: req.body.user_tel}, {user_state: 1}).then((err,data) =>{
          res.send({
            "code": "1",
            "msg": "解封成功"
          })
        })
      }else{
        res.send({
          "code": "-1",
          "msg": "解封失败，传入手机号不存在"
        })
      }
    })

  }else {
    res.send({
      "code": "0",
      "msg": "解封失败，未传入手机号"
    })
  }

})





// 修改用户信息
router.post('/updata', function(req, res, next) {
  var whereObj = req.body
  if (req.body.user_tel) {
    sql.find(user,{user_tel: req.body.user_tel}).then( (data) =>{
      if (data.length === 1 ) {
          sql.update(user, {user_tel: req.body.user_tel}, {
            user_name: req.body.user_name,
            user_age: req.body.user_age,
            user_add: req.body.user_add,
            user_headurl: req.body.user_headurl
          }).then(() => {
            res.send({
              "code": "1",
              "msg": "修改成功"
            })
          })
      }else {
        res.send({
          "code": "-1",
          "msg": "传入手机号不存在，请检查"
        })
      }
    })
  }else {
    res.send({
      "code": "-1",
      "msg": "未传入手机号，请检查"
    })
  }


})



router.post('/code', function(req, res, next) {
  let arr = new Object
  console.log(req.body)
  const SMSClient = require('@alicloud/sms-sdk')
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进1行替换
  const accessKeyId = 'LTAIZQoVVoPuBjU9'
  const secretAccessKey = 'GfJuI2dLsCQh7Q56TmFxPTniXjkVnB'
//初始化sms_client
  let smsClient = new SMSClient({accessKeyId, secretAccessKey})
  var num = Math.floor(Math.random()*9000 + 1000)
//发送短信
  smsClient.sendSMS({
    PhoneNumbers: req.body.user_tel,
    SignName: '吴勋勋',
    TemplateCode: 'SMS_111785721',
    TemplateParam: '{"code": ' + num +'}'//可选:模板中的变量替换JSON串,如模板内容为"亲爱的${name},您的验证码为${code}"时。
  }).then(function (reslove) {
    let {Code}=reslove
    if (Code === 'OK') {
      //处理返回参数num
      codeInfo = num
      res.send({
        code: 1,
        msg: '验证码发送成功'+ codeInfo
      })
    }
  }, function (err) {
    res.send({
      code: -1,
      msg: '验证码发送失败'
    })
  })
})



// 修改账户密码
router.post('/change', function(req, res, next) {
  let whereObj = {"user_tel": req.body.user_tel};
  sql.find(user, whereObj).then((data)=>{
    if (data.length === 1) {
      if (req.body.code) {
        if (codeInfo == req.body.code) {
          if (req.body.reset) {
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            var reset = bcrypt.hashSync(req.body.reset, salt);
            sql.update(user,whereObj,{$set: {user_pwd: reset}}).then(() =>{
                  arr = {
                    "code": "1",
                    "msg": "密码修改成功"
                  }
                  codeInfo = false
                  res.send(arr);
                }
            )
          }else {
            arr = {
              "code": "0",
              "msg": "密码修改失败，未设置新密码"
            }
            res.send(arr);
          }
        }else {
          arr = {
            "code": "-1",
            "msg": "当前验证码输入错误"
          }
          res.send(arr);
        }
      }else {
        arr = {
          "code": "-1",
          "msg": "当前验证码未填写"
        }
        res.send(arr);
      }
    }else {
      arr = {
        "code": "-2",
        "msg": "当前手机号未注册"
      }
      res.send(arr);
    }
  })
  console.log(whereObj)



});


// 用户模糊搜索
router.get('/gsearch', function(req, res, next) {
  var gSearch  = req.query.sear;
  const reg=new RegExp(gSearch,'i')
  if  (gSearch) {
    sql.find(user,{  $or: [
        {user_name: {$regex: reg}},
        {user_tel: {$regex: reg}}
      ]}).then(data =>{
      if (data.length > 0) {
        console.log(data)
        res.send({
          "code": "1",
          "msg": "查询成功",
          "data" : data
        })
      }else{
        res.send({
          "code": "0",
          "msg": "未查询到符合条件的用户"
        })
      }
    })
  }else {
    res.send({
      "code": "-1",
      "msg": "您未输入数据"
    })
  }
})







//判断时候有值,并且转换成数字，如没有使用默认值
function isparam(dataObj, num) {
  if (dataObj) {
    return Number(dataObj);
  } else {
    return num
  }
}


module.exports = router;
