<template>
  <div>
    <a-button type="link" @click="upload">
      <a-icon type="cloud-upload" :style="{fontSize:'26px',marginTop:'4px'}" />
    </a-button>

    <UploadDialog v-if="showUploadDialog" ref="uploadDialog" @close="closeDialog" />
  </div>
</template>

<script>
import UploadDialog from './components/upload-dialog.vue'

export default {
  components: { UploadDialog },
  data(){
    return {
      showUploadDialog: false,
      uploadFormData: {}
    }
  },
  methods: {
    upload () {
      this.showUploadDialog = true;
      this.$nextTick(()=>{
        this.$refs.uploadDialog.show()
      })
    },

    closeDialog(){
      this.showUploadDialog = false;
    }
  }
}
</script>

<style>

</style>
