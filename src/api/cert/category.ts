import { defHttp } from '/@/utils/http/axios';
import { uploadFile } from '/@/api/sys/upload';
import { UploadApi, UploadParams } from '/@/api/sys/model/uploadModel';
import { CategoryModel } from '/@/api/cert/model/categoryModel';

const urlPrefix = '/api/cert';

enum Api {
  CATEGORY = '/categories',
}

export const getAllCertCategories = (): Promise<CategoryModel[]> =>
  defHttp.get(
    {
      url: Api.CATEGORY,
    },
    { urlPrefix },
  );

export const getCertCategoriesByRegion = (region: string): Promise<CategoryModel[]> =>
  defHttp.get(
    {
      url: Api.CATEGORY,
      params: { region },
    },
    { urlPrefix },
  );

export const uploadCertCategories: UploadApi = (params: UploadParams) =>
  uploadFile(
    params.fileList,
    params?.multi ?? false,
    {
      url: Api.CATEGORY,
      params: {
        mode: params?.mode ?? 'add',
      },
      onUploadProgress: params?.onUploadProgress,
    },
    {
      urlPrefix: '/api/upload',
    },
  );

export const insertCertCategory = (category: CategoryModel) =>
  defHttp.post(
    {
      url: Api.CATEGORY,
      data: category,
    },
    { urlPrefix },
  );

export const updateCertCategory = (category: CategoryModel) =>
  defHttp.put(
    {
      url: `${Api.CATEGORY}/${category.id}`,
      data: category,
    },
    { urlPrefix },
  );

export const deleteCertCategoryById = (id: string) =>
  defHttp.delete({ url: `${Api.CATEGORY}/${id}` }, { urlPrefix });

export const deleteCertCategory = (category: CategoryModel): Promise<CategoryModel> =>
  deleteCertCategoryById(category.id);
