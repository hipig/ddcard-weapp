import service from "../utils/request"
import { sprintf } from "../utils/util"

const api = {
  show: '/abouts/%s'
}

export const showAbout = (key) => service({
  url: sprintf(api.show, key),
  method: 'get'
})
