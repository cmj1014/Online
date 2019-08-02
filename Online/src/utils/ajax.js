import axios from 'axios';
// 开发环境（start）   生产环境(build)   测试环境(test)
// 如果运行的是 npm run start 则为真其余为假
const isDev = process.env.NODE_ENV === 'developement';
// 自定义配置axios
const ajax = axios.create({
  // baseURL: idDev ? 'http://10.11.56.148:3000' : 'https://www.daxunxun.com'
  baseURL: isDev ? 'https://www.daxunxun.com' : 'https://www.daxunxun.com',
  //timeout: 6 * 1000 
  timeout: 12 * 1000 
})
// 添加请求拦截器
ajax.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 设置请求头、设置loading动画
  console.log('开始加载数据了')
  return config;
}, function (error) {
  // 对请求错误做些什么
  console.log('没有请求到数据')
  return Promise.reject(error);
});
// 添加响应拦截器
ajax.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log('接收到数据了')
  return response;
}, function (error) {
  // 对响应错误做点什么
  console.log('数据接收错误')
  return Promise.reject(error);
});
export default ajax;