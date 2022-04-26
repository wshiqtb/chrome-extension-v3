import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.use(Antd)

let app = null

// 挂载app
const mounted = function () {
  const rootEl = document.querySelector('#interfaceControlFrameHeader') || document.querySelector('#interfaceControlFrameRight')

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
