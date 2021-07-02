import service from "../utils/request"
import { sprintf } from "../utils/util"

const api = {
  store: '/records/learn/%d',
  delete: '/records/learn/%d'
}

export const storeLearnRecord = (id, params) => service({
  url: sprintf(api.store, id),
  method: 'post',
  data: params
})

export const deleteLearnRecord = (id, params) => service({
  url: sprintf(api.delete, id),
  method: 'delete',
  data: params
})
