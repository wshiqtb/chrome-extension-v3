import Vue from 'vue'
import merge from 'lodash/merge'

export const getBaseUrl = async ()=>{
  const {hostName=''} = await chrome.storage.sync.get('hostName')
  return hostName;
}

export const _fetch = async (url, options={}) => {
  const hostName = await getBaseUrl();
  if(!hostName){
    (new Vue()).$message.error('请先填写正确的服务器地址')
    return false;
  }

  let _url = hostName+url
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
