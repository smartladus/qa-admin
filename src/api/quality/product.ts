import { defHttp } from '/@/utils/http/axios';
import { UploadApi, UploadParams } from '/@/api/sys/model/uploadModel';
import { uploadFile } from '/@/api/sys/upload';
import { ProductModel } from '/@/api/quality/model/productModel';

const urlPrefix = '/api/quality';

enum Api {
  PRODUCT = '/products',
}

export const getAllProducts = (): Promise<ProductModel[]> =>
  defHttp.get<ProductModel[]>({ url: Api.PRODUCT }, { urlPrefix });

export const deleteProductByProdNo = (prodNo: string) =>
  defHttp.delete({ url: `${Api.PRODUCT}/${prodNo}` }, { urlPrefix });

export const uploadProducts: UploadApi = (params: UploadParams) =>
  uploadFile(
    params.fileList,
    params?.multi ?? false,
    {
      url: Api.PRODUCT,
      params: {
        mode: params?.mode ?? 'add',
      },
      onUploadProgress: params?.onUploadProgress,
    },
    {
      urlPrefix: '/api/upload',
    },
  );
