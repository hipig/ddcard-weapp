<template>
  <view class="flex flex-col">
    <view class="mt-2 mb-6 px-8">
      <view class="flex items-center justify-end">
        <view class="flex items-center" @tap="handleFilter">
          <image :src="checkOnIcon" v-if="isNotStudied" class="w-7 h-7" />
          <image :src="checkIcon" v-else class="w-7 h-7" />
          <text class="ml-2 text-lg text-black font-bold">仅看未学会</text>
        </view>
      </view>
    </view>
    <view class="flex-1">
      <swiper
        class="w-full h-128"
        previous-margin="30px"
        next-margin="30px"
        :current="currentIndex"
        :circular="true"
        @change="handleChange">
        <swiper-item v-for="(item, index) in cards" :key="item.id">
          <study-item  :id="item.id"
            :name="mode === 'zh' ? item.zh_name : item.en_name"
            :spell="mode === 'zh' ? item.zh_spell : item.en_spell"
            :src="mode === 'zh' ? item.zh_audio_path_url : item.en_audio_path_url"
            :color="item.color"
            :icon="item.cover_url"
            :studied="mode === 'zh' ? item.zh_is_learn : item.en_is_learn"
            :mode="mode"
            :index="index"
            :current-index="currentIndex"
            :total="cards.length"/>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
import _ from "lodash"
import Taro from "@tarojs/taro"
import StudyItem from "../../components/card/StudyItem.vue"

import checkIcon from "../../assets/img/icon/check.svg"
import checkOnIcon from "../../assets/img/icon/check-on.svg"

import { showGroup } from "../../api/cardGroup"

export default {
  name: "Study",
  components: {
    StudyItem
  },
  data () {
    return {
      checkIcon,
      checkOnIcon,
      isNotStudied: false,
      currentIndex: 0,
      cards: [],
      allCards: [],
      groupId: 0,
      mode: 'zh'
    }
  },
  watch: {
    cards() {
      this.setNavigationBarTitle()
    },
    currentIndex() {
      this.setNavigationBarTitle()
    }
  },
  onShow() {
    // 获取传过来的 group_id
    this.groupId = parseInt(Taro.getCurrentInstance().router.params.group_id) || 0
    // 获取传过来的 mode
    this.mode = Taro.getCurrentInstance().router.params.mode || 'zh'
    this.getCards()
  },
  methods: {
    getCards(callback = null) {
      showGroup(this.groupId)
        .then(res => {
          this.allCards = res.data.cards
          this.cards = res.data.cards

          callback && callback(res)
        })
    },
    handleChange(e) {
      this.currentIndex = e.detail.current
    },
    handleFilter() {
      this.getCards(() => {
        this.isNotStudied = !this.isNotStudied
        if (this.isNotStudied) {
          this.cards = _.filter(this.allCards, item => {
            return !(this.mode === 'zh' ? item.zh_is_learn : item.en_is_learn)
          })
        } else {
          this.cards = this.allCards
        }
        this.currentIndex = 0
      })
    },
    setNavigationBarTitle() {
      Taro.setNavigationBarTitle({
        title: parseInt(this.cards.length > 0 ? this.currentIndex + 1 : 0) + ' / ' + this.cards.length
      })
    }
  }
}
</script>
