import { Dayjs } from 'dayjs';

export type TaskStat = 'NEW' | 'DONE' | 'DOC_PREPARE' | 'TEST' | 'GET_CERT' | 'CANCELLED';

export type TaskModel = {
  id: string;
  taskNo: string;
  taskStat: TaskStat;
  oaNo: string;
  cost: number;
  costBearer: string;
  supName: string;
  region: string[];
  certName: string;
  certMethod: string;
  certMethodDesc: string;
  certOwner: string;
  supModel: string;
  jvModel: string;
  startDate: Dayjs;
  endDate: Dayjs;
  certNo: string;
  comments: string;
  todo: string;
};

export type TaskStatModel = {
  state: string;
  label: string;
  type: string;
};

export const emptyTaskModel: Partial<TaskModel> = {
  taskNo: 'new',
  taskStat: 'NEW',
  oaNo: '',
  cost: 0,
  costBearer: '',
  supName: '',
  region: [],
  certName: '',
  certMethod: '',
  certMethodDesc: '',
  certOwner: '',
  supModel: '',
  jvModel: '',
  certNo: '',
  comments: '',
  todo: '',
};
