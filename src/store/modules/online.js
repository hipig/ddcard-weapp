import * as types from "../mutation-types"
import { storeOnlineRecord, updateOnlineRecord } from "../../api/onlineRecord"
import * as dayjs from "dayjs"
import { formats } from "dayjs/locale/zh-cn"

// state
export const state = {
  cumulativeTimes: 1,
  duration: 0,
  startedAt: null,
  recordId: null
}

// getters
export const getters = {
  cumulativeTimes: state => state.cumulativeTimes,
  duration: state => state.duration,
  startedAt: state => state.startedAt,
  recordId: state => state.recordId
}

// mutations
export const mutations = {
  [types.SET_CUMULATIVETIMES]: (state, cumulativeTimes) => {
    state.cumulativeTimes = cumulativeTimes
  },
  [types.SET_DURATION]: (state, duration) => {
    state.duration = duration
  },
  [types.SET_STARTEDAT]: (state, startedAt) => {
    state.startedAt = startedAt
  },
  [types.SET_RECORDID]: (state, recordId) => {
    state.recordId = recordId
  }
}

// actions
export const actions = {
  storeOnlineRecord({ commit }) {
    return new Promise((resolve, reject) => {
      storeOnlineRecord()
        .then(res => {
          commit("SET_CUMULATIVETIMES", res.data.cumulative_times || 1)
          commit("SET_DURATION", res.data.duration || 0)
          commit("SET_STARTEDAT", dayjs().format('YYYY-MM-DD HH:mm:ss'))
          commit("SET_RECORDID", res.data.id)
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  updateOnlineRecord({ commit, getters }, ) {
    return new Promise((resolve, reject) => {
      updateOnlineRecord(getters.recordId, {
        started_at: getters.startedAt
      })
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
