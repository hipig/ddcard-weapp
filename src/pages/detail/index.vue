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
          <card-item v-if="item.id" :id="item.id"
            :zh-name="item.zh_name"
            :en-name="item.en_name"
            :zh-spell="item.zh_spell"
            :en-spell="item.en_spell"
            :color="item.color"
            :icon="item.cover_url"
            :zh-src="item.zh_audio_path_url"
            :en-src="item.en_audio_path_url"
            :collected="item.is_collect"
            :index="index"
            :current-index="currentIndex"
            :total="cards.length"/>
        </swiper-item>
      </swiper>
    </view>
    <view class="flex justify-center" v-if="cards.length > 0">
      <view class="relative">
        <view @tap="handleLearn" class="inline-flex items-center font-bold border-2 border-solid text-gray-900 border-gray-900 bg-yellow-400 rounded-xl shadow-gray py-1 px-4 text-xl">
          <text class="mr-0_5">测一测</text>
          <image :src="arrowUpFillIcon" class="w-6 h-6 -mr-1" />
        </view>
        <view class="absolute origin-center bottom-full right-1_2 transform translate-x-1_2 mb-4 z-50" v-show="dropShow">
          <view class="w-36 rounded-xl border-2 border-solid border-gray-900 text-gray-900 bg-white text-center font-bold relative drop-menu animate-slideUp">
            <view class="py-3" @tap="handleTo('zh')">中文</view>
            <view class="border border-solid border-gray-900"></view>
            <view class="py-3" @tap="handleTo('en')">英文</view>
          </view>
        </view>
      </view>
    </view>
    <view class="fixed z-10 inset-0 animate-fade" v-show="learnDialogShow">
      <view class="flex items-center justify-center min-h-screen p-12 animate-popup">
        <view class="fixed inset-0 bg-gray-700 bg-opacity-50 transition-opacity" @tap="learnDialogShow = false"></view>
        <view class="border-2 border-solid border-gray-900 flex flex-col rounded-xl shadow-sm bg-yellow-100 overflow-hidden w-full max-w-md mx-auto z-50">
          <view class="px-6 py-3 w-full box-border">
            <text class="text-gray-900 font-bold text-xl">VIP卡组测一测</text>
          </view>
          <view class="px-6 py-1 flex-grow w-full box-border">
            <text class="text-gray-900">升级VIP，解锁全部卡组测试，随时随地想测就测</text>
          </view>
          <view class="px-6 py-4 w-full box-border">
            <view class="flex -mx-2 box-border">
              <view class="w-1_2 px-2 box-border">
                <button @tap="learnDialogShow = false" class="inline-flex justify-center items-center box-border font-bold w-full border-2 border-solid text-gray-900 border-gray-900 bg-white rounded-xl py-1 px-4 text-xl">
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
import _ from "lodash"
import Taro from "@tarojs/taro"
import arrowUpFillIcon from "../../assets/img/icon/arrow-up-fill.svg"

import CardItem from "../../components/card/Item.vue"

import { showGroup } from "../../api/cardGroup"
import { getCollectRecords } from "../../api/collectRecord"
import { validateGroupCanLearn } from "../../api/validation"


export default {
  name: 'Detail',
  components: {
    CardItem
  },
  data () {
    return {
      arrowUpFillIcon,
      currentIndex: 0,
      collectCurrentIndex: 0,
      groupId: 0,
      title: '',
      cards: [],
      dropShow: false,
      learnDialogShow: false,
    }
  },
  onHide() {
    this.dropShow = false
    this.learnDialogShow = false
  },
  onShow() {
    // 获取传过来的 current
    this.collectCurrentIndex = parseInt(Taro.getCurrentInstance().router.params.current) || 0
    // 获取传过来的 group_id
    this.groupId = parseInt(Taro.getCurrentInstance().router.params.group_id) || 0
    this.getCards()
  },
  watch: {
    title(val) {
      this.setNavigationBar(val)
    }
  },
  methods: {
    async getCards() {
      if (this.groupId) {
        const { data } = await showGroup(this.groupId)
        this.title = data.zh_name
        this.cards = data.cards
      } else {
        const { data } = await getCollectRecords()
        this.title = '我的收藏'
        this.cards = _.map(data, 'card')
      }
    },
    handleChange(e) {
      this.currentIndex = e.detail.current
    },
    handleLearn() {
      if (this.groupId) {
        validateGroupCanLearn(this.groupId)
        .then(res => {
          if (res.statusCode === 200) {
            this.dropShow = !this.dropShow
          }
        })
        .catch(err => {
          if (err.statusCode === 403) {
            this.learnDialogShow = true
          }
        })
      } else {
        this.dropShow = !this.dropShow
      }
    },
    handleTo(mode) {
      Taro.navigateTo({
        url: '/pages/study/index?group_id=' + this.groupId +'&mode=' + mode
      })
    },
    handleUpgrade() {
      Taro.navigateTo({
        url: '/pages/vip/index'
      })
    },
    initAudioContext(src) {
      let audioContext = Taro.createInnerAudioContext()
      audioContext.src = src

      return audioContext
    },
    setNavigationBar(title) {
      Taro.setNavigationBarTitle({
        title: title
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
