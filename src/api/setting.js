import service from "../utils/request"

const api = {
  general: '/settings/general'
}

export const getGeneralSettings = () => service({
  url: api.general,
  method: 'get'
})
