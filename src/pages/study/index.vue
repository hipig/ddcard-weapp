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
      <study-list :data="cards"></study-list>
    </view>
  </view>
</template>

<script>
import _ from "lodash"
import StudyList from "../../components/study/List.vue"

import switchOffIcon from "../../assets/img/icon/switch-off.svg"
import switchOnIcon from "../../assets/img/icon/switch-on.svg"

import checkIcon from "../../assets/img/icon/check.svg"
import checkOnIcon from "../../assets/img/icon/check-on.svg"

export default {
  name: "Study",
  components: {
    StudyList
  },
  data () {
    return {
      switchOffIcon,
      switchOnIcon,
      checkIcon,
      checkOnIcon,
      isNotStudied: false,
      cards: [],
      allCards: []
    }
  },
  created () {
    this.getCards()
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
          icon: '',
          color: 'red',
          is_studid: true
        },
        {
          id: 2,
          zh_name: '梨',
          zh_spell: 'lí',
          en_name: 'pear',
          en_spell: '[per]',
          icon: '',
          color: 'yellow'
        },
        {
          id: 3,
          zh_name: '橙子',
          zh_spell: 'chéng zi',
          en_name: 'orange',
          en_spell: `['ɔrɪndʒ]`,
          icon: '',
          color: 'orange'
        }
      ]

      this.allCards = cards
      this.cards = cards
    },
    handleFilter() {
      this.isNotStudied = !this.isNotStudied

      if (this.isNotStudied) {
        this.cards = _.filter(this.allCards, item => { return !item.is_studid })
      } else {
        this.cards = this.allCards
      }
    }
  }
}
</script>
