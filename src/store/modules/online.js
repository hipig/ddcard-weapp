import Taro from "@tarojs/taro"
import * as types from "../mutation-types"
import { showOnlineRecord, updateOnlineRecord } from "../../api/onlineRecord"

// state
export const state = {
  duration: 0,
  startedAt: null
}

// getters
export const getters = {
  duration: state => state.duration,
  startedAt: state => state.startedAt
}

// mutations
export const mutations = {
  [types.SET_DURATION]: (state, duration) => {
    state.duration = duration
  },
  [types.SET_STARTEDAT]: (state, startedAt) => {
    state.startedAt = startedAt
  }
}

// actions
export const actions = {
  showOnlineRecord({ commit }) {
    return new Promise((resolve, reject) => {
      showOnlineRecord()
        .then(res => {
          commit("SET_DURATION", res.data.duration)
          commit("SET_STARTEDAT", res.data.updated_at)
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  updateOnlineRecord({ commit, getters }, ) {
    return new Promise((resolve, reject) => {
      updateOnlineRecord({
        started_at: getters.startedAt
      })
        .then(res => {
          commit("SET_DURATION", res.data.duration)
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
