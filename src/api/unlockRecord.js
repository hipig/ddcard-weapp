import service from "../utils/request"
import { sprintf } from "../utils/util"

const api = {
  store: '/records/unlock/%d',
}

export const storeUnlockRecord = (id) => service({
  url: sprintf(api.store, id),
  method: 'post',
  data: { auth_redirect: true }
})
