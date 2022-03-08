import { defHttp } from '/@/utils/http/axios';
import { uploadFile } from '/@/api/sys/upload';
import { UploadApi, UploadParams } from '/@/api/sys/model/uploadModel';
import { RegionModel } from '/@/api/cert/model/regionModel';

const urlPrefix = '/api/cert';

enum Api {
  REGION = '/regions',
}

export const uploadCertRegions: UploadApi = (params: UploadParams) =>
  uploadFile(
    params.fileList,
    params?.multi ?? false,
    {
      url: Api.REGION,
      params: {
        mode: params?.mode ?? 'add',
      },
      onUploadProgress: params?.onUploadProgress,
    },
    {
      urlPrefix: '/api/upload',
    },
  );

export const getAllCertRegions = () => defHttp.get({ url: Api.REGION }, { urlPrefix });

export const insertCertRegion = (region: RegionModel) =>
  defHttp.post(
    {
      url: Api.REGION,
      data: region,
    },
    { urlPrefix },
  );

export const updateCertRegion = (region: RegionModel) =>
  defHttp.put(
    {
      url: `${Api.REGION}/${region.id}`,
      data: region,
    },
    { urlPrefix },
  );

export const deleteCertRegionById = (id: string) =>
  defHttp.delete({ url: `${Api.REGION}/${id}` }, { urlPrefix });

export const deleteCertRegion = (region: RegionModel) => deleteCertRegionById(region.id);
