<template>
  <view class="flex flex-col border-4 border-solid shadow-md rounded-2xl mb-6 relative overflow-hidden"
     :class="[colorClass.bg, colorClass.border]">
    <view class="absolute top-0 left-0" v-if="isLock">
      <view class="px-3 rounded-br-2xl border-t-0 border-l-0 border-r-4 border-b-4  border-solid bg-orange-900 text-white font-bold leading-5" :class="[colorClass.border]">VIP</view>  
    </view> 
    <view class="p-6 flex items-center">
      <view class="flex-1 px-2">
        <view class="text-3xl text-gray-900 font-bold">{{ name }}</view>
        <view class="text-lg text-gray-700">{{ englishName }}</view>
      </view>
      <view class="flex-shrink-0">
        <view class="rounded-lg inline-flex p-2" :class="[colorClass.iconBg]">
          <image :src="grapeIcon" class="w-16 h-16"/>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import grapeIcon from '../../assets/img/fruits/grape.svg'

const colorMap = {
  gray: {
    bg: 'bg-gray-100',
    border: 'border-gray-800',
    badgeBg: 'bg-gray-900',
    iconBg: 'bg-gray-50'
  },
  yellow: {
    bg: 'bg-yellow-100',
    border: 'border-yellow-800',
    badgeBg: 'bg-yellow-900',
    iconBg: 'bg-yellow-50'
  },
  yellow: {
    bg: 'bg-red-100',
    border: 'border-red-900',
    badgeBg: 'bg-red-800',
    iconBg: 'bg-red-50'
  },
  green: {
    bg: 'bg-green-100',
    border: 'border-green-900',
    badgeBg: 'bg-green-800',
    iconBg: 'bg-green-50'
  },
  blue: {
    bg: 'bg-blue-100',
    border: 'border-blue-800',
    badgeBg: 'bg-blue-900',
    iconBg: 'bg-blue-50'
  },
  orange: {
    bg: 'bg-orange-100',
    border: 'border-orange-800',
    badgeBg: 'bg-orange-900',
    iconBg: 'bg-orange-50'
  },
  teal: {
    bg: 'bg-teal-100',
    border: 'border-teal-800',
    badgeBg: 'bg-teal-900',
    iconBg: 'bg-teal-50'
  },
  indigo: {
    bg: 'bg-indigo-100',
    border: 'border-indigo-800',
    badgeBg: 'bg-indigo-900',
    iconBg: 'bg-indigo-50'
  },
  purple: {
    bg: 'bg-purple-100',
    border: 'border-purple-800',
    badgeBg: 'bg-purple-900',
    iconBg: 'bg-purple-50'
  },
  pink: {
    bg: 'bg-pink-100',
    border: 'border-pink-800',
    badgeBg: 'bg-pink-900',
    iconBg: 'bg-pink-50'
  }
}

export default {
  name: 'GroupItem',
  props: {
    name: String,
    englishName: String,
    color: { default: 'gray', type: String },
    icon: String,
    isLock: { default: false, type: Boolean }
  },
  data () {
    return {
      grapeIcon: grapeIcon
    }
  },
  computed: {
    colorClass() {
      return colorMap[this.color || 'gray']
    }
  }
}
</script>
