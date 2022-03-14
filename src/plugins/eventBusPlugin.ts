import mitt from 'mitt';

const install = (app) => {
  app.config.globalProperties.$bus = mitt();
};

// 在main.ts中引入并使用了该插件
export default {
  install,
};
