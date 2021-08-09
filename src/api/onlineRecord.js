import service from "../utils/request"
import { sprintf } from "../utils/util"

const api = {
  store: '/records/online',
  cumulative: '/records/online/cumulative',
  update: '/records/online/%d',
}

export const storeOnlineRecord = () => service({
  url: api.store,
  method: 'post'
})

export const updateOnlineRecord = (id, params) => service({
  url: sprintf(api.update, id),
  method: 'put',
  data: params
})

export const getCumulativeTimes = () => service({
  url: api.cumulative,
  method: 'get'
})