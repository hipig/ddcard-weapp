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
      <view class="mb-8" @tap="handlePlay" :animation="animationData">
        <image :src="icon" class="w-48 h-48"/>
      </view>
      <view class="text-center">
        <view class="text-sm mb-2" :class="[colorClass.spellText]">{{ mode === 'zh' ? zhSpell : enSpell }}</view>
        <view class="text-4xl text-gray-900 font-bold capitalize">{{ mode === 'zh' ? zhName : enName }}</view>
      </view>
    </view>
    <view class="flex-shrink-0">
      <view class="p-5 text-center relative">
        <view class="text-lg">{{ currentIndex + 1 }} / {{ total }}</view>
      </view>
      <view class="absolute bottom-0 right-0 mb-4 mr-4 flex items-center">
        <image :src="volumeUpIcon" v-if="isVolumeUp" class="w-7 h-7"/>
        <image :src="volumeDownIcon" v-else class="w-7 h-7"/>
      </view>
    </view>
    <view class="fixed z-10 inset-0" v-show="collectDialogShow">
      <view class="flex items-center justify-center min-h-screen p-12">
        <view class="fixed inset-0 bg-gray-700 bg-opacity-50 transition-opacity" @tap="collectDialogShow = false"></view>
        <view class="border-2 border-solid border-gray-900 flex flex-col rounded-xl shadow-sm bg-yellow-100 overflow-hidden w-full max-w-md mx-auto z-50">
          <view class="px-6 py-3 w-full box-border">
            <text class="text-gray-900 font-bold text-xl">VIP卡片收藏</text>
          </view>
          <view class="px-6 py-1 flex-grow w-full box-border">
            <text class="text-gray-900">升级VIP，解锁全部卡组，收藏卡片学习更快捷</text>
          </view>
          <view class="px-6 py-4 w-full box-border">
            <view class="flex -mx-2 box-border">
              <view class="w-1_2 px-2 box-border">
                <button @tap="collectDialogShow = false" class="inline-flex justify-center items-center box-border font-bold w-full border-2 border-solid text-gray-900 border-gray-900 bg-white rounded-xl py-1 px-4 text-xl">
                  取消
                </button>
              </view>
              <view class="w-1_2 px-2 box-border">
                <button @tap="handleUpgrade" class="inline-flex justify-center items-center box-border font-bold w-full border-2 border-solid text-white border-gray-900 bg-gray-900 rounded-xl py-1 px-4 text-xl">
                  立即升级
                </button>
              </view>
            </view>
          </view>
        </view>
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
    zhSrc: String,
    enSrc: String,
    index: { default: 0, type: Number },
    currentIndex: { default: 0, type: Number },
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
      mode: 'zh',
      isVolumeUp: true,
      timer: null,
      zhAudioContext: null,
      enAudioContext: null,
      collectDialogShow: false
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
        setTimeout(this.handlePlay, 350)
      }
    },
    zhSrc(val) {
      this.initZhAudioContext(val)
    },
    enSrc(val) {
      this.initEnAudioContext(val)
    }
  },
  created() {
    this.initZhAudioContext(this.zhSrc)
    this.initEnAudioContext(this.enSrc)
  },
  mounted() {
    if (this.index == 0) {
      setTimeout(this.handlePlay, 800)
    }
  },
  onHide() {
    this.handleStop()
    this.collectDialogShow = false
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
            Taro.showToast({
              title: err.data.message,
              icon: 'none'
            })
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
      this.mode = this.mode === 'zh' ? 'en' : 'zh'
      setTimeout(this.handlePlay, 350)
    },
    handlePlay() {
      let context = this.mode === 'zh' ? this.zhAudioContext : this.enAudioContext
      context.src && context.play()
    },
    handleStop() {
      clearInterval(this.timer)
      this.isVolumeUp = true
    },
    initZhAudioContext(src) {
      let zhAudioContext = Taro.createInnerAudioContext()
      zhAudioContext.src = src

      zhAudioContext.onPlay(() => {
        this.initImageScale()
        this.initInterval()
      })
      zhAudioContext.onEnded(() => {
        this.handleStop()
      })
      this.zhAudioContext = zhAudioContext
    },
    initEnAudioContext(src) {
      let enAudioContext = Taro.createInnerAudioContext()
      enAudioContext.src = src

      enAudioContext.onPlay(() => {
        this.initImageScale()
        this.initInterval()
      })
      enAudioContext.onEnded(() => {
        this.handleStop()
      })
      this.enAudioContext = enAudioContext
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
