<template>
  <view class="flex flex-col">
    <group-item name="水果" url="/pages/detail/index?id=1" english-name="Fruits" color="pink"></group-item>
    <group-item name="蔬菜" url="/pages/detail/index?id=2" english-name="Vegetables" color="green"></group-item>
    <group-item name="动物" url="/pages/detail/index?id=3" english-name="Animals" color="orange" :is-lock="true"></group-item>
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
