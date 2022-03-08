import { useGlobSetting } from '/@/hooks/setting';

const { apiUrl = '' } = useGlobSetting();
const prefixUrl = `${apiUrl}/api/download`;

enum Api {
  TEMPLATE_CERT_CATEGORY = '/template/categories',
  TEMPLATE_CERT_REGION = '/template/regions',
  TEMPLATE_CERT_TASK = '/template/tasks',
}

export const certCategoryListTemplateUrl = `${prefixUrl}${Api.TEMPLATE_CERT_CATEGORY}`;
export const certRegionListTemplateUrl = `${prefixUrl}${Api.TEMPLATE_CERT_REGION}`;
export const certTaskListTemplateUrl = `${prefixUrl}${Api.TEMPLATE_CERT_TASK}`;
