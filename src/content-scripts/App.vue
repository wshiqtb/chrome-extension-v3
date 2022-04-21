<template>
  <div>
    <q-tag type="primary" @click="upload">content-scripts</q-tag>
  </div>
</template>

<script>
import { injectScript } from '../utils/index.js'
export default {
  created () {
    console.log('content-scripts')
    this.addPostMessageEvent()
  },
  methods: {
    upload () {
      injectScript('inject.js')
    },
    // 监听postMessage
    addPostMessageEvent () {
      window.addEventListener('message', (e) => {
        const data = e.data
        switch (data.type) {
          case 'uploaded':
            this.uploadedAction(data.data)
            break
        }
      }, false)
    },
    uploadedAction (data) {
      if (data.code === 1) {
        this.$message.success('上传成功')
      } else {
        this.$message.error('上传失败')
      }
    }
  }
}
</script>

<style>

</style>
