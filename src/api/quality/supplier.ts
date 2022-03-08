import { defHttp } from '/@/utils/http/axios';
import { SupplierModel } from '/@/api/quality/model/supplierModel';
import { UploadApi, UploadParams } from '/@/api/sys/model/uploadModel';
import { uploadFile } from '/@/api/sys/upload';

const urlPrefix = '/api/quality';

enum Api {
  SUPPLIER = '/suppliers',
}

export const getAllSuppliers = (): Promise<SupplierModel[]> =>
  defHttp.get<SupplierModel[]>({ url: Api.SUPPLIER }, { urlPrefix });

export const uploadSuppliers: UploadApi = (params: UploadParams) =>
  uploadFile(
    params.fileList,
    params?.multi ?? false,
    {
      url: Api.SUPPLIER,
      params: {
        mode: params?.mode ?? 'add',
      },
      onUploadProgress: params?.onUploadProgress,
    },
    {
      urlPrefix: '/api/upload',
    },
  );
