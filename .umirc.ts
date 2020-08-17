import { defineConfig } from 'umi';

export default defineConfig({
  antd: {},
  dva:{},
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
    { path: '/', component: '@/pages/main',title:'腾讯视频、优酷视频、土豆视频、爱奇艺视频解析 - 涂叶解析' },
  ],
});
