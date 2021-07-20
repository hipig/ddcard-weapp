<template>
  <view class="p-4 rounded-xl shadow bg-gradient-to-b" :class="[ colorClass.bg ]">
    <view class="mb-2 flex justify-center">
      <image :src="icon" class="w-18 h-18"/>
    </view>
    <view class="flex flex-col items-center text-gray-900">
      <view class="text-2xl font-bold">{{ zhName }}</view>
      <view class="capitalize">{{ enName }}</view>
    </view>
  </view>
</template>

<script>

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
