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
          <card-item :id="item.id"
            :zh-name="item.zh_name"
            :en-name="item.en_name"
            :zh-spell="item.zh_spell"
            :en-spell="item.en_spell"
            :color="item.color"
            :icon="item.cover_url"
            :zh-src="item.zh_audio_path_url"
            :en-src="item.en_audio_path_url"
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

import arrowUpFillIcon from "../../assets/img/icon/arrow-up-fill.svg"

import { showGroup } from "../../api/cardGroup"

export default {
  name: 'Detail',
  components: {
    CardItem
  },
  data () {
    return {
      arrowUpFillIcon,
      currentIndex: 0,
      groupId: 0,
      cards: [],
      dropShow: false,
    }
  },
  created() {
    this.setNavigationBar()
    // 获取传过来的 group_id
    this.groupId = parseInt(Taro.getCurrentInstance().router.params.group_id) || 0
    this.showGroup()

    // 获取传过来的 current
    this.currentIndex = parseInt(Taro.getCurrentInstance().router.params.current) || 0
  },
  onHide() {
    this.dropShow = false
  },
  methods: {
    showGroup() {
      showGroup(this.groupId)
        .then(res => {
          this.cards = res.data.cards
        })
    },
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
