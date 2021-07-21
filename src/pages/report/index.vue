<template>
  <view class="flex flex-col px-6">
    <view class="fixed top-0 left-0 w-full box-border px-6 pb-2 bg-white z-10">
      <view class="flex items-center bg-white border-2 border-solid border-gray-900 text-gray-900 text-xl font-bold rounded-2xl overflow-hidden shadow-gray">
        <view class="w-1_2 text-center rounded-xl px-3" :class="{'bg-yellow-400': !isCollect}" @tap="isCollect = false">学习报告</view>
        <view class="w-1_2 text-center rounded-xl px-3" :class="{'bg-yellow-400': isCollect}" @tap="isCollect = true">收藏</view>
      </view>
    </view>
    <view class="mt-14">
      <view class="flex flex-col" v-show="!isCollect">
        <view class="mb-8">
          <view class="flex flex-col px-6 py-4 bg-white border-2 border-solid border-gray-900 text-gray-900 text-lg font-bold rounded-2xl shadow-gray">
            <view class="mb-2">累计使用 <text class="px-1 text-3xl text-red-500">{{ cumulativeTimes }}</text> 天</view>
            <view>今日学习 <text class="px-1 text-yellow-400">{{ duration+pastMinute }}</text> 分钟</view>
          </view>
        </view>
        <view class="flex flex-col bg-white border-2 border-solid border-gray-900 text-gray-900 rounded-2xl shadow-gray mb-8">
          <view class="px-4 py-2_5 border-0 border-b-2 border-solid border-gray-900">
            <view class="font-bold text-xl">学习报告</view>
          </view>
          <view class="p-4 pb-2">
            <view v-for="(item, index) in groups" :key="index">
              <report-item :name="item.zh_name"
                :icon="item.cover_url"
                :color="item.color"
                :count="item.count"
                :zh-count="item.zh_count"
                :en-count="item.en_count" />
            </view>
          </view>
        </view>
      </view>
      <view class="w-full" v-show="isCollect">
        <view class="flex flex-wrap -mx-2" v-if="collectCards.length > 0">
          <view @tap="handleTo(index)" class="w-1_2 px-2 box-border mb-4" v-for="(item, index) in collectCards" :key="index">
            <collect-item :zh-name="item.zh_name"
              :en-name="item.en_name"
              :icon="item.cover_url"
              :color="item.color" />
          </view>
        </view>
        <view class="py-4 text-center text-gray-700" v-else>还没有收藏卡片哦~</view>
      </view>
    </view>
    <auth-alert/>
  </view>
</template>

<script>
import _ from "lodash"
import Taro from "@tarojs/taro"
import { mapGetters } from "vuex"
import * as dayjs from 'dayjs'
import AuthAlert from "../../components/auth/Alert.vue"
import ReportItem from "../../components/report/Item.vue"
import CollectItem from "../../components/card/CollectItem.vue"

import { getLearnRecords } from "../../api/learnRecord"
import { getCollectRecords } from "../../api/collectRecord"

export default {
  name: "Report",
  components: {
    AuthAlert,
    ReportItem,
    CollectItem
  },
  data () {
    return {
      isCollect: false,
      groups: [],
      collectCards: [],
      pastMinute: 0,
      timer: null
    }
  },
  computed: {
    ...mapGetters({
      'cumulativeTimes': 'online/cumulativeTimes',
      'duration': 'online/duration',
      'startedAt': 'online/startedAt'
    })
  },
  onShow() {
    this.getGroups()
    this.getCollectRecords()
    this.timer = setInterval(this.timing, 1000)
  },
  onHide() {
    clearInterval(this.timer)
  },
  methods: {
    getGroups() {
      getLearnRecords()
        .then(res => {
          this.groups = res.data
        })
    },
    getCollectRecords() {
      getCollectRecords()
        .then(res => {
          this.collectCards = _.map(res.data, 'card')
        })
    },
    handleTo(current) {
      Taro.navigateTo({
        url: '/pages/detail/index?current=' + current
      })
    },
    timing() {
      this.pastMinute = dayjs().subtract(dayjs(this.startedAt)).minute()
    }
  }
}
</script>
