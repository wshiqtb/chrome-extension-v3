<template>
  <div>
    <a-modal
      v-model="visible"
      title="原型上传"
      ok-text="确认"
      cancel-text="取消"
      @cancel="handleCancel"
      @ok="handleOk"
    >
      <a-form-model ref="form" :model="form" layout="horizontal" :label-col="{span:4}" :wrapper-col="{span:18}">
        <a-form-model-item v-if="showHostName" has-feedback label="服务器" prop="hostName" :rules="rulesHostName">
          <a-input v-model="form.hostName" placeholder="例如: http://node01v.zgb.shyc3.qianxin-inc.cn" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="原型" prop="projectId" :rules="rulesProjectId">
          <a-select
            v-model="form.projectId"
            show-search
            placeholder="选择项目原型"
            style="width: 100%"
            :filter-option="false"
            :allow-clear="true"
            @search="fetchProjects"
          >
            <a-select-option v-for="d in data" :key="d.value">
              {{ d.text }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item v-if="showPassword" label="密码" prop="password" :rules="rulesPassword">
          <a-input-password v-model="form.password" placeholder="请输入密码" />
        </a-form-model-item>
        <a-form-model-item label="备注" prop="comment">
          <a-textarea v-model="form.comment" placeholder="请输入版本号" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import qs from 'qs'
import isURL from 'validator/lib/isURL'
import cloneDeep from 'lodash/cloneDeep'
import debounce from 'lodash/debounce'
import { v4 as uuidv4 } from 'uuid'
import {_fetch} from '../../utils/index.js'

export default {
  data () {
    this.fetchUser = debounce(this.fetchProjects, 500);
    return {
      visible: false,
      showHostName: false,
      showPassword: false,
      form: { hostName: '', projectId: '', password:'', comment:'' },
      rulesHostName: [
        { trigger: 'blur',required:true, validator: this.hostNameValidator }
      ],
      rulesProjectId: [
        { trigger: 'blur',required:true, message: '原型地址不能为空' }
      ],
      rulesPassword: [
        { trigger: 'blur', required:true, message: '密码不能为空' }
      ],
      data: []
    }
  },
  watch: {
    ['form.projectId'](){
      // 本期需求先不校验密码
      // this.checkShowPassword()
    }
  },
  methods: {
    async show () {
      this.form.hostName = await this.getCacheHostName()
      this.showHostName = await this.checkShowHostName(this.form.hostName)
      this.visible = true
    },

    async getCacheHostName () {
      const { hostName = '' } = await chrome.storage.sync.get('hostName')
      return hostName
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

    async checkShowPassword(){
      let checked = await this.checkPassword();
      this.showPassword = !checked;
    },

    async checkPassword(password=undefined){
      let sendData = {
        project: this.form.projectId,
      }
      if(password){
        sendData.password = password
      }

      try {
        await _fetch('/api/v1/auth', {
          method: 'post',
          body: qs.stringify(sendData),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
        })
        return true;
      } catch (error) {
        return false;
      }
    },

    async handleOk () {
      const checked = await this.$refs.form.validate();
      const formData = cloneDeep(this.form);
      this.close();
      if(checked){
        this.$emit('confirm', formData);
      }
    },

    close(){
      this.showHostName = false;
      this.showPassword = false;
      this.$refs.form.resetFields();
      this.visible = false;
    },

    handleCancel(){
      this.close();
    },
  }
}
</script>

<style>

</style>
