import { BasicColumn, BasicTableProps } from '/@/components/Table';
import { UploadModalSetting } from '/@/views/components/UploadModal';
import { certRegionListTemplateUrl } from '/@/api/download';
import { useCertStore } from '/@/store/modules/cert';
import { RegionModel } from '/@/api/cert/model/regionModel';
import {
  getAllCertRegions,
  uploadCertRegions,
  insertCertRegion,
  updateCertRegion,
  deleteCertRegion,
} from '/@/api/cert/region';
import { StdTableConfig } from '/@/views/components/StdTable';

const certStore = useCertStore();

const columns: BasicColumn[] = [
  {
    title: '大洲/大区',
    dataIndex: 'continent',
    width: 120,
    align: 'center',
    fixed: 'left',
    editRow: true,
    editComponent: 'Select',
    editComponentProps: {
      options: certStore.getSelectOptions('continents'),
    },
    editRule: async (text) => {
      return text ? '' : '请选择大洲/大区！';
    },
  },
  {
    title: '国家/区域名称',
    dataIndex: 'country',
    width: 150,
    align: 'center',
    editRow: true,
  },
  {
    title: '国家/区域简称',
    dataIndex: 'abbr',
    width: 120,
    align: 'center',
    fixed: 'left',
    editRow: true,
    editComponent: 'Input',
    editComponentProps: {
      placeholder: '2~3位英文大写简称',
    },
    editRule: async (text) => {
      return /^[A-Z]{2,3}$/.test(text) ? '' : '请输入2~3位英文大写简称';
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
  api: getAllCertRegions,
};

const uploadSetting: UploadModalSetting = {
  title: '上传认证区域清单',
  messageOfAdd: '已选择增量上传，仅增加区域简称及中文名称均不同的行。',
  templateDownloadUrl: certRegionListTemplateUrl,
  uploadApi: uploadCertRegions,
};

const editApi = {
  insertApi: insertCertRegion,
  updateApi: updateCertRegion,
  deleteApi: deleteCertRegion,
};

const createEditMessage = function (region: RegionModel): string {
  return `认证区域 ${region.country} `;
};

const tableConfig: StdTableConfig<RegionModel> = {
  tableProps,
  uploadSetting,
  editApi,
  createEditMessage,
};

export default tableConfig;
