import api from '../../api/DataQuery'

// 查询全部商品
export const getGoods = query => {
  console.log(query)
  return api({
    url: '/goods/find',
    method: 'get',
    data: query
  })
}
