<template>
  <view class="border-4 border-solid bg-white rounded-lg mb-5" :class="[colorClass.border]">
    <view class="px-3 text-white pb-1 text-lg font-bold" :class="[colorClass.bg]">{{ name }}</view>
    <view class="p-4 flex">
      <view class="flex-shrink-0 mr-4">
        <view class="leading-0">
          <image :src="icon" class="w-20 h-20"/>
        </view>
      </view>
      <view class="flex-1 flex flex-col">
        <view>
          <view class="flex items-center justify-between">
            <view class="font-bold text-black">中文</view>
            <view class="text-gray-400 text-sm"><text class="font-bold text-lg text-red-500 mr-1">{{ zhCount }}</text>/{{ count }}</view>
          </view>
          <view class="h-2 bg-yellow-100 rounded-full relative overflow-hidden">
            <view class="bg-yellow-500 absolute left-0 inset-y-0" :style="{ width: zhRate }"></view>
          </view>
        </view>
        <view class="mt-2">
          <view class="flex items-center justify-between">
            <view class="font-bold text-black">英文</view>
            <view class="text-gray-400 text-sm flex items-center"><text class="font-bold text-lg text-red-500 mr-1">{{ enCount }}</text>/{{ count }}</view>
          </view>
          <view class="h-2 bg-yellow-100 rounded-full relative overflow-hidden">
            <view class="bg-yellow-500 absolute left-0 inset-y-0" :style="{ width: enRate }"></view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro"

const colorMap = {
  gray: {
    bg: 'bg-gray-700',
    border: 'border-gray-700',
  },
  yellow: {
    bg: 'bg-yellow-700',
    border: 'border-yellow-700',
  },
  red: {
    bg: 'bg-red-700',
    border: 'border-red-700',
  },
  green: {
    bg: 'bg-green-700',
    border: 'border-green-700',
  },
  blue: {
    bg: 'bg-blue-700',
    border: 'border-blue-700',
  },
  orange: {
    bg: 'bg-orange-700',
    border: 'border-orange-700',
  },
  teal: {
    bg: 'bg-teal-700',
    border: 'border-teal-700',
  },
  indigo: {
    bg: 'bg-indigo-700',
    border: 'border-indigo-700',
  },
  purple: {
    bg: 'bg-purple-700',
    border: 'border-purple-700',
  },
  pink: {
    bg: 'bg-pink-700',
    border: 'border-pink-700',
  }
}

export default {
  name: 'ReportItem',
  props: {
    name: String,
    color: { default: 'gray', type: String },
    icon: String,
    count: { default: 0, type: Number },
    zhCount: { default: 0, type: Number },
    enCount: { default: 0, type: Number }
  },
  computed: {
    colorClass() {
      return colorMap[this.color || 'gray']
    },
    zhRate() {
      return (this.zhCount / this.count * 100) + '%'
    },
    enRate() {
      return (this.enCount / this.count * 100) + '%'
    }
  }
}
</script>
