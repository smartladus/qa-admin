export type CategoryModel = {
  id: string;
  region: string[];
  certName: string;
  type: string[];
  compulsory: boolean;
  testDomestic?: boolean;
  holdRequirement?: string;
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
  holdRequirement: '',
  sampleQty: 0,
  timeCost: '',
  cost: 0,
  comments: '',
};
