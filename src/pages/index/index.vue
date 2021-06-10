<template>
  <view class="flex flex-col px-6">
    <view class="my-6">
      <view class="flex items-end justify-between">
        <view class="bg-yellow-100 text-yellow-900 rounded-md px-0_5">赞助会员，永久解锁全部卡片</view>
        <button class="inline-flex m-0 font-bold border-2 border-solid text-black border-black bg-yellow-400 rounded-lg shadow-yellow py-1 px-2 leading-5">赞助会员</button>
      </view>
    </view>
    <group-list></group-list>
  </view>
</template>

<script>
import GroupList from '../../components/group/List.vue'

export default {
  name: 'Index',
  components: {
    GroupList
  }
}
</script>
