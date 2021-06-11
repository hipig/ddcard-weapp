<template>
  <view class="flex flex-col px-6">
    <view class="my-6">
      <view class="flex items-end justify-between">
        <view class="bg-yellow-100 text-yellow-900 rounded-md px-0_5">赞助会员，永久解锁全部卡片</view>
        <button class="inline-flex m-0 font-bold border-2 border-solid text-black border-black bg-yellow-400 rounded-lg shadow-yellow py-1 px-2 leading-5">赞助会员</button>
      </view>
    </view>
    <view class="flex flex-col">
      <view v-for="(item, index) in groups" :key="index" @tap="handle(item)">
        <group-item :zh-name="item.zh_name"
          :en-name="item.en_name"
          :icon="item.icon"
          :color="item.color"
          :is-lock="item.is_lock"/>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro"
import GroupItem from "../../components/group/Item.vue"

import grapeIcon from "../../assets/img/fruits/grape.svg"

export default {
  name: 'Index',
  components: {
    GroupItem
  },
  data () {
    return {
      groups: [
        {
          id: 1,
          zh_name: '水果',
          en_name: 'Fruits',
          icon: grapeIcon,
          color: 'pink'
        },
        {
          id: 2,
          zh_name: '蔬菜',
          en_name: 'Vegetables',
          icon: grapeIcon,
          color: 'green'
        },
        {
          id: 3,
          zh_name: '动物',
          en_name: 'Animals',
          icon: grapeIcon,
          color: 'yellow',
          is_lock: true
        }
      ]
    }
  },
  methods: {
    handle(item) {
      console.log(item)
      if(!!item.is_lock) {
        return false
      }

      Taro.navigateTo({
        url: '/pages/detail/index?id=' + item.id
      })
    }
  }
}
</script>
