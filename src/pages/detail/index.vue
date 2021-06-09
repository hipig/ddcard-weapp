<template>
  <view class="flex flex-col">
    <view class="flex-1 py-12">
      <card-list></card-list>
    </view>
    <view class="flex items-end justify-center">
      <navigator url="/pages/study/index" class="inline-flex m-0 font-bold border-2 border-solid text-black border-black bg-yellow-300 rounded-md shadow-yellow py-1 px-4 text-xl">测一测</navigator>
    </view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro"
import CardList from '../../components/card/List.vue'

export default {
  name: 'Detail',
  components: {
    CardList
  },
  created() {
    this.setNavigationBar()
  },
  methods: {
    setNavigationBar() {
      Taro.setNavigationBarTitle({
        title: '当前页面'
      })
    }
  }
}
</script>

<style scoped>
  page {
    background-color: #fff;
  }
</style>
