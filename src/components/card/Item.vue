<template>
  <view class="mx-auto h-full flex flex-col bg-gradient-to-b text-white rounded-xl transform duration-200 relative"
    :class="[
      colorClass.bg,
      index === currentIndex ? 'scale-100' : 'scale-90'
    ]">
    <view class="flex-shrink-0">
      <view class="p-4 flex items-center justify-between">
        <view class="flex">
          <view class="ml-2 leading-0" @tap="handleCollect">
            <image :src="starFillIcon" v-if="isCollect" class="w-8 h-8"/>
            <image :src="starIcon" v-else class="w-8 h-8"/>
          </view>
          <view class="ml-5 leading-0" @tap="handleShare">
            <image :src="shareFillIcon" class="w-8 h-8"/>
          </view>
        </view>
        <view @tap="handleSwitchMode" class="w-9 h-9 rounded-lg inline-flex items-center justify-center bg-white text-gray-800 text-lg font-bold">
          {{ mode === 'zh' ? 'Aa' : '中' }}
        </view>
      </view>
    </view>
    <view class="flex-1 flex flex-col items-center justify-center">
      <view class="mb-8" :animation="animationData" @tap="handlePlay">
        <image :src="icon" class="w-48 h-48"/>
      </view>
      <view class="text-center">
        <template v-if="mode === 'zh'">
          <view class="mb-2" :class="[colorClass.spellText]">{{ zhSpell }}</view>
          <view class="text-4xl text-gray-900 font-bold capitalize">{{ zhName }}</view>
        </template>
        <template v-else>
          <view class="mb-2 text-4xl text-gray-900 font-bold capitalize">{{ enName }}</view>
          <view class="font-bold" :class="[colorClass.spellText]">{{ enSpell }}</view>
        </template>
      </view>
    </view>
    <view class="flex-shrink-0">
      <view class="p-5 text-center relative">
        <view class="text-lg">{{ index + 1 }} / {{ total }}</view>
      </view>
      <view class="absolute bottom-0 right-0 mb-4 mr-4 flex items-center">
        <image :src="volumeUpIcon" v-if="isVolumeUp" class="w-7 h-7"/>
        <image :src="volumeDownIcon" v-else class="w-7 h-7"/>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro"

import starIcon from "../../assets/img/icon/star.svg"
import starFillIcon from "../../assets/img/icon/star-fill.svg"
import shareFillIcon from "../../assets/img/icon/share-fill.svg"
import volumeDownIcon from "../../assets/img/icon/volume-down.svg"
import volumeUpIcon from "../../assets/img/icon/volume-up.svg"

import { storeCollectRecord, deleteCollectRecord } from "../../api/collectRecord"

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
  lime: {
    bg: 'from-lime-200 to-lime-400',
    spellText: 'text-lime-900'
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
    id: { default: 0, type: Number },
    zhName: String,
    enName: String,
    zhSpell: String,
    enSpell: String,
    color: { default: 'gray', type: String },
    icon: String,
    index: { default: 0, type: Number },
    currentIndex: { default: 0, type: Number },
    playStatus: { default: false, type: Boolean },
    mode: { default: 'zh', type: String },
    collected: { default: false, type: Boolean },
    total: Number
  },
  data () {
    return {
      starIcon,
      starFillIcon,
      shareFillIcon,
      volumeDownIcon,
      volumeUpIcon,
      animationData: null,
      isCollect: this.collected,
      isVolumeUp: true,
      timer: null,
      isCurrent: false
    }
  },
  computed: {
    colorClass() {
      return colorMap[this.color || 'gray']
    }
  },
  watch: {
    playStatus(val) {
      if (val) {
        this.initImageScale()
        this.initInterval()
      } else {
        clearInterval(this.timer)
        this.isVolumeUp = true
      }
    }
  },
  methods: {
    handleCollect() {
      let query = this.isCollect ?
        deleteCollectRecord(this.id) :
        storeCollectRecord(this.id)
      query
        .then((res) => {
          if (res.statusCode === 200 || res.statusCode === 201 || res.statusCode === 204) {
            this.isCollect = !this.isCollect
            Taro.showToast({
              title: this.isCollect ? '收藏成功' : '取消收藏',
              icon: 'none'
            })
          }
        })
        .catch(err => {
          if (err.statusCode === 403) {
            Taro.eventCenter.trigger('showDialog', err.data.message, 'collect')
          }
        })
    },
    handleShare() {
      Taro.showToast({
        title: '分享功能正在开发中...',
        icon: 'none'
      })
    },
    handleSwitchMode() {
      Taro.eventCenter.trigger('switchMode')
    },
    handlePlay() {
      Taro.eventCenter.trigger('playAudio')
    },
    handleStop() {
      clearInterval(this.timer)
      this.isVolumeUp = true
    },
    initImageScale() {
      let animation = Taro.createAnimation({
        duration: 200
      })

      animation.scale(1.2).step()
      animation.scale(1).step()

      this.animationData = animation
    },
    initInterval() {
      this.timer = setInterval(() => {
        this.isVolumeUp = !this.isVolumeUp
      }, 200)
    },
    handleUpgrade() {
      Taro.navigateTo({
        url: '/pages/vip/index'
      })
    }
  }
}
</script>
