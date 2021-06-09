<template>
  <view class="mx-auto h-full flex flex-col bg-gradient-to-b text-white rounded-xl transform duration-200"
    :class="[
      colorClass.bg,
      index === currentIndex ? 'scale-100' : 'scale-90'
    ]">
    <view class="flex-1 flex flex-col items-center justify-center">
      <view @tap="handlePlay" :animation="animationData">
        <image :src="grapeIcon" class="w-48 h-48"/>
      </view>
      <view class="mt-8">
        <view class="text-sm mb-2" :class="[colorClass.spellText]">{{ modeText == 'Aa' ? zhSpell : enSpell }}</view>
        <view class="text-4xl text-gray-900 font-bold capitalize">{{ modeText == 'Aa' ? zhName : enName }}</view>
      </view>
    </view>
    <view class="flex-shrink-0">
      <view class="py-6 flex flex-col items-center">
        <view class="py-2_5 w-4__5 rounded-full text-center text-gray-900 bg-white text-lg font-bold">学会了</view>
        <view class="text-gray-900 text-sm mt-2">查看答案</view>
      </view>
      <view class="relative">
        <view class="absolute bottom-0 right-0 mb-4 mr-4 flex items-center" @tap="handleStop">
          <image :src="volumeUpIcon" v-show="isVolumeUp" class="w-7 h-7"/>
          <image :src="volumeDownIcon" v-show="!isVolumeUp" class="w-7 h-7"/>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro"
import grapeIcon from "../../assets/img/fruits/grape.svg"

import starIcon from "../../assets/img/icon/star.svg"
import starFillIcon from "../../assets/img/icon/star-fill.svg"
import shareFillIcon from "../../assets/img/icon/share-fill.svg"
import volumeDownIcon from "../../assets/img/icon/volume-down.svg"
import volumeUpIcon from "../../assets/img/icon/volume-up.svg"

const colorMap = {
  gray: {
    bg: 'from-gray-200 to-gray-400',
    spellText: 'text-gray-900'
  },
  yellow: {
    bg: 'from-yellow-200 to-yellow-400',
    spellText: 'text-yellow-900'
  },
  red: {
    bg: 'from-red-200 to-red-400',
    spellText: 'text-red-900'
  },
  green: {
    bg: 'from-green-200 to-green-400',
    spellText: 'text-green-900'
  },
  blue: {
    bg: 'from-blue-200 to-blue-400',
    spellText: 'text-blue-900'
  },
  orange: {
    bg: 'from-orange-200 to-orange-400',
    spellText: 'text-orange-900'
  },
  teal: {
    bg: 'from-teal-200 to-teal-400',
    spellText: 'text-teal-900'
  },
  indigo: {
    bg: 'from-indigo-200 to-indigo-400',
    spellText: 'text-indigo-900'
  },
  purple: {
    bg: 'from-purple-200 to-purple-400',
    spellText: 'text-purple-900'
  },
  pink: {
    bg: 'from-pink-200 to-pink-400',
    spellText: 'text-pink-900'
  }
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
    index: { default: 0, type: Number },
    currentIndex: { default: 0, type: Number },
    total: Number
  },
  data () {
    return {
      grapeIcon,
      starIcon,
      starFillIcon,
      shareFillIcon,
      volumeDownIcon,
      volumeUpIcon,
      animationData: null,
      isCollect: false,
      modeText: 'Aa',
      isVolumeUp: true,
      timer: null
    }
  },
  computed: {
    colorClass() {
      return colorMap[this.color || 'gray']
    }
  },
  watch: {
    currentIndex(val) {
      if(this.index === val) {
        this.handlePlay()
      }
    }
  },
  beforeDestroy() {
    this.handleStop()
  },
  methods: {
    handleCollect() {
      this.isCollect = !this.isCollect
      Taro.showToast({
        title: this.isCollect ? '收藏成功' : '取消收藏',
        icon: 'none',
        duration: 2000
      })
    },
    handleSwitchMode() {
      this.modeText = this.modeText == 'Aa' ? '中' : 'Aa'

      this.handlePlay()
    },
    handlePlay() {
      let animation = Taro.createAnimation({
        duration: 200
      })

      animation.scale(1.2).step()
      animation.scale(1).step()

      this.animationData = animation
      this.initInterval()

      setTimeout(this.handleStop, 3000)
    },
    handleStop() {
      clearInterval(this.timer)
      this.isVolumeUp = true
    },
    initInterval() {
      this.timer = setInterval(() => {
        this.isVolumeUp = !this.isVolumeUp
      }, 500)
    }
  }
}
</script>
