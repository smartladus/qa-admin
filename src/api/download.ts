import { defHttp } from '/@/utils/http/axios';
import { useGlobSetting } from '/@/hooks/setting';

const { apiUrl = '' } = useGlobSetting();
const urlPrefix = `${apiUrl}/api/download`;

enum Api {
  TEMPLATE_CERT_CATEGORY = '/template/categories',
  TEMPLATE_CERT_REGION = '/template/regions',
  TEMPLATE_CERT_TASK = '/template/tasks',
  TEMPLATE_QA_SUPPLIER = '/template/suppliers',
  TEMPLATE_QA_PRODUCT = '/template/products',
  SPEC = '/spec',
  PRODUCT_CERT_CERTIFICATE = '/template/products',
  PRODUCT_CERT_REPORT = '/template/products',
}

export const certCategoryListTemplateUrl = `${urlPrefix}${Api.TEMPLATE_CERT_CATEGORY}`;
export const certRegionListTemplateUrl = `${urlPrefix}${Api.TEMPLATE_CERT_REGION}`;
export const certTaskListTemplateUrl = `${urlPrefix}${Api.TEMPLATE_CERT_TASK}`;
export const supplierListTemplateUrl = `${urlPrefix}${Api.TEMPLATE_QA_SUPPLIER}`;
export const productListTemplateUrl = `${urlPrefix}${Api.TEMPLATE_QA_PRODUCT}`;

export const specUrl = (prodNo: string): Promise<string> => defHttp.get(
  { url: `${Api.SPEC}/${prodNo}` },
  { urlPrefix }
);
