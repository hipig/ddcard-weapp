<template>
  <view class="flex flex-col min-h-screen px-8 py-6">
    <view class="flex flex-col">
      <view class="border-2 border-solid border-gray-900 bg-white shadow-yellow rounded-2xl mb-6 text-gray-900 relative">
        <view class="flex flex-col items-center py-5">
          <text class="text-5xl font-bold mb-3">￥2.99</text>
          <text>一个月</text>
        </view>
      </view>
      <view class="border-2 border-solid border-gray-900 bg-yellow-400 shadow-yellow rounded-2xl mb-6 text-gray-900 relative">
        <view class="absolute top-3 right-3 px-2 leading-5 border-2 border-solid border-green-500 bg-green-500 text-white rounded-xl shadow-sm">推荐</view>
        <view class="flex flex-col items-center py-5">
          <text class="text-5xl font-bold mb-3">￥9.99</text>
          <text>一年</text>
        </view>
      </view>
      <view class="border-2 border-solid border-gray-900 bg-white shadow-yellow rounded-2xl mb-6 text-gray-900 relative">
        <view class="absolute top-3 right-3 px-2 leading-5 border-2 border-solid border-red-500 bg-red-500 text-white rounded-xl shadow-sm">限时</view>
        <view class="flex flex-col items-center py-5">
          <text class="text-5xl font-bold mb-3">￥29.99</text>
          <text>永久使用</text>
        </view>
      </view>
    </view>
    <view class="flex flex-col px-6 py-4 bg-yellow-100 text-gray-900 font-bold rounded-2xl">
      <text class="text-xl mb-2">会员功能</text>
      <text>1. 解锁会员卡组收藏学习</text>
      <text>2. 永久去除广告和促销信息</text>
      <text>3. 新增功能优先体验，快人一步</text>
    </view>
    <view class="fixed bottom-0 inset-x-0 py-6 px-8">
      <button class="m-0 font-bold border-2 border-solid border-black text-white bg-gray-900 rounded-xl py-3_5 px-4 text-center leading-5">立即赞助</button>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>
