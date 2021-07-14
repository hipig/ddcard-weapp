import service from "../utils/request"
import { sprintf } from "../utils/util"

const api = {
  userIsVip: '/validations/user-is-vip',
  groupCanLearn: '/validations/group-can-learn/%d',
}

export const validateUserIsVip = () => service({
  url: api.userIsVip,
  method: 'get'
})

export const validateGroupCanLearn = (id) => service({
  url: sprintf(api.groupCanLearn, id),
  method: 'get'
})