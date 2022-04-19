import Vue from 'vue'
import App from './App.vue'
import Qaxd from '@atsfe/qaxd'
import '@atsfe/qaxd/packages/theme-standard/src/index.scss'

Vue.use(Qaxd)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
