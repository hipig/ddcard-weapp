import service from "../utils/request"

const api = {
  index: '/plans',
}

export const getPlans = () => service({
  url: api.index,
  method: 'get'
})