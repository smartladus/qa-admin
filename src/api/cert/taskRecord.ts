import { defHttp } from '/@/utils/http/axios';
import { uploadFile } from '/@/api/sys/upload';
import { UploadApi, UploadParams } from '/@/api/sys/model/uploadModel';
import { TaskRecordModel } from '/@/api/cert/model/taskRecordModel';

const urlPrefix = '/api/cert';

enum Api {
  TASKS = '/tasks',
  RECORDS = '/records',
}

export const getCertTaskRecordsByTaskNo = (taskNo: string): Promise<TaskRecordModel[]> =>
  defHttp.get({ url: `${Api.TASKS}/${taskNo}${Api.RECORDS}` }, { urlPrefix });

export const deleteCertTaskRecord = (recNo: string): Promise<number> =>
  defHttp.delete({ url: `${Api.TASKS}${Api.RECORDS}/${recNo}` }, { urlPrefix });

export const updateCertTaskRecord = (record: TaskRecordModel): Promise<number> =>
  defHttp.put(
    {
      url: `${Api.TASKS}${Api.RECORDS}/${record.recordNo}`,
      data: record,
    },
    { urlPrefix },
  );

export const insertCertTaskRecord = (record: Partial<TaskRecordModel>): Promise<TaskRecordModel> =>
  defHttp.post(
    {
      url: `${Api.TASKS}${Api.RECORDS}`,
      data: record,
    },
    { urlPrefix },
  );

export const uploadCertTaskRecords: UploadApi = (params: UploadParams) =>
  uploadFile(
    params.fileList,
    params?.multi ?? false,
    {
      url: `${Api.TASKS}${Api.RECORDS}`,
      params: {
        mode: params?.mode ?? 'add',
      },
      onUploadProgress: params?.onUploadProgress,
    },
    {
      urlPrefix: '/api/upload',
    },
  );
