export type TaskStat = 'NEW' | 'DONE' | 'DOC_PREPARE' | 'TEST' | 'GET_CERT' | 'CANCELLED';

export type TaskModel = {
  taskNo: string;
  taskStat: TaskStat;
  oaNo: string | undefined;
  cost: number;
  costBearer: string | undefined;
  supName: string;
  region: string[];
  certName: string;
  certMethod: string;
  certMethodDesc: string;
  certOwner: string;
  supModel: string;
  jvModel: string;
  startDate: string;
  endDate: string;
  certNo: string;
  comments: string;
  todo: string;
};

export const emptyTaskModel: TaskModel = {
  taskNo: 'new',
  taskStat: 'NEW',
  cost: 0,
  costBearer: '',
  supName: '',
  region: [],
  certName: '',
  certMethod: '',
  certOwner: '',
  supModel: '',
  jvModel: '',
  todo: '',
  comments: '',
};
