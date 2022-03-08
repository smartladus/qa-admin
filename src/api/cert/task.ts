import { defHttp } from '/@/utils/http/axios';
import { uploadFile } from '/@/api/sys/upload';
import { UploadApi, UploadParams } from '/@/api/sys/model/uploadModel';

const urlPrefix = '/api/cert';

enum Api {
  TASKS = '/tasks',
}

export const getAllCertTasks = () => defHttp.get({ url: Api.TASKS }, { urlPrefix });

export const getCertTaskByTaskNo = (taskNo: string) =>
  defHttp.get({ url: `${Api.TASKS}/${taskNo}` }, { urlPrefix });

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
