import { defHttp } from '/@/utils/http/axios';
import { uploadFile } from '/@/api/sys/upload';
import { UploadApi, UploadParams } from '/@/api/sys/model/uploadModel';
import { TaskModel, TaskStatModel } from '/@/api/cert/model/taskModel';

const urlPrefix = '/api/cert';

enum Api {
  TASKS = '/tasks',
  STATS = '/tasks/stats',
}

export const getAllCertTasks = (): Promise<TaskModel[]> =>
  defHttp.get({ url: Api.TASKS }, { urlPrefix });

export const getCertTaskByTaskNo = (taskNo: string): Promise<TaskModel> =>
  defHttp.get({ url: `${Api.TASKS}/${taskNo}` }, { urlPrefix });

export const deleteCertTaskByTaskNo = (taskNo: string): Promise<number> =>
  defHttp.delete({ url: `${Api.TASKS}/${taskNo}` }, { urlPrefix });

export const insertCertTask = (task: TaskModel): Promise<TaskModel> =>
  defHttp.post(
    {
      url: Api.TASKS,
      data: task,
    },
    { urlPrefix },
  );

export const updateCertTask = (task: TaskModel): Promise<TaskModel> =>
  defHttp.put(
    {
      url: `${Api.TASKS}/${task.taskNo}`,
      data: task,
    },
    { urlPrefix },
  );

export const uploadCertTasks: UploadApi = (params: UploadParams) =>
  uploadFile(
    params.fileList,
    params?.multi ?? false,
    {
      url: Api.TASKS,
      params: {
        mode: params?.mode ?? 'add',
      },
      onUploadProgress: params?.onUploadProgress,
    },
    {
      urlPrefix: '/api/upload',
    },
  );

export const getAllCertTasksStats = (): Promise<TaskStatModel[]> =>
  defHttp.get({ url: Api.STATS }, { urlPrefix });
