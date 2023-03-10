<template>
  <div>
    <a-modal
      v-model="visible"
      width="800px"
      :mask-closable="false"
      @cancel="handleCancel"
      @afterClose="handleAfterClose"
    >
      <template slot="title">
        <div class="flex flex--between" style="margin-right:36px;">
          <span>原型上传</span>
          <section class="normal-font">
            <a-button icon="question-circle" type="link" href="https://wshiqtb.github.io/" target="_blank">
              帮助文档
            </a-button>
            <a-button icon="bars" type="link" href="https://wshiqtb.github.io/" target="_blank">
              项目列表
            </a-button>
          </section>
        </div>
      </template>

      <a-form-model ref="form" class="form-model" :model="form" layout="horizontal" :label-col="{span:3}" :wrapper-col="{span:20}">
        <a-form-model-item v-if="showHostName" has-feedback label="服务器" prop="hostName" :rules="rulesHostName">
          <a-input v-model="form.hostName" placeholder="请输入服务器地址,如果不知道请联系管理员" />
        </a-form-model-item>

        <a-form-model-item has-feedback label="项目" prop="projectId" :rules="rulesProjectId">
          <a-select
            v-model="form.projectId"
            show-search
            :show-arrow="false"
            placeholder="请输入项目名称搜索"
            :filter-option="false"
            :allow-clear="true"
            @search="fetchProjects"
          >
            <a-select-option v-for="d in data" :key="d.value">
              {{ d.text }}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item label="备注" prop="comment">
          <a-textarea v-model="form.comment" placeholder="请输入版本号，例如：1.0.0" />
        </a-form-model-item>

        <a-form-model-item v-if="progressPercent>0" label="上传进度">
          <a-progress
            :stroke-color="{
              '0%': '#108ee9',
              '100%': '#87d068',
            }"
            :status="progressStatus"
            :percent="progressPercent"
            :format="progressFormat"
          />
        </a-form-model-item>
        <a-form-model-item v-if="progressStatus==='success'" label="预览地址">
          <div class="flex" style="margin-top:4px;">
            <a-button type="link" :href="previewUrl" target="_blank">
              立即查看
            </a-button>
            <a-button type="link" @click="copyPreviewUrl">
              分享链接
            </a-button>
          </div>
        </a-form-model-item>
        <a-form-model-item v-if="progressStatus ==='success'" label="上传统计">
          文件数：<em class="statistic-text">{{ uploadFilesLength }}</em> 个。文件大小：<em class="statistic-text">{{ uploadFilesSize }}</em> MB
        </a-form-model-item>
      </a-form-model>

      <template slot="footer">
        <a-button v-if="progressPercent < 100" key="back" type="primary" :loading="progressPercent>0" @click="confirmUpload">
          提交
        </a-button>
        <a-button v-if="progressPercent === 100" key="back" type="primary" @click="handleCancel">
          关闭
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import qs from 'qs'
import isURL from 'validator/lib/isURL'
import cloneDeep from 'lodash/cloneDeep'
import debounce from 'lodash/debounce'
import { v4 as uuidv4 } from 'uuid'
import {_fetch, injectScript, getBaseUrl} from '../../utils/index.js'

let _speed = 0.18;
let _limit = 46;
let _timer = null;

