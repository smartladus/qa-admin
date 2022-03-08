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
      component: () => import('/@/views/quality/supplier/index.vue'),
      meta: {
        title: t('routes.quality.supplier'),
      },
    },
  ],
};

export default quality;
