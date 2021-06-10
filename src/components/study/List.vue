<template>
  <swiper
      class="w-full h-128"
      previous-margin="30px"
      next-margin="30px"
      :current="currentIndex"
      :circular="true"
      @change="handleChange">
      <swiper-item v-for="(item, index) in data" :key="item.id">
        <study-item :zhName="item.zh_name"
          :enName="item.en_name"
          :zhSpell="item.zh_spell"
          :enSpell="item.en_spell"
          :color="item.color"
          :index="index"
          :current-index="currentIndex"
          :total="data.length"/>
      </swiper-item>
    </swiper>
</template>

<script>
import Taro from "@tarojs/taro"
import StudyItem from "../../components/study/Item.vue"

export default {
  name: "CardList",
  components: {
    StudyItem
  },
  props: {
    data: Array
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  watch: {
    data() {
      this.currentIndex = 0
      this.setNavigationBarTitle()
    }
  },
  created () {
    this.setNavigationBarTitle()
  },
  methods: {
    handleChange(e) {
      this.currentIndex = e.detail.current

      this.setNavigationBarTitle()
    },
    setNavigationBarTitle() {
      Taro.setNavigationBarTitle({
        title: parseInt(this.currentIndex + 1) + ' / ' + this.data.length
      })
    }
  }
}
</script>
