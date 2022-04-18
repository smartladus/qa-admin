import { Dayjs } from 'dayjs';

export type CertificateModel = {
  id: string;
  supplier: string;
  supModel: string;
  jvModel: string;
  certNo: string;
  validDate: Dayjs;
  expireDate: Dayjs | undefined;
  url: {
    certificate: string;
    report?: string[];
  };
  history: {
    validDate: Dayjs;
    expireDate: Dayjs | undefined;
    url: {
      certificate: string;
      report?: string[];
    };
  }[];
};
