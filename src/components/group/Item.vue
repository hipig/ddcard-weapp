<template>
  <view class="flex flex-col border-4 border-solid border-gray-900 shadow-xl rounded-3xl mb-6 relative overflow-hidden"
     :class="[colorClass.bg]">
    <view v-if="isLock" class="absolute top-3 -right-8 z-10 w-32 h-7 flex items-center justify-center border-0 border-t-4 border-b-4 border-solid border-gray-900 text-gray-900 bg-yellow-400 font-bold text-2xl leading-none shadow transform rotate-45">VIP</view>
    <view class="px-9 py-6 flex items-center">
      <view class="flex-1 px-2">
        <view class="text-3xl text-gray-900 font-bold mb-1">{{ zhName }}</view>
        <view class="text-lg text-gray-900 capitalize">{{ enName }}</view>
      </view>
      <view class="flex-shrink-0">
        <view class="inline-flex">
          <image :src="icon" class="w-18 h-18"/>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
const colorMap = {
  gray: {
    bg: 'bg-gray-400',
  },
  yellow: {
    bg: 'bg-yellow-400',
  },
  red: {
    bg: 'bg-red-400',
  },
  lime: {
    bg: 'bg-lime-400',
  },
  green: {
    bg: 'bg-green-400',
  },
  blue: {
    bg: 'bg-blue-400',
  },
  orange: {
    bg: 'bg-orange-400',
  },
  teal: {
    bg: 'bg-teal-400',
  },
  indigo: {
    bg: 'bg-indigo-400',
  },
  purple: {
    bg: 'bg-purple-400',
  },
  pink: {
    bg: 'bg-pink-400',
  }
}

export default {
  name: 'GroupItem',
  props: {
    zhName: String,
    enName: String,
    color: { default: 'gray', type: String },
    icon: String,
    isLock: { default: false, type: Boolean }
  },
  data () {
    return {}
  },
  computed: {
    colorClass() {
      return colorMap[this.color || 'gray']
    }
  }
}
</script>
