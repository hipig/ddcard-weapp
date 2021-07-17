import service from "../utils/request"
import { sprintf } from "../utils/util"

const api = {
  store: '/records/online',
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
