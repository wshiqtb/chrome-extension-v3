<template>
  <div>
    <a-button type="link" @click="upload">
      <a-icon type="cloud-upload" :style="{fontSize:'26px',marginTop:'4px'}" />
    </a-button>

    <UploadDialog ref="uploadDialog" @confirm="handleConfirm" />
    <ProgressDialog ref="progressDialog" />
  </div>
</template>

<script>
import { injectScript, _fetch } from '../utils/index.js'
import UploadDialog from './components/upload-dialog.vue'
import ProgressDialog from './components/progress-dialog.vue'

export default {
  components: { UploadDialog,ProgressDialog },
  data(){
    return {
      uploadFormData: {}
    }
  },
  created () {
    this.addPostMessageEvent()
  },
  methods: {
    upload () {
      this.$refs.uploadDialog.show()
    },

    handleConfirm(formData){
      this.uploadFormData = formData;
      this.$refs.progressDialog.start();
      this.$nextTick(()=>{
        // 注入js，抓取所有原型文件，并通过postMessage传递回来
        injectScript('js/inject-upload.js');
      })
    },

    // 监听postMessage，接收inject.js传递回来的数据
    addPostMessageEvent () {
      window.addEventListener('message', (e) => {
        const data = e.data
        switch (data.type) {
          case 'upload':
            // 开始上传文件
            this.injectUploadCallback(data.data)
            break
        }
      }, false)
    },

    injectUploadCallback (data) {
      if (data.code === 1) {
        let files = data.data;
        this.uploadAction(files);
      } else {
        this.$message.error('上传失败')
      }
    },

    async uploadAction(files){
      const uploadFormData = this.uploadFormData
      const fd = new FormData()

      fd.append('id', uploadFormData.projectId)
      fd.append('comment', uploadFormData.comment)
      fd.append('origin', 'extension')
      files.forEach(file => {
        fd.append('files', file.blob, file.url)
      })

      try {
        const res = await _fetch('/api/v1/upload/', {
          method: 'post',
          body: fd
        })
        const { hostName = '' } = await chrome.storage.sync.get('hostName')
        const previewUrl = hostName+res.Path;

        this.$refs.progressDialog.end();
        this.$success({
          title: '上传成功',
          okText:'复制原型地址并关闭弹窗',
          content: (
            <div>
              <p>原型预览地址：</p>
              <p><a href="{previewUrl}" target="_blank">{previewUrl}</a></p>
            </div>
          ),
          onOk: async ()=>{
            await navigator.clipboard.writeText(previewUrl);
            this.$message.success('复制成功')
          }
        })
      } catch (error) {
        this.$refs.progressDialog.end();
        this.$error({
          content: '上传失败',
        });
      }
    }
  }
}
</script>

<style>

</style>
