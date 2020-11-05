import axios from 'axios'

const service = axios.create({
  timeout: 3 * 60 * 60 // request timeout
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status && res.status !== 200) {
      if (res.status === 401) {
        console.log('登录失效')
      }
      return Promise.reject(res || 'error')
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default service
