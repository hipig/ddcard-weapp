<template>
  <view class="flex flex-col px-6">
    <view class="fixed top-0 left-0 w-full box-border px-6 pb-2 bg-yellow-50">
      <view class="flex items-center bg-white border-2 border-solid border-gray-900 text-gray-900 text-xl font-bold rounded-2xl overflow-hidden shadow-gray" @tap="isCollect = !isCollect">
        <view class="w-1_2 text-center rounded-xl px-3" :class="{'bg-yellow-400': !isCollect}">学习报告</view>
        <view class="w-1_2 text-center rounded-xl px-3" :class="{'bg-yellow-400': isCollect}">收藏</view>
      </view>
    </view>
    <view class="mt-14">
      <view class="flex flex-col" v-show="!isCollect">
        <view class="mb-8">
          <view class="flex flex-col px-6 py-4 bg-white border-2 border-solid border-gray-900 text-gray-900 text-lg font-bold rounded-2xl shadow-gray">
            <view class="mb-2">累计使用 <text class="px-1 text-3xl text-red-500">4</text> 天</view>
            <view>今日学习 <text class="px-1 text-yellow-400">40</text> 分钟</view>
          </view>
        </view>
        <view class="flex flex-col bg-white border-2 border-solid border-gray-900 text-gray-900 rounded-2xl shadow-gray mb-8">
          <view class="px-4 py-2_5 mb-4 border-0 border-b-2 border-solid border-black">
            <view class="font-bold text-xl">学习报告</view>
          </view>
          <view class="px-2">
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
        <view class="flex flex-wrap -mx-3">
          <view @tap="handleTo(item.card_id)" class="w-1_2 px-3 box-border mb-6" v-for="(item, index) in collects" :key="index">
            <collect-item :zh-name="item.card.zh_name"
              :en-name="item.card.en_name" 
              :icon="item.card.cover_url"
              :color="item.card.color" />
          </view>
        </view>
      </view>
    </view>
    
  </view>
</template>

<script>
import Taro from "@tarojs/taro"
import ReportItem from "../../components/report/Item.vue"
import CollectItem from "../../components/card/CollectItem.vue"

import { getLearnRecords } from "../../api/learnRecord"
import { getCollectRecords } from "../../api/collectRecord"

export default {
  name: "Report",
  components: {
    ReportItem,
    CollectItem
  },
  data () {
    return {
      isCollect: false,
      groups: [],
      collects: []
    }
  },
  onShow() {
    this.getGroups()
    this.getCollectRecords()
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
          this.collects = res.data
        })
    },
    handleTo(cardId) {
      Taro.navigateTo({
        url: '/pages/detail/index?type=collect&card_id=' + cardId
      })
    }
  }
}
</script>
