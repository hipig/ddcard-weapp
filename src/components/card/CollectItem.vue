<template>
  <view class="h-0 pb-full rounded-lg shadow-sm bg-gradient-to-b" :class="[ colorClass.bg ]">
    <view class="py-2 flex justify-center">
      <image :src="icon" class="w-20 h-20"/>
    </view>
    <view class="flex-shrink-0 flex flex-col items-center text-black font-bold">
      <view class="text-xl">{{ zhName }}</view>
      <view class="capitalize">{{ enName }}</view>
    </view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro"

const colorMap = {
  gray: {
    bg: 'from-gray-200 to-gray-400'
  },
  yellow: {
    bg: 'from-yellow-200 to-yellow-400'
  },
  red: {
    bg: 'from-red-200 to-red-400'
  },
  green: {
    bg: 'from-green-200 to-green-400'
  },
  blue: {
    bg: 'from-blue-200 to-blue-400'
  },
  orange: {
    bg: 'from-orange-200 to-orange-400'
  },
  teal: {
    bg: 'from-teal-200 to-teal-400'
  },
  indigo: {
    bg: 'from-indigo-200 to-indigo-400'
  },
  purple: {
    bg: 'from-purple-200 to-purple-400'
  },
  pink: {
    bg: 'from-pink-200 to-pink-400'
  }
}

export default {
  name: "StudyItem",
  props: {
    zhName: String,
    enName: String,
    color: { default: 'gray', type: String },
    icon: String
  },
  computed: {
    colorClass() {
      return colorMap[this.color || 'gray']
    }
  }
}
</script>
