import * as types from "../mutation-types"
import { getGeneralSettings } from "../../api/setting"

// state
export const state = {
  vipShow: true,
}

// getters
export const getters = {
  vipShow: state => state.vipShow
}

// mutations
export const mutations = {
  [types.SET_VIPSHOWSTATUS]: (state, vipShow) => {
    state.vipShow = vipShow
  }
}

// actions
export const actions = {
  getGeneralSettings({ commit }) {
    return new Promise((resolve, reject) => {
      getGeneralSettings()
        .then(res => {
          commit("SET_VIPSHOWSTATUS", res.data.vip_show == 1)
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
