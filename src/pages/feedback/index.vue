<template>
  <view class="flex flex-col px-8">
    <view class="py-6">
      <view class="relative">
        <view class=" absolute top-4 left-4 z-10">
          <image :src="ContentIcon" class="w-6 h-6" />  
        </view>   
        <textarea class="w-full box-border p-4 pl-12 border-2 border-solid border-gray-900 text-gray-900 bg-white rounded-2xl" placeholder="请填写内容..."></textarea>
      </view>
    </view>
    <button class="m-0 font-bold border-2 border-solid border-black text-white bg-gray-900 rounded-xl shadow py-3_5 px-4 text-center leading-5">
      <text>提交留言</text>
    </button>
  </view>
</template>

<script>
import ContentIcon from "../../assets/img/icon/content.svg"

export default {
  data () {
    return {
      ContentIcon
    }
  }
}
</script>