<template>
  <view class="flex flex-col px-6">
    <view class="flex justify-center mt-16 mb-10">
      <view class="w-20 h-20 rounded-full bg-yellow-400 text-lg text-black font-bold flex items-center justify-center">LOGO</view>
    </view>
    <view class="py-12 border-0 border-t border-solid border-yellow-100">
      <view class="text-xl text-black font-bold mb-2">申请获取以下权限</view>
      <view class="text-gray-400">获得你的公开信息（昵称、头像等）</view>
    </view>
    <view class="px-2">
      <button @tap="handleAuthorize" class="mb-4 inline-flex justify-center items-center box-border font-bold w-full border-2 border-solid text-black border-black bg-yellow-400 rounded-md py-2 px-4 text-xl">
        授权登录
      </button>
      <button @tap="handleCancel" class="inline-flex justify-center items-center box-border font-bold w-full border-2 border-solid text-black border-black bg-white rounded-md py-2 px-4 text-xl">
        取消
      </button>
    </view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro"
import { mapActions } from "vuex"

export default {
  name: "Login",
  data () {
    return {
      redirectUrl: null
    }
  },
  created () {
    this.redirectUrl = Taro.getCurrentInstance().router.params.redirect_url || null
  },
  methods: {
    ...mapActions({
      'login': 'auth/login',
      'getUserInfo': 'auth/getUserInfo'
    }),
    async handleAuthorize() {
      try {
        let profileInfo = await Taro.getUserProfile({ desc: '完善用户信息' })
        let loginInfo = await Taro.login()

        let params = {
          name: profileInfo.userInfo.nickName,
          avatar: profileInfo.userInfo.avatarUrl,
          code: loginInfo.code
        }

        await this.login(params)

        await this.getUserInfo()

        Taro.navigateBack()
      } catch (error) {
        console.log(error)
      }


    },
    handleCancel() {
      Taro.navigateBack()
    }
  }
}
</script>
