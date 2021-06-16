import Taro from "@tarojs/taro"
import store from "../store"

const baseUrl = "http://jcard.test/api/v1/"

const showError = (message, icon = 'none', duration = 2000) => {
  Taro.showToast({
    title: message,
    icon: icon,
    duration: duration
  })

  return Promise.reject(message)
}

const statusInterceptor = (chain) => {
  const requestParams = chain.requestParams

  return chain.proceed(requestParams).then(res => {
    switch (res.statusCode) {
      case 200:
      case 201:
      case 204:
        return res.data  
      case 401:
        const token = store.getters['user/token']
        if (token) {
          store.dispatch('user/clear')
        }
        // TODO::跳转
        break;
      case 403:
        return showError('您的权限不足，拒绝访问！')
      case 429:
        return showError('重复访问次数过多！')  
      default:
        return showError(response.data.message || '请求出现错误或服务器异常，请稍后再试！')
    }
  })
}

Taro.addInterceptor(statusInterceptor)

const service = (params) => {
  const { url, data, method } = params
  const header = params.header || {}
  const token = store.getters['user/token']
  if (token) {
    header['Authorization'] = 'Bearer ' + token
  }

  const option = {
    url: baseUrl + url,
    data,
    method,
    header
  }

  return Taro.request(option)
}

export default service