<template>
  <view class="flex flex-col">
    <scroll-view :scroll-y="true" :style="{height: 'calc('+wHeight+'px - 5rem)'}">
      <view class="flex flex-col px-6 pt-4 box-border">
        <template v-if="feedbackList.length > 0">
          <view v-for="(item, index) in feedbackList"  :key="index">
            <view class="mb-6">
              <view class="text-center text-gray-500 mb-4">{{ item.created_at }}</view>
              <view class="flex text-right pl-4">
                <view class="flex-1 flex flex-col">
                  <view class="mb-3">
                    <view class="inline-flex border-2 border-solid border-gray-900 text-gray-900 bg-yellow-400 px-5 py-2_5 rounded-xl text-lg font-bold leading-6 text-left">{{ item.content }}</view>
                  </view>
                </view>
                <view class="flex-shrink-0 ml-4">
                  <image :src="userInfo.avatar" class="w-10 h-10 border-2 border-solid border-gray-900 rounded-full" />
                </view>
              </view>
            </view>
            <view class="mb-6" v-if="item.replies.length > 0">
              <view class="text-center text-gray-500 mb-4">{{ item.replies[0].created_at }}</view>
              <view class="flex pr-4">
                <view class="flex-1 flex flex-col">
                  <view class="mb-3" v-for="(replyItem, i) in item.replies" :key="i">
                    <view class="inline-flex border-2 border-solid border-gray-900 text-gray-900 bg-teal-400 px-5 py-2_5 rounded-xl text-lg font-bold leading-6">{{ replyItem.content }}</view>
                  </view>
                </view>
              </view>
            </view>
            <view :id="'feedback-'+index"></view>
          </view>
        </template>
        <template v-else>
          <view class="text-center text-gray-500 py-4">还没有反馈记录~</view>
        </template>
      </view>
    </scroll-view>
    <view class="fixed bottom-0 inset-x-0 px-6 h-20 flex items-center bg-white">
      <view class="w-full flex items-center">
        <view class="flex-1">
          <input type="text" v-model="content" :cursor-spacing="30" class="px-4 py-3 border-2 border-solid border-gray-900 text-gray-900 bg-white rounded-xl" placeholder="请填写内容..."/>
        </view>
        <view class="flex-shrink-0 ml-4">
          <button @tap="handleSubmit" class="inline-flex m-0 font-bold border-2 border-solid text-black border-black bg-yellow-400 rounded-xl shadow-gray text-xl py-3 px-5 leading-5">发送</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro"
import { mapGetters } from "vuex"

import { getFeedback, storeFeedback, viewFeedbackReply } from "../../api/feedback"

export default {
  data () {
    return {
      feedbackList: [],
      wHeight: 0,
      toView: null,
      content: ''
    }
  },
  computed: {
    ...mapGetters({
      'userInfo': 'auth/userInfo'
    }),
  },
  created() {
    this.getWindowHeight()
  },
  onShow() {
    this.getFeedback()
    this.viewFeedbackReply()
  },
  methods: {
    getFeedback() {
      Taro.showLoading()

      getFeedback()
        .then(res => {
          this.feedbackList = res.data
          setTimeout(this.scrollBottom, 200)
        })
        .finally(_ => {
          Taro.hideLoading()
        })
    },
    viewFeedbackReply() {
      viewFeedbackReply()  
    },
    handleSubmit() {
      storeFeedback({
        content: this.content
      })
      .then(res => {
        if (res.statusCode == 200 || res.statusCode == 201) {
          this.getFeedback()
        }
      })
    },
    getWindowHeight() {
      this.wHeight = Taro.getSystemInfoSync().windowHeight
    },
    scrollBottom() {
      let maxIndex = this.feedbackList.length > 0 ? this.feedbackList.length-1 : 0
      this.toView = "feedback-" + maxIndex
    }
  }
}
</script>
