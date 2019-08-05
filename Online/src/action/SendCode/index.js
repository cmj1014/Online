SendCode = ()=>{

    const SMSClient = require('@alicloud/sms-sdk')
    const accessKeyId = 'LTAIZQoVVoPuBjU9'
    const secretAccessKey = 'GfJuI2dLsCQh7Q56TmFxPTniXjkVnB'
    //初始化sms_client
    let smsClient = new SMSClient({accessKeyId, secretAccessKey})
    
    //发送短信
    const res = await smsClient.sendSMS({
        PhoneNumbers: username,
        SignName: '吴勋勋',
        TemplateCode: 'SMS_111785721',
        TemplateParam: '{"code":'+ num +'}'
    })
    let {Code}=res
    if (Code === 'OK') {
      //处理返回参数
      console.log(res)
      ctx.body ={
        code: 200,
        data: num
      }
    }
}

exports default SendCode