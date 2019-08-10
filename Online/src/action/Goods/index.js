import api from '../../api/DataQuery'
import axios from 'axios'
// 查询全部商品
export const getGoods = query => {
  console.log('query')
  // axios({
  //   url: '/api/goods/find',
  //   method: 'get',
  //   data: query
  // }).then(res => {
  //   console.log(res)
  //   return res
  // })
  return api({
    url: '/goods/find', // 请求方法名称
    method: 'get', // 请求方式
    data: query // 请求数据
  })
}
//添加商品
export const addGoods = query => {
  console.log('addGoods')
  return api({
    url: '/goods/insert', // 请求方法名称
    method: 'POST', // 请求方式
    data: query // 请求数据
  })
}

export const delGoods = query => {
  return api({
    url: '/goods/delete', // 请求方法名称
    method: 'post', // 请求方式
    data: query // 请求数据
  })
}

export const getGoodsTest = () => {
  console.log('test')
}