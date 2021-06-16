import Taro from "@tarojs/taro"
import * as types from "../mutation-types"
import { login, me } from "../../api/auth"

// state
export const state = {
  token: Taro.getStorageSync('token') || "",
  userInfo: Taro.getStorageSync('userInfo') || {}
}

// getters
export const getters = {
  token: state => state.token,
  userInfo: state => state.userInfo
}

// mutations
export const mutations = {
  [types.SET_TOKEN]: (state, token) => {
    Taro.setStorageSync('token', token)
    state.token = token
  },
  [types.SET_USERINFO]: (state, info) => {
    Taro.setStorageSync('userInfo', info)
    state.userInfo = info
  }
}

// actions
export const actions = {
  // 登录
  login({ commit }, params) {
    return new Promise((resolve, reject) => {
      login(params)
        .then(res => {
          commit("SET_TOKEN", res.access_token)
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      me()
        .then(res => {
          commit("SET_USERINFO", res)
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  refreshToken({ commit }, token) {
    commit('SET_TOKEN', token)
  },

  clear({ commit }) {
    commit("SET_TOKEN", "")
    commit("SET_USERINFO", {})
  }
}