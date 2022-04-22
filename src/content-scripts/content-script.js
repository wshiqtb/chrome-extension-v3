import Vue from 'vue'
import App from './App.vue'
import Qaxd from '@atsfe/qaxd'
import '@atsfe/qaxd/packages/theme-standard/src/index.scss'

Vue.use(Qaxd)

let app = null

// 挂载app
const mounted = function () {
  // const rootEl = document.querySelector('#interfaceControlFrameHeader') || document.querySelector('#interfaceControlFrameRight')
  const rootEl = document.querySelector('body') || document.querySelector('#interfaceControlFrameRight')

  if (!rootEl) {
    return
  }

  app = new Vue(App)
  rootEl.prepend(app.$mount().$el)
}

// 程序入口
const start = function () {
  !app && mounted()
}

// 启动
start()
