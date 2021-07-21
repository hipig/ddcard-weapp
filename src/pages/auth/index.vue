<template>
  <view class="flex flex-col px-6">
    <view class="text-center mt-16 mb-10">
      <image :src="Logo" class="w-20 h-20 rounded-full" /> 
      <view class="mt-1 text-xl text-gray-900 font-bold">嘟嘟早教卡</view>
    </view>
    <view class="py-12 border-0 border-t border-solid border-yellow-100">
      <view class="text-lg text-gray-900 font-bold mb-2">申请获取以下权限</view>
      <view class="text-gray-400">获得你的公开信息（昵称、头像等）</view>
    </view>
    <view class="px-2">
      <button @tap="handleAuthorize" class="mb-4 inline-flex justify-center items-center box-border font-bold w-full border-2 border-solid text-gray-900 border-gray-900 bg-yellow-400 rounded-md py-2 px-4 text-xl">
        授权登录
      </button>
      <button @tap="handleCancel" class="inline-flex justify-center items-center box-border font-bold w-full border-2 border-solid text-gray-900 border-gray-900 bg-white rounded-md py-2 px-4 text-xl">
        取消
      </button>
    </view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro"
import { mapActions } from "vuex"

import Logo from "../../assets/img/logo.png"

export default {
  name: "Login",
  data () {
    return {
      Logo,
      redirectUrl: null
    }
  },
  created () {
    this.redirectUrl = Taro.getCurrentInstance().router.params.redirect_url || null
  },
  methods: {
    ...mapActions({
      'login': 'auth/login',
      'storeOnlineRecord': 'online/storeOnlineRecord'
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

        await this.storeOnlineRecord()

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
