const Mock = require('mockjs');
// import Moch from 'mochjs';
function getBannerFn() {
  let arr = []
  for( let i =0;i < 10; i++) {
      arr.push({ id:'banner' + i,
      imgSrc:Mock.Random.image( Mock.mock('@color()')),
      alt:'',
      href:''
    })   
  }
  return {
    code:200,
    message:'ok',
    data:arr
  }
}

Mock.mock('http://10.11.555.1111','get',getBannerFn)