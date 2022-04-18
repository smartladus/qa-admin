import { BasicColumn, BasicTableProps } from '/@/components/Table';
import { StdTableConfig } from '/@/views/components/StdTable';
import { TaskModel } from '/@/api/cert/model/taskModel';
import { getAllCertifications } from '/@/api/cert/certificate';

const columns: BasicColumn[] = [

];

const tableProps: Partial<BasicTableProps> = {
  title: '证书及报告清单',
  showTableSetting: true,
  showIndexColumn: true,
  tableSetting: { fullScreen: true },
  pagination: {
    pageSize: 20,
  },
  columns,
  api: getAllCertifications,
  actionColumn: {
    width: 170,
    title: '操作',
    dataIndex: 'action',
    slots: { customRender: 'action' },
  },
};

const tableConfig: StdTableConfig<TaskModel> = {
  tableProps,
  createEditMessage,
  uploadSetting,
};

export default tableConfig;
