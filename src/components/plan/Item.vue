<template>
  <view class="border-2 border-solid border-gray-900 shadow-gray rounded-2xl mb-6 text-gray-900 relative" :class="[selected ? 'bg-yellow-400' : 'bg-white']">
    <view v-if="tag" class="absolute top-3 right-3 px-2 leading-5 border-2 border-solid text-white rounded-xl shadow-sm" :class="[tagClasses]">{{ tagText }}</view>
    <view class="flex flex-col items-center py-5">
      <text class="text-5xl font-bold mb-3">￥{{ price }}</text>
      <text>{{ text }}</text>
    </view>
  </view>
</template>

<script>

const tagMap = {
  recommend: {
    classes: 'border-green-500 bg-green-500',
    text: '推荐',
  },
  limit: {
    classes: 'border-red-500 bg-red-500',
    text: '限时',
  },
}

export default {
  props: {
    price: { type: Number, default: 0.00 },
    text: { type: String, default: '' },
    selected: { type: Boolean, default: false },
    tag: { type: String, default: '' }
  },
  computed: {
    tagClasses() {
      return tagMap[this.tag].classes || ''
    },
    tagText() {
      return tagMap[this.tag].text || ''
    }
  }
}
</script>