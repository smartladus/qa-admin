import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const vueLearning: AppRouteModule = {
  path: '/vue-learning',
  name: 'VueLearning',
  component: LAYOUT,
  redirect: '/vue-learning/test',
  meta: {
    orderNo: 1,
    icon: 'ant-design:bug',
    title: '测试页面',
  },
  children: [
    {
      path: 'test',
      name: 'Test',
      component: () => import('/@/views/vue-learning/test/index.vue'),
      meta: {
        title: '随便写写',
      },
    },
  ],
};

export default vueLearning;
