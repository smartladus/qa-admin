import { defineStore } from 'pinia';
import { store } from '/@/store';
import { getAllCertRegions } from '/@/api/cert/region';
import { RegionModel } from '/@/api/cert/model/regionModel';
import { getAllCertCategories } from '/@/api/cert/category';
import { CategoryModel } from '/@/api/cert/model/categoryModel';

export const useCertStore = defineStore({
  id: 'app-cert',
  state: () => {
    return {
      continents: ['亚洲', '北美洲', '南美洲', '欧洲', '大洋洲', '非洲', '南极洲', '全球'],
      certTypes: ['Safety', 'EMC', 'RF', 'ECO'],
      regions: [] as RegionModel[],
      categories: [] as CategoryModel[],
      certMethodMap: [
        { label: '原型', value: 'ORIG' },
        { label: '派生', value: 'DERI' },
        { label: '自我声明', value: 'SDoC' },
        { label: '变更', value: 'CHAN' },
      ],
      taskStatMap: [
        { label: '新建', value: 'NEW', color: 'blue' },
        { label: '资料准备', value: 'DOC_PREPARE', color: 'blue' },
        { label: '型式试验', value: 'TEST', color: 'blue' },
        { label: '获证', value: 'GET_CERT', color: 'blue' },
        { label: '已完成', value: 'DONE', color: 'green' },
        { label: '已取消', value: 'CANCELLED', color: 'gray' },
      ],
    };
  },
  getters: {
    getSelectOptions: (state) => (columnIndex: string) => {
      return state[columnIndex].map((option) => ({ label: option, value: option })) ?? [];
    },
    getRegionOptions: (state) => {
      console.log('getting region options');
      return state.continents
        .filter((continent) => state.regions.find((region) => region.continent === continent))
        .map((continent) => {
          return {
            label: continent,
            value: continent,
            children: state.regions
              .filter((region) => region.continent === continent)
              .map((region) => {
                return {
                  label: region.country,
                  value: region.country,
                  abbr: region.abbr,
                };
              }),
          };
        });
    },
    getCertMethodLabelByVal: (state) => (val) =>
      state.certMethodMap.find((method) => method.value === val)?.label ?? '未知获证方式',
    getTaskStatByVal: (state) => (val) =>
      state.taskStatMap.find((method) => method.value === val) ?? {
        label: '未知状态',
        color: 'error',
      },
    getCategoriesOptionsByRegion: (state) => (region) => {
      return state.categories
        .filter((category) => category.region === region)
        .map((category) => ({ label: category.certName, value: category.certName }));
    },
  },
  actions: {
    async updateRegions() {
      try {
        this.regions = await getAllCertRegions();
      } catch (error) {
        console.log(error);
      }
    },
    async updateCategories() {
      try {
        this.categories = await getAllCertCategories();
      } catch (error) {
        console.log(error);
      }
    },
    init() {
      console.log('init cert store');
      this.updateRegions();
      this.updateCategories();
    },
  },
});

// Need to be used outside the setup
export function useCertStoreWithOut() {
  return useCertStore(store);
}
