import { UploadApiResult } from './model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import { RequestOptions, UploadFileParams } from '/#/axios';
import { useGlobSetting } from '/@/hooks/setting';
import { UploadFile } from 'ant-design-vue/es/upload/interface';
import { ContentTypeEnum } from '/@/enums/httpEnum';
import { AxiosRequestConfig } from 'axios';

const { uploadUrl = '' } = useGlobSetting();

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl,
      onUploadProgress,
    },
    params,
  );
}

export const uploadFile = (
  fileList: UploadFile[],
  multi: boolean,
  config: AxiosRequestConfig,
  options?: RequestOptions,
) => {
  const formData = new window.FormData();
  multi
    ? fileList.forEach((file) => formData.append('files[]', file.originFileObj))
    : formData.append('file', fileList[0].originFileObj);
  return defHttp.post(
    {
      ...config,
      data: formData,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA,
        // @ts-ignore
        ignoreCancelToken: true,
      },
    },
    options,
  );
};
