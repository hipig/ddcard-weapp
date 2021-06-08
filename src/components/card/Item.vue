<template>
  <view class="mx-auto h-full flex flex-col bg-gradient-to-b text-white rounded-xl transform duration-200" :class="colorClass">
    <view class="flex-shrink-0">
      <view class="p-4 flex items-center justify-between">
        <view class="flex">
          <view class="px-2">
            收藏
          </view>
          <view class="px-2">
            分享
          </view>
        </view>
        <view class="w-9 h-9 rounded-md inline-flex items-center justify-center bg-white text-gray-800 text-lg font-bold">Aa</view>
      </view>
    </view>
    <view class="flex-1">1</view>
    <view class="flex-shrink-0">
      <view class="p-5 text-center relative">
        <view class="absolute right-0 mr-4 flex items-center">喇叭</view>
        <view>{{ currentIndex + 1 }} / {{ total }}</view>
      </view>
    </view>
  </view>
</template>

<script>
const colorMap = {
  gray: 'from-gray-200 to-gray-500',
  yellow: 'from-yellow-200 to-yellow-500',
  red: 'from-red-200 to-red-500',
  green: 'from-green-200 to-green-500',
  blue: 'from-blue-200 to-blue-500',
  orange: 'from-orange-200 to-orange-500',
  teal: 'from-teal-200 to-teal-500',
  indigo: 'from-indigo-200 to-indigo-500',
  purple: 'from-purple-200 to-purple-500',
  pink: 'from-pink-200 to-pink-500'
}

export default {
  name: "CardItem",
  props: {
    zhName: String,
    enName: String,
    zhSpell: String,
    enSpell: String,
    color: { default: 'gray', type: String },
    icon: String,
    currentIndex: { default: 0, type: Number },
    total: Number
  },
  computed: {
    colorClass() {
      return colorMap[this.color || 'gray']
    }
  }
}
</script>
