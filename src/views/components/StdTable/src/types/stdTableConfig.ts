import { BasicTableProps } from '/@/components/Table';
import { UploadModalSetting } from '/@/views/components/UploadModal';

export type StdTableConfig<T> = {
  tableProps: Partial<BasicTableProps>;
  uploadSetting?: UploadModalSetting;
  editApi?: {
    insertApi: (param?: Recordable | string) => Promise<any>;
    updateApi: (param?: Recordable | string) => Promise<any>;
    deleteApi: (param?: Recordable | string) => Promise<any>;
  };
  emptyRecord?: T;
  createEditMessage?: (record: Recordable) => string;
};
