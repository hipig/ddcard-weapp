<template>
  <view class="flex flex-col px-6">
    <view class="fixed top-0 left-0 w-full box-border px-6 pb-2 bg-yellow-50">
      <view class="flex items-center bg-white border-2 border-solid border-black text-black text-xl font-bold rounded-xl p-px shadow" @tap="isCollect = !isCollect">
        <view class="w-1_2 text-center rounded-lg px-3" :class="{'bg-yellow-400': !isCollect}">学习报告</view>
        <view class="w-1_2 text-center rounded-lg px-3" :class="{'bg-yellow-400': isCollect}">收藏</view>
      </view>
    </view>
    <view class="mt-14">
      <view class="flex flex-col" v-show="!isCollect">
        <view class="mb-8">
          <view class="flex flex-col px-6 py-4 bg-white border-2 border-solid border-black text-black text-lg font-bold rounded-lg shadow-sm">
            <view class="mb-2">累计使用 <text class="px-1 text-3xl text-red-500">4</text> 天</view>
            <view>今日学习 <text class="px-1 text-yellow-400">40</text> 分钟</view>
          </view>
        </view>
        <view class="flex flex-col bg-white border-2 border-solid border-black text-black rounded-lg shadow-sm mb-8">
          <view class="px-4 py-2_5 mb-4 border-0 border-b-2 border-solid border-black">
            <view class="font-bold text-xl">学习报告</view>
          </view>
          <view class="px-2">
            <view v-for="(item, index) in reports" :key="index">
              <report-item :name="item.name" 
                :icon="item.icon"
                :color="item.color"
                :total="item.total"
                :zh-count="item.zh_count"
                :en-count="item.en_count" />
            </view>
          </view>
        </view>
      </view>
      <view class="w-full" v-show="isCollect">
        <view class="flex flex-wrap -mx-3">
          <view class="w-1_2 px-3 box-border mb-6" v-for="(item, index) in collects" :key="index">
            <collect-item :zh-name="item.zh_name"
              :en-name="item.en_name" 
              :icon="item.icon"
              :color="item.color" />
          </view>
        </view>
      </view>
    </view>
    
  </view>
</template>

<script>
import ReportItem from "../../components/report/Item.vue"
import CollectItem from "../../components/card/CollectItem.vue"

import grapeIcon from "../../assets/img/fruits/grape.svg"

export default {
  name: "Report",
  components: {
    ReportItem,
    CollectItem
  },
  data () {
    return {
      isCollect: false,
      reports: [
        {
          name: '水果',
          color: 'pink',
          icon: grapeIcon,
          total: 12,
          zh_count: 1,
          en_count: 0
        },
        {
          name: '蔬菜',
          color: 'green',
          icon: grapeIcon,
          total: 25,
          zh_count: 0,
          en_count: 0
        },
        {
          name: '动物',
          color: 'yellow',
          icon: grapeIcon,
          total: 20,
          zh_count: 10,
          en_count: 3
        }
      ],
      collects: [
        {
          id: 1,
          zh_name: '苹果',
          zh_spell: 'píng guǒ',
          en_name: 'apple',
          en_spell: '[ˈæpl]',
          icon: grapeIcon,
          color: 'red'
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
    }
  }
}
</script>
