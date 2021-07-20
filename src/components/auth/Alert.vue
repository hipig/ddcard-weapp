<template>
  <view class="fixed inset-x-0 bottom-0 py-4" :class="[paddingXWidth]" v-show="!isLogin">
    <view class="flex items-center justify-between px-4 py-3 border-2 border-solid border-gray-900 bg-yellow-400 text-gray-900 font-bold rounded-2xl shadow-md">
      <text>{{ message }}</text>
      <button @tap="handleTo" class="inline-flex m-0 font-bold border-2 border-solid border-gray-900 bg-white shadow-gray rounded-xl py-1_5 px-2_5 leading-5">立即登录</button>
    </view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro"
import { mapGetters, mapActions } from "vuex"

export default {
  props: {
    message: { type: String, default: '为保证用户体验，请先登录' },
    paddingXWidth: { type: String, default: 'px-6' },
    url: { type: String, default: '' }
  },
  computed: {
    ...mapGetters({
      'token': 'auth/token'
    }),
    isLogin() {
      return this.token !== ''
    }
  },
  methods: {
    ...mapActions({
      'login': 'auth/login',
      'storeOnlineRecord': 'online/storeOnlineRecord'
    }),
    handleTo() {
      Taro.navigateTo({
        url: '/pages/auth/index?redirect_url=' + encodeURIComponent(this.url)
      })
    }
  }
}
</script>
