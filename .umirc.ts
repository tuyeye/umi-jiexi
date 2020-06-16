import { defineConfig } from 'umi';

export default defineConfig({
  antd: {},
  nodeModulesTransform: {
    type: 'none',
  },
  theme: {
    "@primary-color": "#30b767",
  },
links:[
  {
    rel:'icon',
    href:'https://zos.alipayobjects.com/rmsportal/HzvPfCGNCtvGrdk.png',
    type:'image/x-icon'
  }
],

  routes: [
    { path: '/', component: '@/pages/index' },
  ],
});
