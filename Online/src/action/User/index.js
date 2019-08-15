import api from '../../api/DataQuery'
import axios from 'axios'

// 显示用户数量
export const getUserAllNum = query => {
  return api({
    url: '/user/num', // 请求方法名称
    method: 'get', // 请求方式
    params: query // 请求数据
  })
}
// 查询全部用户
export const getUser = query => {
  // console.log('query', query)
  return api({
    url: '/user/find', // 请求方法名称
    method: 'get', // 请求方式
    params: query // 请求数据
  })
}
//添加商品
export const addUser = query => {
  // console.log('addUser')
  return api({
    url: '/user/register', // 请求方法名称
    method: 'POST', // 请求方式
    data: query // 请求数据
  })
}
// 搜索
export const getSearch = query => {
  // console.log('search')
  return api({
    url: '/goods/gsearch', // 请求方法名称
    method: 'get', // 请求方式
    params: query // 请求数据
  })
}
// 搜索数量统计
// export const gsearchNum = query => {
//   // console.log('search')
//   return api({
//     url: '/user/gsearchNum', // 请求方法名称
//     method: 'get', // 请求方式
//     params: query // 请求数据
//   })
// }

export const delUser = query => {
  return api({
    url: '/user/delete', // 请求方法名称
    method: 'post', // 请求方式
    params: query // 请求数据
  })
}

export const getUserTest = () => {
  console.log('test')
}
