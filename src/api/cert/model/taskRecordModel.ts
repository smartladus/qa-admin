import { TaskStat } from '/@/api/cert/model/taskModel';
import { Dayjs } from 'dayjs';

export type TaskRecordModel = {
  id: string;
  recordNo: string;
  taskNo: string;
  taskStat: TaskStat;
  content: string;
  recordTime: Dayjs;
};
