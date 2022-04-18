import { defHttp } from '/@/utils/http/axios';
import { uploadFile } from '/@/api/sys/upload';
import { UploadApi, UploadParams } from '/@/api/sys/model/uploadModel';

const urlPrefix = '/api/cert';

enum Api {
  CERTIFICATION = '/certifications',
}

export const uploadCertifications: UploadApi = (params: UploadParams) =>
  uploadFile(
    params.fileList,
    params?.multi ?? false,
    {
      url: Api.CERTIFICATION,
      params: {
        mode: params?.mode ?? 'add',
      },
      onUploadProgress: params?.onUploadProgress,
    },
    {
      urlPrefix: '/api/upload',
    },
  );

export const getAllCertifications = () => defHttp.get({ url: Api.CERTIFICATION }, { urlPrefix });
