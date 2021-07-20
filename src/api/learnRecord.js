import service from "../utils/request"
import { sprintf } from "../utils/util"

const api = {
  index: '/records/learn',
  store: '/records/learn/%d',
  delete: '/records/learn/%d'
}

export const getLearnRecords = () => service({
  url: api.index,
  method: 'get'
})

export const storeLearnRecord = (id, params) => service({
  url: sprintf(api.store, id),
  method: 'post',
  data: Object.assign({}, params, { auth_redirect: true })
})

export const deleteLearnRecord = (id, params) => service({
  url: sprintf(api.delete, id),
  method: 'delete',
  data: params,
  data: Object.assign({}, params, { auth_redirect: true })
})
