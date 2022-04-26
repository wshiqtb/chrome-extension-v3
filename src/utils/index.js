// import Vue from 'vue'
import merge from 'lodash/merge'
import {baseUrl} from '../configs/index.js'

export const _fetch = async (url, options={}) => {
  // const store = await chrome.storage.sync.get('token')
  // const token = store.token
  // if (!token) {
  //   new Vue().$message.error('登录态校验失败')
  //   return false
  // }
  let _url = baseUrl+url
  let defaultOptions = {
    // mode: 'cors',
    // credentials: 'include'
  }
  options = merge(defaultOptions, options);
  const res = await fetch(_url, options)
  const jsonRes = await res.json()
  return jsonRes
}

// 注入js
export const injectScript = async (url) => {
  const scriptEl = document.createElement('script')
  scriptEl.setAttribute('type', 'text/javascript')
  document.head.appendChild(scriptEl)
  scriptEl.onload = function () {
    this.parentNode.removeChild(this)
    console.log('remove inject')
  }
  scriptEl.src = chrome.runtime.getURL(url)
}
