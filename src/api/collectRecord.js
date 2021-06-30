import service from "../utils/request"
import { sprintf } from "../utils/util"

const api = {
  index: '/records/collect',
  store: '/records/collect/%d',
  delete: '/records/collect/%d'
}

export const getCollectRecords = () => service({
  url: api.index,
  method: 'get'
})

export const storeCollectRecord = (id) => service({
  url: sprintf(api.store, id),
  method: 'post'
})

export const deleteCollectRecord = (id) => service({
  url: sprintf(api.delete, id),
  method: 'delete'
})
