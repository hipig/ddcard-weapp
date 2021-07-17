<template>
  <view class="flex flex-col px-8 pt-6 pb-28">
    <view class="flex flex-col">
      <view v-for="(item, index) in plans" :key="index" @tap="handleChange(index)">
        <plan-item :price="item.price"
          :text="item.name"
          :tag="item.tag"
          :selected="currentIndex === index"/>
      </view>
    </view>
    <view class="flex flex-col px-6 py-4 bg-yellow-50 text-gray-900 font-bold rounded-2xl">
      <text class="text-xl mb-2">会员功能</text>
      <text class="mb-0_5">1. 解锁会员卡组收藏学习</text>
      <text class="mb-0_5">2. 永久去除广告和促销信息</text>
      <text class="mb-0_5">3. 新增功能优先体验，快人一步</text>
    </view>
    <view class="fixed bottom-0 inset-x-0 px-8 py-6">
      <button @tap="handlePay" class="m-0 font-bold border-2 border-solid border-gray-900 text-white bg-gray-900 rounded-xl shadow py-3_5 px-4 text-center leading-5">赞助一笔</button>
    </view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro"
import PlanItem from "../../components/plan/Item.vue"

import { getPlans } from "../../api/plan"
import { storeSubscriptionRecord } from "../../api/subscriptionRecord"

export default {
  components: {
    PlanItem
  },
  data () {
    return {
      currentIndex: 0,
      plans: []
    }
  },
  onShow() {
    this.getPlans()
  },
  methods: {
    getPlans() {
      Taro.showLoading({
        title: '加载中',
      })
      getPlans()
        .then(res => {
          this.plans = res.data
        })
        .finally(() => {
          Taro.hideLoading()
        })
    },
    handleChange(index) {
      this.currentIndex = index
    },
    handlePay() {
      let plan = this.plans[this.currentIndex]

      storeSubscriptionRecord(plan.id)
        .then(res => {
          if (res.statusCode === 200) {
            const { data } = res
            Taro.requestPayment({
              timeStamp: data.timestamp,
              nonceStr: data.nonceStr,
              package: data.package,
              signType: data.signType,
              paySign: data.paySign,
              success: function(res) {
                Taro.navigateBack()
                Taro.showToast({
                  icon: 'success',
                  title: '支付成功',
                })
              },
              fail: function(res) {
                console.log('付款失败')
                console.log(res)

                if (res.errMsg == 'requestPayment:fail cancel') {
                  Taro.showToast({
                    icon: 'none',
                    title: '您取消了支付'
                  })
                }
              }
            })
          }
        })
    }
  }
}
</script>
