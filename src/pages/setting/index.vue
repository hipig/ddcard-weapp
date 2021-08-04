<template>
  <view>
    <view class="px-8">
      <view class="py-2 text-gray-700">暂无设置~</view>
    </view>
    <view class="fixed bottom-0 inset-x-0 px-8 py-6">
      <button @tap="handleLogout" class="m-0 font-bold border-2 border-solid border-gray-900 text-gray-900 bg-yellow-400 rounded-xl shadow py-3_5 px-4 text-center leading-5">退出登录</button>
    </view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro"
import { mapActions } from "vuex"

export default {
  name: 'MySetting',
  data () {
    return {}
  },
  methods: {
    ...mapActions({
      'logout': 'auth/logout'
    }),
    handleLogout() {
      this.logout()
        .then(_ => {
          Taro.switchTab({
            url: '/pages/my/index'
          })
        })
    }
  }
}
</script>