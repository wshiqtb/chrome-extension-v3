import { createApp } from 'vue';
// import 'ant-design-vue/dist/antd.css';
import ContentScripts from './content-scripts.vue';

insertDom(ContentScripts);

function insertDom(element: any) {
  const insertDom = document.createElement('div');
  insertDom.id = 'axhub-rp8-root-test';
  const targetDom = document.querySelector('#interfaceControlFrameHeaderContainer');
  targetDom?.appendChild(insertDom);
  createApp(element).mount('#axhub-rp8-root-test');
  
}