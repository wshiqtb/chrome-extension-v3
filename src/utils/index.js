import Vue from 'vue'

export const _fetch = async (url, options) => {
  const store = await chrome.storage.sync.get('token')
  const token = store.token
  if (!token) {
    new Vue().$message.error('请点击扩展图标配置token！')
    return false
  }
  options = options || {}
  options.headers = options.headers || {}
  options.headers = Object.assign(options.headers, {
    'access-token': token
  })
  const res = await fetch(url, options)
  const jsonRes = await res.json()
  return jsonRes
}
