<template>
  <view class="flex flex-col px-6">
    <view class="mb-6">
      <view class="flex items-center bg-white border-2 border-solid border-black text-black text-xl font-bold rounded-xl p-px shadow" @tap="isCollect = !isCollect">
        <view class="w-1_2 text-center rounded-lg px-3" :class="{'bg-yellow-400': !isCollect}">学习报告</view>
        <view class="w-1_2 text-center rounded-lg px-3" :class="{'bg-yellow-400': isCollect}">收藏</view>
      </view>
    </view>
    <view class="mb-8">
      <view class="flex flex-col px-6 py-4 bg-white border-2 border-solid border-black text-black text-lg font-bold rounded-lg shadow-sm">
        <view class="mb-2">累计使用 <text class="px-1 text-3xl text-red-500">4</text> 天</view>
        <view>今日学习 <text class="px-1 text-yellow-400">40</text> 分钟</view>
      </view>
    </view>
    <view class="flex flex-col bg-white border-2 border-solid border-black text-black rounded-lg shadow-sm mb-8">
      <view class="px-4 py-2_5 mb-4 border-0 border-b-2 border-solid border-black">
        <view class="font-bold text-xl">学习报告</view>
      </view>
      <view class="px-2">
        <view class="border-4 border-solid bg-white border-pink-700 rounded-lg mb-5">
          <view class="px-3 bg-pink-700 text-white pb-1 text-lg">水果</view>
          <view class="p-4 flex">
            <view class="flex-shrink-0 mr-4">
              <view class="leading-0">
                <image :src="grapeIcon" class="w-20 h-20"/>
              </view>
            </view>
            <view class="flex-1 flex flex-col">
              <view>
                <view class="flex items-center justify-between">
                  <view class="font-bold text-black">中文</view>
                  <view class="text-gray-400 text-sm"><text class="font-bold text-lg text-red-500 mr-1">0</text>/12</view>
                </view>
                <view class="h-2 bg-yellow-50 rounded-full"></view>
              </view>
              <view class="mt-2">
                <view class="flex items-center justify-between">
                  <view class="font-bold text-black">英文</view>
                  <view class="text-gray-400 text-sm flex items-center"><text class="font-bold text-lg text-red-500 mr-1">0</text>/12</view>
                </view>
                <view class="h-2 bg-yellow-50 rounded-full"></view>
              </view>
            </view>
          </view>
        </view>
        <view class="border-4 border-solid bg-white border-green-700 rounded-lg mb-5">
          <view class="px-3 bg-green-700 text-white pb-1 text-lg">蔬菜</view>
          <view class="p-4 flex">
            <view class="flex-shrink-0 mr-4">
              <view class="leading-0">
                <image :src="grapeIcon" class="w-20 h-20"/>
              </view>
            </view>
            <view class="flex-1 flex flex-col">
              <view>
                <view class="flex items-center justify-between">
                  <view class="font-bold text-black">中文</view>
                  <view class="text-gray-400 text-sm"><text class="font-bold text-lg text-red-500 mr-1">0</text>/12</view>
                </view>
                <view class="h-2 bg-yellow-50 rounded-full"></view>
              </view>
              <view class="mt-2">
                <view class="flex items-center justify-between">
                  <view class="font-bold text-black">英文</view>
                  <view class="text-gray-400 text-sm flex items-center"><text class="font-bold text-lg text-red-500 mr-1">0</text>/12</view>
                </view>
                <view class="h-2 bg-yellow-50 rounded-full"></view>
              </view>
            </view>
          </view>
        </view>
        <view class="border-4 border-solid bg-white border-yellow-700 rounded-lg mb-4">
          <view class="px-3 bg-yellow-700 text-white pb-1 text-lg">动物</view>
          <view class="p-4 flex">
            <view class="flex-shrink-0 mr-4">
              <view class="leading-0">
                <image :src="grapeIcon" class="w-20 h-20"/>
              </view>
            </view>
            <view class="flex-1 flex flex-col">
              <view>
                <view class="flex items-center justify-between">
                  <view class="font-bold text-black">中文</view>
                  <view class="text-gray-400 text-sm"><text class="font-bold text-lg text-red-500 mr-1">0</text>/12</view>
                </view>
                <view class="h-2 bg-yellow-50 rounded-full"></view>
              </view>
              <view class="mt-2">
                <view class="flex items-center justify-between">
                  <view class="font-bold text-black">英文</view>
                  <view class="text-gray-400 text-sm flex items-center"><text class="font-bold text-lg text-red-500 mr-1">0</text>/12</view>
                </view>
                <view class="h-2 bg-yellow-50 rounded-full"></view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import grapeIcon from "../../assets/img/fruits/grape.svg"

export default {
  name: "Report",
  data () {
    return {
      grapeIcon,
      isCollect: false
    }
  }
}
</script>
