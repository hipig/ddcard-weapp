<template>
  <view class="mx-auto h-full flex flex-col bg-gradient-to-b text-white rounded-xl transform duration-200 relative"
    :class="[
      colorClass.bg,
      index === currentIndex ? 'scale-100' : 'scale-90'
    ]">
    <view class="flex-1 flex flex-col items-center justify-center">
      <view class="mb-8" v-if="isShowAnswer" @tap="handlePlay" :animation="animationData">
        <image :src="icon" class="w-48 h-48"/>
      </view>
      <view class="text-center">
        <view class="text-sm mb-2" :class="[colorClass.spellText]">{{ spell }}</view>
        <view class="text-4xl text-gray-900 font-bold capitalize">{{ name }}</view>
      </view>
    </view>
    <view class="flex-shrink-0">
      <view class="py-8 h-24 flex flex-col items-center justify-between">
        <view class="py-3 w-2_3 rounded-full text-center text-gray-900 bg-white text-lg font-bold" @tap="handleStudied">{{ isStudied ? '忘记了' : '学会了' }}</view>
        <view class="text-gray-900 text-sm" v-if="!isStudied" @tap="handleShowAnswer">{{ isShowAnswer ? '隐藏答案' : '查看答案' }}</view>
      </view>
      <view class="absolute bottom-0 right-0 mb-4 mr-4" v-if="isShowAnswer">
        <image :src="volumeUpIcon" v-if="isVolumeUp" class="w-7 h-7"/>
        <image :src="volumeDownIcon" v-else class="w-7 h-7"/>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro"

import volumeDownIcon from "../../assets/img/icon/volume-down.svg"
import volumeUpIcon from "../../assets/img/icon/volume-up.svg"

import { storeLearnRecord, deleteLearnRecord } from "../../api/learnRecord"

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
  name: "StudyItem",
  props: {
    id: { default: 0, type: Number },
    name: String,
    spell: String,
    color: { default: 'gray', type: String },
    icon: String,
    src: String,
    studied: { default: false, type: Boolean },
    mode: { default: 'zh', type: String },
    index: { default: 0, type: Number },
    currentIndex: { default: 0, type: Number },
    total: Number
  },
  data () {
    return {
      volumeDownIcon,
      volumeUpIcon,
      animationData: null,
      isVolumeUp: true,
      timer: null,
      isStudied: this.studied,
      isShowAnswer: this.studied,
      audioContext: null
    }
  },
  computed: {
    colorClass() {
      return colorMap[this.color || 'gray']
    }
  },
  watch: {
    isStudied(val) {
      this.isShowAnswer = val
    },
    isShowAnswer(val) {
      if(val) {
        this.animationData = null
        setTimeout(this.handlePlay, 100)
      }
    },
    src(val) {
      this.initAudioContext(val)
    },
  },
  created () {
    this.initAudioContext(this.src)
  },
  beforeDestroy() {
    this.handleStop()
  },
  methods: {
    handlePlay() {
      this.audioContext.play()
    },
    handleStop() {
      clearInterval(this.timer)
      this.isVolumeUp = true
    },
    handleStudied() {
      let query = this.isStudied ?
        deleteLearnRecord(this.id, { lang: this.mode }) :
        storeLearnRecord(this.id, { lang: this.mode })
      query
        .then((res) => {
          if (res.statusCode === 200 || res.statusCode === 201 || res.statusCode === 204) {
            this.isStudied = !this.isStudied
          }
        })
    },
    handleShowAnswer() {
      this.isShowAnswer = !this.isShowAnswer
    },
    initAudioContext(src) {
      let audioContext = Taro.createInnerAudioContext()
      audioContext.src = src

      audioContext.onPlay(() => {
        this.initImageScale()
        this.initInterval()
      })
      audioContext.onEnded(() => {
        this.handleStop()
      })
      this.audioContext = audioContext
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
    }
  }
}
</script>
