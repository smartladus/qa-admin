import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const quality: AppRouteModule = {
  path: '/quality',
  name: 'Quality',
  component: LAYOUT,
  redirect: '/quality/suppliers',
  meta: {
    orderNo: 2,
    icon: 'ant-design:safety-certificate',
    title: t('routes.quality.quality'),
  },
  children: [
    {
      path: 'suppliers',
      name: 'Suppliers',
      component: () => import('/@/views/quality/suppliers/index.vue'),
      meta: {
        title: t('routes.quality.supplier'),
      },
    },
    {
      path: 'delivery',
      name: 'Delivery',
      component: () => import('/@/views/quality/delivery/index.vue'),
      meta: {
        title: t('routes.quality.delivery'),
      },
    },
    {
      path: 'services',
      name: 'Services',
      component: () => import('/@/views/quality/services/index.vue'),
      meta: {
        title: t('routes.quality.service'),
      },
    },
    {
      path: 'issues',
      name: 'Issues',
      component: () => import('/@/views/quality/issues/index.vue'),
      meta: {
        title: t('routes.quality.issue'),
      },
    }
  ],
};

export default quality;
