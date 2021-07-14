<template>
  <view class="flex flex-col min-h-screen bg-white">
    <view class="flex flex-col px-6 pt-4 pb-24">
      <scroll-view class="flex flex-col">
        <view class="mb-6">
          <view class="text-center text-gray-500 mb-4">2021-07-14 23:38</view>
          <view class="flex pr-4">
            <view class="flex-shrink-0 mr-4">
              <image :src="NoAvatarIcon" class="w-12 h-12 border-2 border-solid border-gray-900 rounded-full" />
            </view>
            <view class="flex-1 flex flex-col py-1">
              <view class="mb-3">
                <view class="inline-flex border-2 border-solid border-gray-900 text-gray-900 bg-yellow-400 px-5 py-2_5 rounded-xl text-lg font-bold leading-6">你好</view>
              </view>
              <view class="mb-3">
                <view class="inline-flex border-2 border-solid border-gray-900 text-gray-900 bg-yellow-400 px-5 py-2_5 rounded-xl text-lg font-bold leading-6">我有一个问题想请教您，不知道您现在是否方便？</view>
              </view>
            </view>
          </view>
        </view>

        <view class="mb-6">
          <view class="text-center text-gray-500 mb-4">2021-07-15 12:01</view>
          <view class="flex text-right pl-4">
            <view class="flex-1 flex flex-col py-1">
              <view class="mb-3">
                <view class="inline-flex border-2 border-solid border-gray-900 text-gray-900 bg-teal-400 px-5 py-2_5 rounded-xl text-lg font-bold leading-6 text-left">晚上好！</view>
              </view>
              <view class="mb-3">
                <view class="inline-flex border-2 border-solid border-gray-900 text-gray-900 bg-teal-400 px-5 py-2_5 rounded-xl text-lg font-bold leading-6 text-left">我是这里的小管家，请问有什么可以帮到您？</view>
              </view>
            </view>
          </view>
        </view>

         <view class="mb-6">
          <view class="text-center text-gray-500 mb-4">2021-07-14 23:38</view>
          <view class="flex pr-4">
            <view class="flex-shrink-0 mr-4">
              <image :src="NoAvatarIcon" class="w-12 h-12 border-2 border-solid border-gray-900 rounded-full" />
            </view>
            <view class="flex-1 flex flex-col py-1">
              <view class="mb-3">
                <view class="inline-flex border-2 border-solid border-gray-900 text-gray-900 bg-yellow-400 px-5 py-2_5 rounded-xl text-lg font-bold leading-6">你好</view>
              </view>
              <view class="mb-3">
                <view class="inline-flex border-2 border-solid border-gray-900 text-gray-900 bg-yellow-400 px-5 py-2_5 rounded-xl text-lg font-bold leading-6">我有一个问题想请教您，不知道您现在是否方便？</view>
              </view>
            </view>
          </view>
        </view>

        <view class="mb-6">
          <view class="text-center text-gray-500 mb-4">2021-07-15 12:01</view>
          <view class="flex text-right pl-4">
            <view class="flex-1 flex flex-col py-1">
              <view class="mb-3">
                <view class="inline-flex border-2 border-solid border-gray-900 text-gray-900 bg-teal-400 px-5 py-2_5 rounded-xl text-lg font-bold leading-6 text-left">晚上好！</view>
              </view>
              <view class="mb-3">
                <view class="inline-flex border-2 border-solid border-gray-900 text-gray-900 bg-teal-400 px-5 py-2_5 rounded-xl text-lg font-bold leading-6 text-left">我是这里的小管家，请问有什么可以帮到您？</view>
              </view>
            </view>
          </view>
        </view>

      </scroll-view>
    </view>
    <view class="fixed bottom-0 inset-x-0 px-6 py-5 bg-white">
      <view class="flex items-center">
        <view class="flex-1">
          <input type="text" :cursor-spacing="30" class="px-4 py-3 border-2 border-solid border-gray-900 text-gray-900 bg-white rounded-xl" placeholder="请填写内容..."/>
        </view>
        <view class="flex-shrink-0 ml-4">
          <button class="inline-flex m-0 font-bold border-2 border-solid text-black border-black bg-yellow-400 rounded-xl shadow-gray text-xl py-3 px-5 leading-5">发送</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import NoAvatarIcon from "../../assets/img/icon/no-avatar.svg"
import ContentIcon from "../../assets/img/icon/content.svg"

export default {
  data () {
    return {
      NoAvatarIcon,
      ContentIcon
    }
  }
}
</script>
