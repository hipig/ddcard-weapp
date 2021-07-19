import service from "../utils/request"
import { sprintf } from "../utils/util"

const api = {
  index: '/feedback',
  store: '/feedback',
  viewReply: '/feedback/view-reply',
}

export const getFeedback = () => service({
  url: api.index,
  method: 'get'
})

export const storeFeedback = (params) => service({
  url: api.store,
  method: 'post',
  data: Object.assign({}, params, { auth_redirect: true })
})

export const viewFeedbackReply = () => service({
  url: api.viewReply,
  method: 'put'
})
