<template>
  <view class="flex flex-col">
    <view class="flex-1 py-12">
      <study-list></study-list>
    </view>
  </view>
</template>

<script>
import StudyList from '../../components/study/List.vue'

export default {
  name: "Study",
  components: {
    StudyList
  }
}
</script>
