import service from "../utils/request"

const api = {
  login: '/weapp/authorizations',
  logout: '/authorizations',
  me: '/me'
}

export const login = (params) => service({
  url: api.login,
  method: 'post',
  data: params
})

export const logout = () => service({
  url: api.logout,
  method: 'delete'
})

export const me = () => service({
  url: api.me,
  method: 'get'
})