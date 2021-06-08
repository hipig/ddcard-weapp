<template>
  <view class="flex flex-col">
    <group-item name="水果" english-name="Fruits" color="pink"></group-item>
    <group-item name="蔬菜" english-name="Vegetables" color="green"></group-item>
    <group-item name="动物" english-name="Animals" color="orange" :is-lock="true"></group-item>
  </view>
</template>

<script>
import GroupItem from '../../components/group/Item.vue'
export default {
  name: 'GroupList',
  components: {
    GroupItem
  }
}
</script>