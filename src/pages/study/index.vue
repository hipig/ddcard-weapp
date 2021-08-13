<template>
  <view class="flex flex-col">
    <view class="mt-2 mb-6 px-8">
      <view class="flex items-center justify-end">
        <view class="flex items-center" @tap="handleFilter">
          <image :src="checkOnIcon" v-if="isNotStudied" class="w-7 h-7" />
          <image :src="checkIcon" v-else class="w-7 h-7" />
          <text class="ml-2 text-lg text-gray-900 font-bold">仅看未学会</text>
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
            :play-status="item.playStatus || false"
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
import { getCollectRecords } from "../../api/collectRecord"

const audioContext = Taro.createInnerAudioContext()

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
  onHide() {
    audioContext.destroy()
  },
  onShow() {
    // 获取传过来的 group_id
    this.groupId = parseInt(Taro.getCurrentInstance().router.params.group_id) || 0
    // 获取传过来的 mode
    this.mode = Taro.getCurrentInstance().router.params.mode || 'zh'
    this.getCards()
  },
  mounted() {
    Taro.eventCenter.on('playLearnAudio', () => {
      this.playAudio()
    })
    Taro.eventCenter.on('cardLearned', (isLearned) => {
      let currentCard = this.cards[this.currentIndex]
      this.$set(currentCard, this.mode === 'zh' ? 'zh_is_learn' : 'en_is_learn', isLearned)
      this.playAudio()
    })
  },
  methods: {
    getCards(callback = null) {
      if (this.groupId) {
        showGroup(this.groupId)
        .then(res => {
          const { data } = res
          let cards = _.map(data.cards, (item) => {
            item.playStatus = false
            return item
          })
          this.allCards = cards
          this.cards = cards

          callback && callback(res)
        })
      } else {
        getCollectRecords()
          .then(res => {
            const { data } = res
            let cards = _.map(data, (item) => {
              let card = item.card
              card.playStatus = false
              return card
            })
            this.allCards = cards
            this.cards = cards

            callback && callback(res)
          })
      }
    },
    handleChange(e) {
      this.currentIndex = e.detail.current
      this.playAudio()
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
    },
    playAudio() {
      let currentCard = this.cards[this.currentIndex]
      let isLearned = this.mode === 'en' ? currentCard.en_is_learn : currentCard.zh_is_learn
      if (!isLearned) {
        return false
      }

      let src = this.mode === 'en' ? currentCard.en_audio_path_url : currentCard.zh_audio_path_url
      audioContext.src = src

      let that = this
      audioContext.offPlay()
      audioContext.onPlay(() => {
        that.$set(that.cards[that.currentIndex], 'playStatus', true)
      })

      audioContext.offStop()
      audioContext.onStop(() => {
        that.$set(that.cards[that.currentIndex], 'playStatus', false)
      })

      audioContext.offEnded()
      audioContext.onEnded(() => {
        that.$set(that.cards[that.currentIndex], 'playStatus', false)
      })

      audioContext.onError(res => {
        console.log(res)
      })

      setTimeout(() => {
        audioContext.play()
      }, 200)
    }
  }
}
</script>
