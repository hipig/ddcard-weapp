import service from "../utils/request"
import { sprintf } from "../utils/util"

const api = {
  store: '/records/subscription/%d'
}

export const storeSubscriptionRecord = (id) => service({
  url: sprintf(api.store, id),
  method: 'post',
  data: { auth_redirect: true }
})
