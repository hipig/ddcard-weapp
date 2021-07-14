import Taro from "@tarojs/taro"
import store from "../store"

const baseUrl = "http://ddcard.test/api/v1"

const getCurrentPageUrl = () => {
  let pages = Taro.getCurrentPages()
  let currentPage = pages[pages.length - 1]
  let url = currentPage.route
  return url
}

const pageToLogin = () => {
  let path = getCurrentPageUrl()
  if (!path.includes('auth')) {
    Taro.navigateTo({
      url: "/pages/auth/index?redirect_url=" + encodeURIComponent(path)
    });
  }
}

const showError = (message, icon = 'none', duration = 2000) => {
  Taro.showToast({
    title: message,
    icon: icon,
    duration: duration
  })
}

const statusInterceptor = (chain) => {
  const requestParams = chain.requestParams

  return chain.proceed(requestParams).then(res => {

    const token = res.header.Authorization
    if (token) {
      store.dispatch('auth/refreshToken')
    }

    switch (res.statusCode) {
      case 200:
      case 201:
      case 204:
        return Promise.resolve(res)
      case 401:
        const token = store.getters['auth/token']
        if (token) {
          store.dispatch('auth/clear')
        }
        pageToLogin()
        break;
      case 403:
        return Promise.reject(res)
      case 429:
        showError('重复访问次数过多！')
        return Promise.reject(res)
      default:
        showError(res.data.message || '请求出现错误或服务器异常，请稍后再试！')
        return Promise.reject(res)
    }
  })
}

Taro.addInterceptor(statusInterceptor)

const service = (params) => {
  const { url, data, method } = params
  const header = params.header || {}
  const token = store.getters['auth/token']
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
