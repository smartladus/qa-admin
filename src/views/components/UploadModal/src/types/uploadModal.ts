import { UploadApi } from '/@/api/sys/model/uploadModel';

export interface UploadModalSetting {
  title?: string;
  messageOfAdd?: string;
  messageOfReplace?: string;
  templateDownloadUrl?: string;
  uploadApi?: UploadApi;
  onUploadProgress?: PropType<(progressEvent: ProgressEvent) => void>;
}
