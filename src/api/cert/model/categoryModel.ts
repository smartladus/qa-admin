export type CategoryModel = {
  id: string;
  region: string[];
  certName: string;
  type: string[];
  compulsory: boolean;
  testDomestic?: boolean;
  holder?: string;
  sampleQty?: number;
  timeCost?: string;
  cost?: number;
  comments?: string | string[];
};

export const emptyCategoryModel: CategoryModel = {
  id: 'new',
  region: [],
  certName: '',
  type: [],
  compulsory: false,
  testDomestic: false,
  holder: '',
  sampleQty: 0,
  timeCost: '',
  cost: 0,
  comments: '',
};
