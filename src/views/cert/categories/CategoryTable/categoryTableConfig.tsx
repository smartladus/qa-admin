import { BasicColumn, BasicTableProps } from '/@/components/Table';
import { UploadModalSetting } from '/@/views/components/UploadModal';
import {
  getAllCertCategories,
  uploadCertCategories,
  insertCertCategory,
  deleteCertCategory,
  updateCertCategory,
} from '/@/api/cert/category';
import { certCategoryListTemplateUrl } from '/@/api/download';
import { CategoryModel, emptyCategoryModel } from '/@/api/cert/model/categoryModel';
import { StdTableConfig } from '/@/views/components/StdTable';

import { useCertStore } from '/@/store/modules/cert';
import { storeToRefs } from 'pinia';

const certStore = useCertStore();
const { getRegionOptions } = storeToRefs(certStore);

const columns: BasicColumn[] = [
  {
    title: '区域',
    dataIndex: 'region',
    width: 120,
    fixed: 'left',
    editRow: true,
    editComponent: 'Cascader',
    editComponentProps: {
      options: getRegionOptions,
      displayRender: ({ labels }) => <div>{labels[labels.length - 1]}</div>,
    },
    editRule: async (textArr) => {
      return textArr ? '' : '请选择认证区域！';
    },
  },
  {
    title: '认证名称',
    dataIndex: 'certName',
    width: 120,
    fixed: 'left',
    editRow: true,
    editRule: async (text) => {
      return text.trim() ? '' : '请输入认证名称！';
    },
  },
  {
    title: '认证大类',
    dataIndex: 'type',
    width: 150,
    editRow: true,
    editComponent: 'Select',
    editComponentProps: {
      mode: 'multiple',
      options: certStore.getSelectOptions('certTypes'),
    },
    editRule: async (textArr) => {
      return textArr && textArr.length > 0 ? '' : '请至少选择一个认证大类！';
    },
  },
  {
    title: '是否强制',
    dataIndex: 'compulsory',
    width: 60,
    align: 'center',
    editRow: true,
    editComponent: 'Switch',
  },
  {
    title: '国内测试',
    dataIndex: 'testDomestic',
    width: 60,
    editRow: true,
    editComponent: 'Switch',
  },
  {
    title: '持证方',
    dataIndex: 'holder',
    width: 120,
    editRow: true,
  },
  {
    title: '样机数量',
    dataIndex: 'sampleQty',
    width: 60,
    editRow: true,
    editRule: async (val) => {
      return isNaN(Number(val)) ? '请输入数值！' : '';
    },
    editComponent: 'InputNumber',
    editComponentProps: {
      min: 0,
      precision: 0,
    },
  },
  {
    title: '参考周期',
    dataIndex: 'timeCost',
    width: 80,
    editRow: true,
    editRule: async (val) => {
      return isNaN(Number(val)) ? '请输入数值！' : '';
    },
    editComponent: 'InputNumber',
    editComponentProps: {
      min: 0,
      precision: 0,
      formatter: (val) => `${val} 周`,
      parser: (val) => val.replace(' 周', ''),
    },
  },
  {
    title: '参考价格',
    dataIndex: 'cost',
    width: 100,
    editRow: true,
    editRule: async (val) => {
      return isNaN(Number(val)) ? '请输入数值！' : '';
    },
    editComponent: 'InputNumber',
    editComponentProps: {
      min: 0,
      precision: 0,
      controls: false,
      formatter: (val) => `￥ ${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      parser: (val) => val.replace(/￥\s?|(,*)/g, ''),
    },
  },
  {
    title: '备注',
    dataIndex: 'comments',
    width: 250,
    editRow: true,
    editComponent: 'InputTextArea',
    editComponentProps: {
      style: { textAlign: 'start' },
    },
  },
];

const tableProps: Partial<BasicTableProps> = {
  showTableSetting: true,
  showIndexColumn: true,
  tableSetting: { fullScreen: true },
  pagination: {
    pageSize: 20,
  },
  columns,
  api: getAllCertCategories,
};

const uploadSetting: UploadModalSetting = {
  title: '上传认证类型清单',
  messageOfAdd: '已选择增量上传，仅增加认证类型不同的行。',
  templateDownloadUrl: certCategoryListTemplateUrl,
  uploadApi: uploadCertCategories,
};

const editApi = {
  insertApi: insertCertCategory,
  updateApi: updateCertCategory,
  deleteApi: deleteCertCategory,
};

const createEditMessage = function (category: CategoryModel): string {
  return `认证类型 ${category.certName} `;
};

const tableConfig: StdTableConfig<CategoryModel> = {
  tableProps,
  uploadSetting,
  editApi,
  createEditMessage,
  emptyRecord: emptyCategoryModel,
};

export default tableConfig;
