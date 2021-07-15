<template>
  <view class="flex flex-col min-h-screen">
    <view class="px-8 py-4">
      <view class="px-3 py-2_5 border-2 border-solid border-gray-900 bg-white rounded-2xl">
        <view class="flex items-center">
          <template v-if="isLogin">
            <view class="flex-shrink-0 flex items-center">
              <view class="inline-flex">
                <image :src="userInfo.avatar" class="w-12 h-12 border-2 border-solid border-gray-900 rounded-full" />
              </view>
            </view>
            <view class="ml-2 flex-1 flex items-center justify-between">
              <view class="text-gray-900 text-xl font-bold">{{ userInfo.name }}</view>
              <view class="border-2 border-solid border-gray-900 text-gray-900 bg-yellow-400 font-bold rounded-xl px-2 py-1 shadow-gray">赞助会员</view>
            </view>
          </template>
          <template v-else>
            <view class="flex-shrink-0 flex items-center">
              <view class="inline-flex">
                <image :src="NoAvatarIcon" class="w-12 h-12 border-2 border-solid border-gray-900 rounded-full" />
              </view>
            </view>
            <view class="ml-2 flex-1 flex items-center justify-between" @tap="handleTo('/pages/auth/index?redirect_url=' + encodeURIComponent('/pages/my/index'))">
              <view class="text-black text-xl font-bold">点击登录</view>
              <image :src="ChevronRightIcon" class="w-4 h-4" />
            </view>
          </template>
        </view>
      </view>
    </view>
    <view class="px-8 mt-4">
      <view class="mb-6">
        <view class="text-xl text-gray-800 font-bold mb-2">主要</view>
        <view class="py-1 border-2 border-solid border-gray-900 text-gray-900 bg-white text-lg font-bold rounded-2xl shadow-gray overflow-hidden">
          <view class="flex px-6 py-4_5">
            <view class="flex-1 flex items-center" @tap="handleTo('/pages/feedback/index')">
              <view class="w-5 h-5 border-2 border-solid border-gray-900 bg-yellow-400 rounded-full"></view>
              <text class="ml-2">提点意见</text>
            </view>
            <view class="flex-shrink-0 flex items-center">
              <image :src="ChevronRightIcon" class="w-4 h-4" />
            </view>
          </view>
          <button open-type="share" class="flex px-6 py-4_5 rounded-0 leading-none bg-white text-gray-900">
            <view class="flex-1 flex items-center">
              <view class="w-5 h-5 border-2 border-solid border-gray-900 bg-green-400 rounded-full"></view>
              <text class="ml-2">我要分享</text>
            </view>
            <view class="flex-shrink-0 flex items-center">
              <image :src="ChevronRightIcon" class="w-4 h-4" />
            </view>
          </button>
        </view>
      </view>
      <view class="mb-6">
        <view class="text-xl text-gray-800 font-bold mb-2">关于我们</view>
        <view class="py-1 border-2 border-solid border-gray-900 text-gray-900 bg-white text-lg font-bold rounded-2xl shadow-gray overflow-hidden">
          <view class="flex px-6 py-4_5">
            <view class="flex-1 flex items-center">
              <view class="w-5 h-5 border-2 border-solid border-gray-900 bg-yellow-400 rounded-full"></view>
              <text class="ml-2">联系我们</text>
            </view>
            <view class="flex-shrink-0 flex items-center">
              <image :src="ChevronRightIcon" class="w-4 h-4" />
            </view>
          </view>
          <view class="flex px-6 py-4_5">
            <view class="flex-1 flex items-center">
              <view class="w-5 h-5 border-2 border-solid border-gray-900 bg-indigo-400 rounded-full"></view>
              <text class="ml-2">用户协议</text>
            </view>
            <view class="flex-shrink-0 flex items-center">
              <image :src="ChevronRightIcon" class="w-4 h-4" />
            </view>
          </view>
          <view class="flex px-6 py-4_5">
            <view class="flex-1 flex items-center">
              <view class="w-5 h-5 border-2 border-solid border-gray-900 bg-yellow-400 rounded-full"></view>
              <text class="ml-2">隐私政策</text>
            </view>
            <view class="flex-shrink-0 flex items-center">
              <image :src="ChevronRightIcon" class="w-4 h-4" />
            </view>
          </view>
          <view class="flex px-6 py-4_5">
            <view class="flex-1 flex items-center">
              <view class="w-5 h-5 border-2 border-solid border-gray-900 bg-pink-400 rounded-full"></view>
              <text class="ml-2">注意事项</text>
            </view>
            <view class="flex-shrink-0 flex items-center">
              <image :src="ChevronRightIcon" class="w-4 h-4" />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro"
import { mapGetters } from "vuex"

import NoAvatarIcon from "../../assets/img/icon/no-avatar.svg"
import ChevronRightIcon from "../../assets/img/icon/chevron-right.svg"

export default {
  name: "My",
  data () {
    return {
      NoAvatarIcon,
      ChevronRightIcon,
    }
  },
  onShareAppMessage() {
    return {
      title: '嘟嘟识字卡',
      path: `/pages/index/index`,
      imageUrl: ''
    }
  },
  computed: {
    ...mapGetters({
      'token': 'auth/token',
      'userInfo': 'auth/userInfo'
    }),
    isLogin() {
      return this.token !== ''
    },
  },
  methods: {
    handleTo(url) {
      Taro.navigateTo({
        url: url
      })
    }
  }
}
</script>