export default {
  data () {
    this.fetchUser = debounce(this.fetchProjects, 500);
    return {
      visible: false,
      showHostName: false,
      showPassword: false,
      data: [],
      form: { hostName: '', projectId: undefined, comment:'' },
      progressPercent: 0,
      progressStatus: 'active',
      previewUrl: '',
      uploadFilesLength: 0,
      uploadFilesSize: 0,
      rulesHostName: [
        { trigger: 'blur',required:true, validator: this.hostNameValidator }
      ],
      rulesProjectId: [
        { trigger: 'blur',required:true, message: '请输入项目名称搜索' }
      ],
    }
  },

  created(){
    window.addEventListener('message', this.postMessageEvent, false);
  },

  destroyed(){
    window.removeEventListener('message', this.postMessageEvent);
  },

  methods: {
    async show () {
      const {project=null} = await chrome.storage.sync.get('project');
      // 初始化数据
      if(project){
        this.data = [project];
        this.form.projectId = project.value;
      }
      this.form.hostName = await getBaseUrl()
      this.showHostName = await this.checkShowHostName(this.form.hostName)

      // 显示dialog
      this.visible = true
    },

    postMessageEvent(e){
      const data = e.data
        switch (data.type) {
          case 'upload':
            // 开始上传文件
            this.progressPercent = 50;
            this.injectUploadCallback(data.data)
            break
        }
    },

    injectUploadCallback (data) {
      if (data.code === 1) {
        let files = data.data;
        this.uploadAction(files);
      } else {
        this.$message.error('文件采集失败')
        this.progressFinish(false);
      }
    },

    async uploadAction(files){
      const hostName = await getBaseUrl();
      const uploadFormData = cloneDeep(this.form);
      const fd = new FormData()

      fd.append('id', uploadFormData.projectId)
      fd.append('comment', uploadFormData.comment)
      fd.append('origin', 'extension')
      files.forEach(file => {
        fd.append('files', file.blob, file.url)
      })

      const xhr = new XMLHttpRequest();
      xhr.open('POST', hostName+'/api/v1/upload/');
      xhr.onload = ()=>{
        const res = JSON.parse(xhr.response);
        if(xhr.status === 200){
          this.previewUrl = hostName+res.Path;
          // 上传完成后，缓存项目
          const project = this.data.find(item=>item.value === uploadFormData.projectId);
          chrome.storage.sync.set({project})
          this.uploadFilesLength = files.length;
          this.progressFinish(true);
        }else{
          this.progressFinish(false);
        }

      }
      xhr.upload.onprogress = (event)=>{
        this.uploadFilesSize = (event.total / 1024 / 1024).toFixed(2)
        this.progressPercent = 50 + (event.loaded / event.total * 50)
      }
      xhr.send(fd)
    },

    async checkShowHostName (hostName) {
      const checkRes = await this.checkHostName(hostName)
      return checkRes.code === 'error'
    },

    async hostNameValidator (rule, value, callback) {
      const checkRes = await this.checkHostName(value)
      if (checkRes.code === 'error') {
        return callback(checkRes.message)
      }
      return callback()
    },

    async checkHostName (hostName) {
      if (!hostName) {
        return { code: 'error', message: '服务器地址不能为空' }
      }
      if (!isURL(hostName)) {
        return { code: 'error', message: '服务器地址不符合规范' }
      }
      const uuid = uuidv4()
      try {
        if (hostName.endsWith('/')) {
          hostName = hostName.slice(0, -1)
        }
        await fetch(hostName + '/api/v1/ping?a=axhub&b=' + uuid)

        // 校验通过后，缓存hostName，下次就不用输入了
        await chrome.storage.sync.set({hostName})
        return { code: 'success', message: '' }
      } catch (error) {
        return { code: 'error', message: '服务器地址填写不正确' }
      }
    },

    async fetchProjects(keywords){
      let queryString = qs.stringify({
        type: 'project',
        key: keywords,
        withStruct: true
      })
      const res = await _fetch('/api/v1/pages/search?'+queryString);
      this.data = this.processData(res || []);
    },

    processData(data){
      return data.map(group=>{
        let value = group[0].ID;
        let text = group.reverse().map(item=>item.Name).join(' / ');
        return {value, text}
      })
    },

    async confirmUpload () {
      const checked = await this.$refs.form.validate();
      if(!checked) return false;

      this.progressStart();
      // 注入js，抓取所有原型文件，并通过postMessage传递回来
      injectScript('js/inject-upload.js');
    },

    handleCancel(){
      this.showHostName = false;
      this.showPassword = false;
      this.progressPercent = 0;
      this.progressStatus = 'active';
      this.previewUrl = '';
      this.uploadFilesLength = 0;
      this.uploadFilesSize = 0;
      this.$refs.form.resetFields();
      this.visible = false;
    },

    handleAfterClose(){
      this.$emit('close')
    },

    // 进度条启动
    progressStart(){
      _timer = setInterval(()=>{
        if(this.progressPercent >= _limit){
          _timer && clearInterval(_timer)
        }
        this.progressPercent += _speed
      }, 16)
    },

    // 进度条完成
    progressFinish(tag){
      _timer && clearInterval(_timer)
      this.progressPercent = 100;
      this.progressStatus = tag ? 'success' : 'exception'
    },

    // 进度条格式化
    progressFormat(percent){
      return percent<100 ? percent.toFixed(2) + '%' : percent+'%';
    },

    // 复制预览地址
    copyPreviewUrl(){
      navigator.clipboard.writeText(this.previewUrl);
      this.$message.success('复制成功，您可以把链接发给项目成员');
    }
  }
}
</script>

<style lang="scss">
.flex{
  display: flex;
  align-items: center;
  &--between{
    justify-content:space-between;
  }
}
.preview-url{
  word-break: break-all;
  white-space: pre-wrap;
  line-height: 1.3em;
}
.normal-font{
  font-size: 14px;
  font-weight: normal;
}
.statistic-text{
  font-size: 1.1em;
  font-weight: 500;
  color: brown;
}
</style>
