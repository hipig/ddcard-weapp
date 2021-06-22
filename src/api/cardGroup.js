import service from "../utils/request"

const api = {
  index: '/card-groups'
}

export const getGroups = () => service({
  url: api.index,
  method: 'get'
})
