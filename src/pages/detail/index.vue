<template>
  <view class="flex flex-col">
    <view class="flex-1 py-12">
      <swiper
        class="h-128"
        previous-margin="30px"
        next-margin="30px"
        :current="currentIndex"
        :circular="true"
        @change="handleChange">
        <swiper-item v-for="(item, index) in cards" :key="item.id">
          <card-item :zh-name="item.zh_name"
            :en-name="item.en_name"
            :zh-spell="item.zh_spell"
            :en-spell="item.en_spell"
            :color="item.color"
            :icon="item.icon"
            :zh-src="item.zh_src"
            :en-src="item.en_src"
            :index="index"
            :current-index="currentIndex"
            :total="cards.length"/>
        </swiper-item>
      </swiper>
    </view>
    <view class="flex items-end justify-center">
      <view class="relative">
        <view @tap="handleDropShow" class="inline-flex items-center font-bold border-2 border-solid text-black border-black bg-yellow-400 rounded-lg shadow-yellow py-1 px-4 text-xl">
          <text class="mr-0_5">测一测</text>
          <image :src="arrowUpFillIcon" class="w-6 h-6 -mr-1" />
        </view>
        <view class="absolute origin-center bottom-full right-1_2 transform translate-x-1_2 mb-4 z-50" v-show="dropShow">
          <view class="w-36 rounded-xl border-2 border-solid border-black text-black bg-white text-center font-bold relative drop-menu">
            <view class="py-3" @tap="handleTo('zh')">中文</view>
            <view class="border border-solid border-black"></view>
            <view class="py-3" @tap="handleTo('en')">英文</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro"
import CardItem from "../../components/card/Item.vue"

import grapeIcon from "../../assets/img/fruits/grape.svg"

import arrowUpFillIcon from "../../assets/img/icon/arrow-up-fill.svg"

import TestAudio from "../../assets/audio/test.mp3"

export default {
  name: 'Detail',
  components: {
    CardItem
  },
  data () {
    return {
      arrowUpFillIcon,
      currentIndex: 0,
      cards: [
        {
          id: 1,
          zh_name: '苹果',
          zh_spell: 'píng guǒ',
          en_name: 'apple',
          en_spell: '[ˈæpl]',
          icon: grapeIcon,
          color: 'red',
          zh_src: TestAudio,
          en_src: TestAudio
        },
        {
          id: 2,
          zh_name: '梨',
          zh_spell: 'lí',
          en_name: 'pear',
          en_spell: '[per]',
          icon: grapeIcon,
          color: 'yellow',
          zh_src: TestAudio,
          en_src: TestAudio
        },
        {
          id: 3,
          zh_name: '橙子',
          zh_spell: 'chéng zi',
          en_name: 'orange',
          en_spell: `['ɔrɪndʒ]`,
          icon: grapeIcon,
          color: 'orange',
          zh_src: TestAudio,
          en_src: TestAudio
        }
      ],
      dropShow: false,
    }
  },
  created() {
    this.setNavigationBar()

    // 获取传过来的 current
    this.currentIndex = parseInt(Taro.getCurrentInstance().router.params.current) || 0
  },
  onHide() {
    this.dropShow = false
  },
  methods: {
    handleChange(e) {
      this.currentIndex = e.detail.current
    },
    handleDropShow() {
      this.dropShow = !this.dropShow
    },
    handleTo(mode) {
      Taro.navigateTo({
        url: '/pages/study/index?mode=' + mode
      })
    },
    setNavigationBar() {
      Taro.setNavigationBarTitle({
        title: '水果'
      })
    }
  }
}
</script>

<style>
  .drop-menu:after {
    content: "";
    position: absolute;
    top: 100%;
    right: 50%;
    transform: translateX(50%);
    width: 0;
    height: 0;
    border-left: 0.6rem solid transparent;
    border-right: 0.6rem solid transparent;
    border-top: 1rem solid black;
  }
  .drop-menu:before {
    z-index: 1;
    content: "";
    position: absolute;
    top: 100%;
    right: 50%;
    margin-top: -1px;
    transform: translateX(50%);
    width: 0;
    height: 0;
    border-left: 0.45rem solid transparent;
    border-right: 0.45rem solid transparent;
    border-top: 0.8rem solid white;
  }
</style>
