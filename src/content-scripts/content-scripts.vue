<template>
  <a @click="showModal">
    <cloud-upload-outlined />
    <span>同步</span>
  </a>
  <a-modal v-model:visible="visible" title="同步原型-Axhub" @ok="onOk">
    <a-form :model="formState" :rules="rules" @finish="onFinish" @finishFailed="onFinishFailed">
      <a-form-item label="原型地址" name="address">
        <a-input v-model:value="formState.address" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';
import { CloudUploadOutlined } from '@ant-design/icons-vue';

interface FormState {
  address: string
}

// 嵌入DOM相关
let visible = ref<Boolean>(false);
function showModal() {
  console.log('icon click');
  visible.value = true;
}

// 弹窗相关
const formState = reactive<FormState>({
  address: ''
})
const rules: Record<string, Rule[]> = {
  address: [{ required: true, trigger: 'blur', message: '请输入原型地址'}]
}
const onOk = () => {
  console.log('onOk');
  visible.value = false;
}
const onFinish = (values: any) => {
  console.log('validate success', values);
}
const onFinishFailed = (errorInfo: any) => {
  console.log('validate failed', errorInfo);
}
</script>

<style lang="less" scoped>
a {
  display: block;
  width: 54px;
  height: 78px;
  margin-right: 1px;
  color: rgb(255, 255, 255);
  white-space: nowrap;
  cursor: pointer;
  text-align: center;
  padding-top: 8px !important;
  text-decoration: none;
}

.anticon {
  display: block;
  font-size: 28px;
  margin-bottom: 4px;
}

span {
  font-size: 12px;
}
</style>