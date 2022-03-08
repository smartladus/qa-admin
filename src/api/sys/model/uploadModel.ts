import { UploadFile } from 'ant-design-vue/es/upload/interface';

export type UploadParams = {
  fileList: UploadFile[];
  multi?: boolean;
  mode?: string;
  onUploadProgress?: (progressEvent: ProgressEvent) => void;
};

export type UploadApi = (params: UploadParams) => Promise<any>;

export interface UploadApiResult {
  message: string;
  code: number;
  url: string;
}
