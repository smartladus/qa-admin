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
    align: 'center',
    fixed: 'left',
  },
  {
    title: '产品尺寸',
    dataIndex: 'size',
    width: 80,
    align: 'center',
  },
  {
    title: '产品类型',
    dataIndex: 'type',
    width: 80,
    align: 'center',
  },
  {
    title: '产品标签',
    dataIndex: 'tags',
    width: 120,
    align: 'center',
  },
  {
    title: '物料编码',
    dataIndex: 'prodNo',
    width: 180,
    align: 'center',
  },
  {
    title: '物料描述',
    dataIndex: 'description',
    width: 240,
    align: 'center',
  },
  {
    title: '供应商',
    dataIndex: 'supplier',
    width: 80,
    align: 'center',
  },
  {
    title: '供应商型号',
    dataIndex: 'supModel',
    width: 180,
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
