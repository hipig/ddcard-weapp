<template>
  <view class="p-6">
    <view class="prose" v-html="about.content"></view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro"
import { showAbout } from "../../api/about"

export default {
  data () {
    return {
      key: null,
      about: {}
    }
  },
  onShow() {
    // 获取传过来的 key
    this.key = Taro.getCurrentInstance().router.params.key || null
    this.showAbout()
  },
  methods: {
    showAbout() {
      showAbout(this.key)
        .then(res => {
          this.setNavigationBar(res.data.name)
          this.about = res.data
        })
    },
    setNavigationBar(title) {
      Taro.setNavigationBarTitle({
        title: title
      })
    }
  }
}
</script>
