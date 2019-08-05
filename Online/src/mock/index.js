const Mock = require('mockjs')

function getkindlist() {
  let kindlist = []

  for (var i = 0; i < 20; i++) {
    kindlist.push({
      id: i,
      title: Mock.mock('@csentence(5, 10)'),
      img: Mock.Random.image('200x100', '#894FC4', '#FFF', 'png', i)
    })
  }
  console.log(kindlist, 'mock')
  return kindlist
}

Mock.mock('https://10.11.56.164:9000/goods/find', 'get', getkindlist)
// Mock.mock(
//   'https://www.easy-mock.com/mock/592501a391470c0ac1fab128/ms/table/list',
//   //'/ms/table/list',
//   'post',
//   getkindlist
// )
