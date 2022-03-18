import { useGlobSetting } from '/@/hooks/setting';

const { apiUrl = '' } = useGlobSetting();
const prefixUrl = `${apiUrl}/api/download`;

enum Api {
  TEMPLATE_CERT_CATEGORY = '/template/categories',
  TEMPLATE_CERT_REGION = '/template/regions',
  TEMPLATE_CERT_TASK = '/template/tasks',
  TEMPLATE_QA_SUPPLIER = '/template/suppliers',
}

export const certCategoryListTemplateUrl = `${prefixUrl}${Api.TEMPLATE_CERT_CATEGORY}`;
export const certRegionListTemplateUrl = `${prefixUrl}${Api.TEMPLATE_CERT_REGION}`;
export const certTaskListTemplateUrl = `${prefixUrl}${Api.TEMPLATE_CERT_TASK}`;
export const supplierListTemplateUrl = `${prefixUrl}${Api.TEMPLATE_QA_SUPPLIER}`;
