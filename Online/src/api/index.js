import request from '../utils/request';

export const fetchData = (query) => {
    return request({
        url: '/ms/table/list',
        method: 'post',
        data: query
    })
}
export const daxunxun = (query) => {
    return request({
        url: '/douban',
        method: 'get',
        data: ''
    })
}