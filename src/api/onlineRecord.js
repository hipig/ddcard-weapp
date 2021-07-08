import service from "../utils/request"

const api = {
  show: '/records/online',
  update: '/records/online',
}

export const showOnlineRecord = () => service({
  url: api.show,
  method: 'get'
})

export const updateOnlineRecord = (params) => service({
  url: api.update,
  method: 'put',
  data: params
})
