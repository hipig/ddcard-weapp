<template>
  <view class="flex flex-col">
    <view class="bg-yellow-400 h-28 px-6">
      <view class="flex items-center pt-2 pb-4">
        <template v-if="isLogin">
          <view class="flex-shrink-0 flex items-center">
            <view class="border-2 border-solid border-white leading-0 rounded-full overflow-hidden">
              <image :src="userInfo.avatar" class="w-12 h-12" />
            </view>
          </view>
          <view class="ml-2 flex-1 flex items-center justify-between">
            <view class="text-black text-xl font-bold">{{ userInfo.name }}</view>
            <image :src="ChevronRightIcon" class="w-5 h-5" />
          </view>
        </template>
        <template v-else>
          <view class="flex-shrink-0 flex items-center">
            <view class="border-2 border-solid border-white leading-0 rounded-full overflow-hidden">
              <image :src="NoAvatarIcon" class="w-12 h-12" />
            </view>
          </view>
          <view class="ml-2 flex-1 flex items-center justify-between" @tap="handleTo">
            <view class="text-black text-xl font-bold">点击登录</view>
            <image :src="ChevronRightIcon" class="w-5 h-5" />
          </view>
        </template>
      </view>
    </view>
    <view class="px-6 -mt-8">
      <view class="flex flex-col border-2 border-solid border-black text-black bg-white rounded-lg shadow">
        <view class="flex px-4 py-4_5 border-0 border-b-2 border-solid border-black font-bold text-black">
          <view class="flex-1 flex items-center">
            <image :src="VipIcon" class="w-7 h-7" />
            <text class="ml-2">开通会员</text>
          </view>
          <view class="flex-shrink-0 flex items-center">
            <text class="mr-1 text-sm text-gray-400">尊享多项豪华特权</text>
            <image :src="ChevronRightIcon" class="w-4 h-4" />
          </view>
        </view>
        <view class="flex px-4 py-4_5 border-0 border-b-2 border-solid border-black font-bold text-black">
          <view class="flex-1 flex items-center">
            <image :src="FeedbackIcon" class="w-7 h-7" />
            <text class="ml-2">提点意见</text>
          </view>
          <view class="flex-shrink-0 flex items-center">
            <image :src="ChevronRightIcon" class="w-4 h-4" />
          </view>
        </view>
        <view class="flex px-4 py-4_5 border-0 border-b-2 border-solid border-black font-bold text-black">
          <view class="flex-1 flex items-center">
            <image :src="ShareIcon" class="w-7 h-7" />
            <text class="ml-2">一起分享</text>
          </view>
          <view class="flex-shrink-0 flex items-center">
            <image :src="ChevronRightIcon" class="w-4 h-4" />
          </view>
        </view>
        <view class="flex px-4 py-4_5 border-0 border-b-2 border-solid border-black font-bold text-black">
          <view class="flex-1 flex items-center">
            <image :src="AboutIcon" class="w-7 h-7" />
            <text class="ml-2">关于我们</text>
          </view>
          <view class="flex-shrink-0 flex items-center">
            <image :src="ChevronRightIcon" class="w-4 h-4" />
          </view>
        </view>
        <view class="flex px-4 py-4_5 border-0 border-solid border-black font-bold text-black">
          <view class="flex-1 flex items-center">
            <image :src="MoreIcon" class="w-7 h-7" />
            <text class="ml-2">更多应用</text>
          </view>
          <view class="flex-shrink-0 flex items-center">
            <image :src="ChevronRightIcon" class="w-4 h-4" />
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

import VipIcon from "../../assets/img/navbar/vip.svg"
import FeedbackIcon from "../../assets/img/navbar/feedback.svg"
import ShareIcon from "../../assets/img/navbar/share.svg"
import AboutIcon from "../../assets/img/navbar/about.svg"
import MoreIcon from "../../assets/img/navbar/more.svg"
export default {
  name: "My",
  data () {
    return {
      NoAvatarIcon,
      ChevronRightIcon,
      VipIcon,
      FeedbackIcon,
      ShareIcon,
      AboutIcon,
      MoreIcon,
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
    handleTo() {
      Taro.navigateTo({
        url: '/pages/auth/index?redirect_url=' + encodeURIComponent('/pages/my/index')
      })
    }
  }
}
</script>
