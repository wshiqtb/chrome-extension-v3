import Vue from 'vue'
import App from './App.vue'
import Qaxd from '@atsfe/qaxd'
import '@atsfe/qaxd/packages/theme-standard/src/index.scss'

Vue.use(Qaxd)

let app = null

// 挂载app
const mounted = function () {
  const domId = 'interfaceControlFrameHeader'
  let rootEl = document.querySelector(`#${domId}`)
  if (!rootEl) {
    rootEl = document.createElement('div')
    rootEl.id = domId
    document.body.appendChild(rootEl)
  }
  app = new Vue(App)
  rootEl.appendChild(app.$mount().$el)
}

// 程序入口
const start = function () {
  !app && mounted()
}

// 启动
start()
