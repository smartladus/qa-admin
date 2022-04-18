import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const cert: AppRouteModule = {
  path: '/cert',
  name: 'Cert',
  component: LAYOUT,
  redirect: '/cert/tasks',
  meta: {
    orderNo: 3,
    icon: 'ant-design:audit',
    title: t('routes.cert.cert'),
  },
  children: [
    {
      path: 'tasks',
      name: 'Tasks',
      component: () => import('/@/views/cert/tasks/index.vue'),
      meta: {
        title: t('routes.cert.tasks'),
      },
    },
    {
      path: 'certifications',
      name: 'Certifications',
      component: () => import('/@/views/cert/certificates/index.vue'),
      meta: {
        title: t('routes.cert.certificates'),
      },
    },
    {
      path: 'categories',
      name: 'Category',
      component: () => import('/@/views/cert/categories/index.vue'),
      meta: {
        title: t('routes.cert.categories'),
      },
    },
  ],
};

export default cert;
