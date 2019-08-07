import axios from 'axios'

const service = axios.create({
  // process.env.NODE_ENV === 'development' 来判断是否开发环境
  //baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
  baseURL: 'https://10.11.56.164:9000',
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    console.log('config', config)
    return config
  },
  error => {
    console.log(error)
    return Promise.reject()
  }
)

service.interceptors.response.use(
  response => {
    console.log('response', response)
    if (response.status === 200) {
      return response.data
    } else {
      Promise.reject()
    }
  },
  error => {
    console.log(error)
    return Promise.reject()
  }
)

export default service
