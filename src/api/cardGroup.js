import service from "../utils/request"
import { sprintf } from "../utils/util"

const api = {
  index: '/card-groups',
  show: '/card-groups/%d',
  preview: '/card-groups/%d/preview'
}

export const getGroups = () => service({
  url: api.index,
  method: 'get'
})

export const showGroup = (id) => service({
  url: sprintf(api.show, id),
  method: 'get'
})

export const previewGroup = (id) => service({
  url: sprintf(api.preview, id),
  method: 'get'
})