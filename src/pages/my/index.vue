<template>
  <view class="flex flex-col">
    <view class="bg-yellow-300 h-28 px-6">
      <view class="flex items-center pt-2 pb-4">
        <view class="flex-shrink-0 flex items-center">
          <view class="border-2 border-solid border-white leading-0 rounded-full overflow-hidden">
            <image :src="NoAvatarIcon" class="w-12 h-12" />
          </view>
        </view>
        <view class="ml-2 flex-1 flex items-center justify-between" @tap="handleAuthorize">
          <view class="text-black text-xl font-bold">点击登录</view>
          <image :src="ChevronRightIcon" class="w-5 h-5" />
        </view>
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
    <view class="fixed z-10 inset-0 overflow-y-auto" v-show="authorizeDialogShow">
      <view class="flex items-center justify-center min-h-screen p-6 text-center">
        <view class="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity" :animation="maskOpenAnimation"></view>

        <view class="border-2 border-solid border-black flex flex-col rounded-xl shadow-sm bg-yellow-50 overflow-hidden w-full max-w-md mx-auto z-50">
          <view class="px-6 py-4 w-full box-border">
            <text class="font-bold text-lg">需要您的授权</text>
          </view>
          <view class="px-6 py-4 flex-grow w-full box-border">
            <view class="text-gray-900">
              为了更好的提供服务，请在稍后的提示框中点击“允许”
            </view>
          </view>
          <view class="px-6 py-4 w-full box-border">
            <button open-type="getUserInfo" @getUserInfo="getUserInfo" class="mb-3 inline-flex justify-center items-center box-border font-bold w-full border-2 border-solid text-black border-black bg-yellow-400 rounded-md py-1 px-4 text-xl">
              我知道了
            </button>
            <button @tap="cancelAuthorize" class="inline-flex justify-center items-center box-border font-bold w-full border-2 border-solid text-black border-black bg-white rounded-md py-1 px-4 text-xl">
              取消
            </button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro"

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
      authorizeDialogShow: false,
      maskOpenAnimation: null,
      bodyOpenAnimation: null
    }
  },
  methods: {
    handleAuthorize() {
      this.authorizeDialogShow = true
      this.initDialogMaskOpenAnimation()
    },
    cancelAuthorize() {
      this.authorizeDialogShow = false
    },
    getUserInfo(e) {
      console.log(e)
    },
    initDialogMaskOpenAnimation() {
      let animation = Taro.createAnimation({
        duration: 200,
        timingFunction: "ease-out"
      })

      animation.opacity(1).step()

      this.maskOpenAnimation = animation.export()
    }
  }
}
</script>
