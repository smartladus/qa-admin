import { BasicColumn, BasicTableProps } from '/@/components/Table';
import { SupplierModel } from '/@/api/quality/model/supplierModel';

import { StdTableConfig } from '/@/views/components/StdTable';
import { getAllSuppliers, uploadSuppliers } from '/@/api/quality/supplier';
import { UploadModalSetting } from '/@/views/components/UploadModal';
import { supplierListTemplateUrl } from '/@/api/download';

const columns: BasicColumn[] = [
  {
    title: '供应商简称',
    dataIndex: 'abbr',
    width: 100,
    align: 'center',
    fixed: 'left',
  },
  {
    title: '主供产品',
    dataIndex: 'mainProducts',
    width: 100,
    align: 'center',
  },
  {
    title: '良率要求',
    dataIndex: 'drRequirement',
    width: 250,
    align: 'center',
  },
  {
    title: '统一信用代码',
    dataIndex: 'compId',
    width: 200,
    align: 'center',
  },
  {
    title: '中文全称及地址',
    dataIndex: 'companyInfoZh',
    width: 300,
    align: 'center',
  },
  {
    title: '英文全称及地址',
    dataIndex: 'companyInfoEn',
    width: 300,
    align: 'center',
  },
];

const tableProps: Partial<BasicTableProps> = {
  title: '供应商清单',
  showTableSetting: true,
  showIndexColumn: true,
  tableSetting: { fullScreen: true },
  pagination: {
    pageSize: 20,
  },
  columns,
  api: getAllSuppliers,
  actionColumn: {
    width: 170,
    title: '操作',
    dataIndex: 'action',
    slots: { customRender: 'action' },
  },
};

const createEditMessage = function (supplier: SupplierModel): string {
  return `供应商 ${supplier.abbr} `;
};

const uploadSetting: UploadModalSetting = {
  title: '上传供应商清单',
  messageOfAdd: '已选择增量上传，仅增加信用代码不同的行。',
  templateDownloadUrl: supplierListTemplateUrl,
  uploadApi: uploadSuppliers,
};

const tableConfig: StdTableConfig<SupplierModel> = {
  tableProps,
  createEditMessage,
  uploadSetting,
};

export default tableConfig;
