import api from '../../api/DataQuery'
import axios from 'axios'

/**
 *
 * @param {*} 使用get  参数为params，使用 post 参数data
 */

// 显示数据量
export const getPageAllNum = query => {
  return api({
    url: '/goods/num', // 请求方法名称
    method: 'get', // 请求方式
    params: query // 请求数据
  })
}
// 查询全部商品
export const getGoods = query => {
  console.log('query', query)
  // axios({
  //   url: '/api/goods/find',
  //   method: 'get',
  //   data: query
  // }).then(res => {
  //   console.log(res)
  //   return res
  // })
  // axios.get('/api/goods/find', { params: query }).then(res => {
  //   console.log(res)
  // })
  return api({
    url: '/goods/find', // 请求方法名称
    method: 'get', // 请求方式
    params: query // 请求数据
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
// 搜索
export const getSearch = query => {
  console.log('search')
  return api({
    url: '/goods/gsearch', // 请求方法名称
    method: 'get', // 请求方式
    params: query // 请求数据
  })
}
// 搜索数量统计
export const gsearchNum = query => {
  console.log('search')
  return api({
    url: '/goods/gsearchNum', // 请求方法名称
    method: 'get', // 请求方式
    params: query // 请求数据
  })
}
// 删除商品
export const delGoods = query => {
  return api({
    url: '/goods/delete', // 请求方法名称
    method: 'post', // 请求方式
    data: query // 请求数据
  })
}

// 恢复商品

export const resumeGoods = query => {
  return api({
    url: '/goods/resume', // 请求方法名称
    method: 'post', // 请求方式
    data: query // 请求数据
  })
}
export const getGoodsTest = () => {
  console.log('test')
}
