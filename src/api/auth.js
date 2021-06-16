import service from "../utils/request"

const api = {
  login: '/weapp/authorizations',
  me: '/me'
}

export const login = (params) => service({
  url: api.login,
  method: 'post',
  data: params
})

export const me = () => service({
  url: api.me,
  method: 'get'
})