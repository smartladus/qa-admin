import { BasicColumn, BasicTableProps } from '/@/components/Table';
import { StdTableConfig } from '/@/views/components/StdTable';
import { TaskModel } from '/@/api/cert/model/taskModel';
import { getAllCertTasks, uploadCertTasks } from '/@/api/cert/task';
import { UploadModalSetting } from '/@/views/components/UploadModal';
import { certTaskListTemplateUrl } from '/@/api/download';

const columns: BasicColumn[] = [
  {
    title: '任务编号',
    dataIndex: 'taskNo',
    width: 220,
    fixed: 'left',
    align: 'center',
  },
  {
    title: '外部认证申请单号',
    dataIndex: 'oaNo',
    width: 200,
    align: 'center',
  },
  {
    title: '认证费用',
    dataIndex: 'cost',
    width: 150,
    align: 'right',
    sorter: (a: TaskModel, b: TaskModel) => a.cost - b.cost,
  },
  {
    title: '费用承担方',
    dataIndex: 'costBearer',
    width: 150,
    align: 'center',
  },
  {
    title: '供应商',
    dataIndex: 'supName',
    width: 120,
    align: 'center',
  },
  {
    title: '认证区域',
    dataIndex: 'region',
    width: 100,
    align: 'center',
  },
  {
    title: '认证类型',
    dataIndex: 'certName',
    width: 120,
    align: 'center',
  },
  {
    title: '获证方式',
    dataIndex: 'certMethod',
    width: 120,
    align: 'center',
  },
  {
    title: '获证方式说明',
    dataIndex: 'certMethodDesc',
    width: 150,
    align: 'center',
  },
  {
    title: '证书归属',
    dataIndex: 'certOwner',
    width: 100,
    align: 'center',
  },
  {
    title: '供应商型号范围',
    dataIndex: 'supModel',
    width: 200,
    ellipsis: true,
  },
  {
    title: 'JV型号范围',
    dataIndex: 'jvModel',
    width: 200,
    ellipsis: true,
  },
  {
    title: '任务状态',
    dataIndex: 'taskStat',
    width: 100,
    align: 'center',
  },
  {
    title: '开始时间',
    dataIndex: 'startDate',
    width: 120,
    align: 'center',
  },
  {
    title: '完成时间',
    dataIndex: 'endDate',
    width: 120,
    align: 'center',
  },
  {
    title: '证书编号',
    dataIndex: 'certNo',
    width: 200,
    align: 'center',
  },
];

const tableProps: Partial<BasicTableProps> = {
  title: '认证任务清单',
  showTableSetting: true,
  showIndexColumn: true,
  tableSetting: { fullScreen: true },
  pagination: {
    pageSize: 20,
  },
  columns,
  api: getAllCertTasks,
  actionColumn: {
    width: 170,
    title: '操作',
    dataIndex: 'action',
    slots: { customRender: 'action' },
  },
};

const createEditMessage = function (task: TaskModel): string {
  return `认证任务 ${task.taskNo} `;
};

const uploadSetting: UploadModalSetting = {
  title: '上传认证任务清单',
  messageOfAdd: '已选择增量上传，仅增加区域简称及中文名称均不同的行。',
  templateDownloadUrl: certTaskListTemplateUrl,
  uploadApi: uploadCertTasks,
};

const tableConfig: StdTableConfig<TaskModel> = {
  tableProps,
  createEditMessage,
  uploadSetting,
};

export default tableConfig;
