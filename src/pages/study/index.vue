<template>
  <view class="flex flex-col">
    <view class="py-8 px-6">
      <view class="flex items-center bg-white border-2 border-solid border-black rounded-xl p-1_5 shadow">
        <view class="w-1_2 text-center rounded-lg px-3 py-1 text-lg text-black font-bold" :class="{'bg-yellow-400': !isNotStudied}" @tap="handleFilter">全部</view>
        <view class="w-1_2 text-center rounded-lg px-3 py-1 text-lg text-black font-bold" :class="{'bg-yellow-400': isNotStudied}" @tap="handleFilter">未学会</view>
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

export default {
  name: "Study",
  components: {
    StudyList
  },
  data () {
    return {
      switchOffIcon,
      switchOnIcon,
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
