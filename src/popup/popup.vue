<template>
  <div class="popup">
    <div class="title">
      <h1>
        <a href="https://axhub.im/" target="_blank">Axhub</a>
        <!-- TODO 动态获取版本号 -->
        <span>v1.0.0</span>
      </h1>
      <span>
        <a href="https://axhub.im/chrome" target="_blank" rel="noopener noreferrer">官网</a>
        <a>登出企业版</a>
      </span>
    </div>
    <a-checkbox class="ax-check" v-model:checked="checked" @change="onChange">开启一键同步原型文件</a-checkbox>
    <!-- TODO iconfont功能 -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// TODO checked初始状态从接口获取，状态变更走接口

let checked = ref(true);
const onChange = (e: any) => {
  console.log('update check status: ', e);
}
</script>

<style lang="less" scoped>
.popup {
  padding: 24px;
}

.title {
  margin-bottom: 24px;
}

.title h1 {
  a {
    margin: 0;
    line-height: 36px;
    color: #00838f;
    font-size: 28px;
    text-decoration: none;
  }

  span {
    margin-left: 8px;
    font-size: 12px;
    color: #00838f;
  }
}

.title a, .title span {
  color: #999;
  font-size: 12px;
  line-height: 28px;
}

.title a {
  margin-right: 8px;
  text-decoration: underline;
}

.popup .ax-check {
  margin-bottom: 8px;
}
</style>

