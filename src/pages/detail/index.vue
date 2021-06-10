<template>
  <view class="flex flex-col">
    <view class="flex-1 py-12">
      <card-list></card-list>
    </view>
    <view class="flex items-end justify-center">
      <view class="relative">
        <view @tap="handleDropShow" class="inline-flex items-center font-bold border-2 border-solid text-black border-black bg-yellow-400 rounded-lg shadow-yellow py-1 px-4 text-xl">
          <text class="mr-0_5">测一测</text>
          <image :src="arrowUpFillIcon" class="w-6 h-6 -mr-1" />
        </view>
        <view class="absolute origin-center bottom-full right-1_2 transform translate-x-1_2 mb-4 z-50" v-show="dropShow">
          <view class="w-36 rounded-xl border-2 border-solid border-black text-black bg-white text-center font-bold relative drop-menu">
            <navigator url="/pages/study/index?mode=zh" class="py-3">中文</navigator>
            <view class="border border-solid border-black"></view>
            <navigator url="/pages/study/index?mode=en" class="py-3">英文</navigator>
          </view>
        </view>
      </view>
    </view>
    <view class="fixed z-10 inset-0 overflow-y-auto" v-show="false">
      <view class="flex items-center justify-center min-h-screen p-8 text-center">
        <view class="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity"></view>

        <view class="flex flex-col rounded-xl shadow-sm bg-yellow-50 overflow-hidden w-full max-w-md mx-auto z-50">
          <view class="p-6 flex-grow w-full box-border">
            <view class="text-gray-600">
              Content..
            </view>
          </view>
          <view class="p-6 w-full box-border">
            <button class="inline-flex justify-center items-center box-border font-bold w-full border-2 border-solid text-black border-black bg-yellow-400 rounded-md shadow-yellow py-1 px-4 text-xl">
              开始
            </button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro"
import CardList from "../../components/card/List.vue"

import arrowUpFillIcon from "../../assets/img/icon/arrow-up-fill.svg"

export default {
  name: 'Detail',
  components: {
    CardList
  },
  data () {
    return {
      arrowUpFillIcon,
      dropShow: false,
    }
  },
  created() {
    this.setNavigationBar()
  },
  methods: {
    handleDropShow() {
      this.dropShow = !this.dropShow
    },
    setNavigationBar() {
      Taro.setNavigationBarTitle({
        title: '水果'
      })
    }
  }
}
</script>

<style>
  .drop-menu:after {
    content: "";
    position: absolute;
    top: 100%;
    right: 50%;
    transform: translateX(50%);
    width: 0;
    height: 0;
    border-left: 0.6rem solid transparent;
    border-right: 0.6rem solid transparent;
    border-top: 1rem solid black;
  }
  .drop-menu:before {
    z-index: 1;
    content: "";
    position: absolute;
    top: 100%;
    right: 50%;
    margin-top: -1px;
    transform: translateX(50%);
    width: 0;
    height: 0;
    border-left: 0.45rem solid transparent;
    border-right: 0.45rem solid transparent;
    border-top: 0.8rem solid white;
  }
</style>
