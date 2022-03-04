import { UploadFile } from 'ant-design-vue/es/upload/interface';

export type UploadApi = (
  fileList: UploadFile[],
  multi?: boolean,
  mode?: string,
  onUploadProgress?: (progressEvent: ProgressEvent) => void,
) => Promise<any>;

export interface UploadSetting {
  title?: string;
  messageOfAdd?: string;
  messageOfReplace?: string;
  templateDownloadUrl?: string;
  uploadApi?: UploadApi;
  onUploadProgress?: PropType<(progressEvent: ProgressEvent) => void>;
}
