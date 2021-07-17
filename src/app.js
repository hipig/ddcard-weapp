import Vue from 'vue'
import store from './store'
import './app.scss'

import * as dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

// Vue.config.productionTip = false

const App = {
  store,
  onShow() {
    store.dispatch('online/storeOnlineRecord')
  },
  onHide() {
    store.dispatch('online/updateOnlineRecord')
  },
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('block', this.$slots.default)
  }
}

export default App
