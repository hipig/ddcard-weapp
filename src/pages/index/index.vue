<template>
  <view class="flex flex-col px-6">
    <view class="my-6">
      <view class="flex items-end justify-between">
        <view class="bg-yellow-100 text-yellow-900 rounded-md px-0_5" v-text="isVip > -1 ? '卡片已解锁，开始您的学习之旅！' : '赞助会员，永久解锁全部卡片'"></view>
        <button @tap="handleUpgrade" class="inline-flex m-0 font-bold border-2 border-solid text-gray-900 border-gray-900 bg-yellow-400 rounded-xl shadow-gray py-1 px-2_5 leading-5">赞助会员</button>
      </view>
    </view>
    <view class="flex flex-col">
      <view v-for="(item, index) in groups" :key="index" @tap="handle(item)">
        <group-item :zh-name="item.zh_name"
          :en-name="item.en_name"
          :icon="item.cover_url"
          :color="item.color"
          :is-lock="!item.is_unlock"/>
      </view>
    </view>
    <view class="fixed z-10 inset-0" v-show="lockDialogShow">
      <view class="flex items-center justify-center min-h-screen p-12 text-center">
        <view class="fixed inset-0 bg-gray-700 bg-opacity-50 transition-opacity" @tap="closeLockDialog"></view>
        <view class="border-2 border-solid border-gray-900 flex flex-col rounded-xl shadow-sm bg-yellow-100 overflow-hidden w-full max-w-md mx-auto z-50">
          <view class="px-6 py-4 w-full box-border">
            <text class="font-bold text-xl">解锁卡片</text>
          </view>
          <view class="px-6 py-2 flex-grow w-full box-border">
            <swiper
              class="h-28 flex items-center"
              :autoplay="true"
              :interval="3000"
              :circular="true">
              <swiper-item v-for="item in cards" :key="item.id">
                <view class="flex items-center justify-center">
                  <image :src="item.cover_url" class="w-24 h-24" />
                </view>
              </swiper-item>
            </swiper>
            <text class="text-yellow-900 text-xl font-bold">会员专属卡片</text>
          </view>
          <view class="px-6 py-4 w-full box-border">
            <button @tap="handleUpgrade" class="mb-4 inline-flex justify-center items-center box-border font-bold w-full border-2 border-solid text-gray-900 border-gray-900 bg-yellow-400 rounded-md py-1 px-4 text-xl">
              赞助会员，立即查看
            </button>
            <button @tap="handleUnlock" class="inline-flex justify-center items-center box-border font-bold w-full border-2 border-solid text-gray-900 border-gray-900 bg-white rounded-md py-1 px-4 text-xl">
              免费试用1天
            </button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro"
import GroupItem from "../../components/group/Item.vue"
import { getGroups, previewGroup } from "../../api/cardGroup"
import { storeUnlockRecord } from "../../api/unlockRecord"
import { validateUserIsVip } from "../../api/validation"

export default {
  name: 'Index',
  components: {
    GroupItem
  },
  data () {
    return {
      groups: [],
      cards: [],
      lockDialogShow: false,
      currentGroup: null,
      isVip: -1,
    }
  },
  onShow() {
    this.validateUserIsVip()
    this.getGroups()
  },
  onHide() {
    this.closeLockDialog()
  },
  methods: {
    getGroups() {
      getGroups()
        .then(res => {
          this.groups = res.data
        })
    },
    validateUserIsVip() {
      validateUserIsVip()
        .then(res => {
          this.isVip = res.data.is_vip
        })
    },
    handle(item) {
      if(!item.is_unlock) {
        Taro.showLoading({
          title: '加载中',
        })
        previewGroup(item.id)
          .then(res => {
            this.cards = res.data
            this.lockDialogShow = true
            this.currentGroup = item
          })
          .finally(() => {
            Taro.hideLoading()
          })

        return false
      }

      Taro.navigateTo({
        url: '/pages/detail/index?group_id=' + item.id
      })
    },
    closeLockDialog() {
      this.lockDialogShow = false
      this.currentGroup = null
    },
    handleUnlock() {
      storeUnlockRecord(this.currentGroup.id)
        .then(() => {
          this.closeLockDialog()
          this.getGroups()
        })
    },
    handleUpgrade() {
      Taro.navigateTo({
        url: '/pages/vip/index'
      })
    }
  }
}
</script>
