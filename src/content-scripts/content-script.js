import Vue from 'vue'
import App from './App.vue'
import Qaxd from '@atsfe/qaxd'
import '@atsfe/qaxd/packages/theme-standard/src/index.scss'

Vue.use(Qaxd)

let app = null

const mounted = function () {
  const domId = 'dockyard-ext-root'
  let rootEl = document.querySelector(`#${domId}`)
  if (!rootEl) {
    rootEl = document.createElement('div')
    rootEl.id = domId
    document.body.appendChild(rootEl)
  }
  if (rootEl.childNodes.length > 0) return false
  app = new Vue(App)
  rootEl.appendChild(app.$mount().$el)
}

!app && mounted()
