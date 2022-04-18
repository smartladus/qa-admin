import { BasicColumn, BasicTableProps } from '/@/components/Table';
import { getAllProducts, uploadProducts } from '/@/api/quality/product';
import { ProductModel } from '/@/api/quality/model/productModel';
import { UploadModalSetting } from '/@/views/components/UploadModal';
import { productListTemplateUrl } from '/@/api/download';
import { StdTableConfig } from '/@/views/components/StdTable';

const columns: BasicColumn[] = [
  {
    title: '数字科技型号',
    dataIndex: 'jvModel',
    width: 120,
    fixed: 'left',
  },
  {
    title: '销售区域',
    dataIndex: 'salesTerritory',
    width: 100,
  },
  {
    title: '产品尺寸',
    dataIndex: 'size',
    width: 80,
  },
  {
    title: '产品类型',
    dataIndex: 'type',
    minWidth: 80,
  },
  {
    title: '产品标签',
    dataIndex: 'tags',
    width: 120,
  },
  {
    title: '物料编码',
    dataIndex: 'prodNo',
    width: 180,
  },
  {
    title: '物料描述',
    dataIndex: 'description',
    width: 240,
  },
  {
    title: '供应商',
    dataIndex: 'supplier',
    width: 80,
  },
  {
    title: '供应商型号',
    dataIndex: 'supModel',
    width: 150,
  },
  {
    title: '证书信息',
    dataIndex: 'certInfo',
    width: 250,
  },
];

const tableProps: Partial<BasicTableProps> = {
  title: '产品池清单',
  showTableSetting: true,
  showIndexColumn: true,
  tableSetting: { fullScreen: true },
  pagination: {
    pageSize: 50,
    pageSizeOptions: ['20', '50', '100'],
  },
  columns,
  api: getAllProducts,
  actionColumn: {
    width: 170,
    title: '操作',
    dataIndex: 'action',
    slots: { customRender: 'action' },
  },
};

const createEditMessage = (product: ProductModel): string =>
  `产品 ${product.prodNo} - ${product.jvModel}`;

const uploadSetting: UploadModalSetting = {
  title: '上传产品清单',
  messageOfAdd: '已选择增量上传，仅增物料编码及数字科技型号均不同的行。',
  templateDownloadUrl: productListTemplateUrl,
  uploadApi: uploadProducts,
};

const tableConfig: StdTableConfig<ProductModel> = {
  tableProps,
  createEditMessage,
  uploadSetting,
};

export default tableConfig;
