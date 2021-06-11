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
          <study-item :zh-name="item.zh_name"
            :en-name="item.en_name"
            :zh-spell="item.zh_spell"
            :en-spell="item.en_spell"
            :color="item.color"
            :icon="item.icon"
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

import grapeIcon from "../../assets/img/fruits/grape.svg"

import checkIcon from "../../assets/img/icon/check.svg"
import checkOnIcon from "../../assets/img/icon/check-on.svg"

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
  created () {
    this.getCards()
    // 获取传过来的 mode
    this.mode = Taro.getCurrentInstance().router.params.mode || 'zh'
  },
  methods: {
    getCards() {
      let cards = [
        {
          id: 1,
          zh_name: '苹果',
          zh_spell: 'píng guǒ',
          en_name: 'apple',
          en_spell: '[ˈæpl]',
          icon: grapeIcon,
          color: 'red',
          is_studid: true
        },
        {
          id: 2,
          zh_name: '梨',
          zh_spell: 'lí',
          en_name: 'pear',
          en_spell: '[per]',
          icon: grapeIcon,
          color: 'yellow'
        },
        {
          id: 3,
          zh_name: '橙子',
          zh_spell: 'chéng zi',
          en_name: 'orange',
          en_spell: `['ɔrɪndʒ]`,
          icon: grapeIcon,
          color: 'orange'
        }
      ]

      this.allCards = cards
      this.cards = cards
    },
    handleChange(e) {
      this.currentIndex = e.detail.current
    },
    handleFilter() {
      this.isNotStudied = !this.isNotStudied

      if (this.isNotStudied) {
        this.cards = _.filter(this.allCards, item => { return !item.is_studid })
      } else {
        this.cards = this.allCards
      }
      this.currentIndex = 0
    },
    setNavigationBarTitle() {
      Taro.setNavigationBarTitle({
        title: parseInt(this.currentIndex + 1) + ' / ' + this.cards.length
      })
    }
  }
}
</script>
