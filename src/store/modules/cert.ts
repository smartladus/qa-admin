import { defineStore } from 'pinia';
import { store } from '/@/store';
import { getAllCertRegions } from '/@/api/cert/region';
import { RegionModel } from '/@/api/cert/model/regionModel';
import { getAllCertCategories } from '/@/api/cert/category';
import { CategoryModel } from '/@/api/cert/model/categoryModel';
import { getAllCertTasksStats } from '/@/api/cert/task';

export const useCertStore = defineStore({
  id: 'app-cert',
  state: () => {
    return {
      continents: ['亚洲', '北美洲', '南美洲', '欧洲', '大洋洲', '非洲', '南极洲', '全球'],
      certTypes: ['Safety', 'EMC', 'RF', 'ECO'],
      regions: [] as RegionModel[],
      categories: [] as CategoryModel[],
      taskStats: [] as { value: string; label: string; color: string }[],
      certMethodMap: [
        { label: '原型', value: 'ORIG' },
        { label: '派生', value: 'DERI' },
        { label: '自我声明', value: 'SDoC' },
        { label: '变更', value: 'CHAN' },
      ],
    };
  },
  getters: {
    getSelectOptions: (state) => (columnIndex: string) => {
      return state[columnIndex].map((option) => ({ label: option, value: option })) ?? [];
    },
    getRegionOptions: (state) => {
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
    getCategoriesOptionsByRegion: (state) => (region) => {
      return state.categories
        .filter((category) => category.region === region)
        .map((category) => ({ label: category.certName, value: category.certName }));
    },
    getTaskStatByVal: (state) => (val) =>
      state.taskStats.find((taskStat) => taskStat.value === val) ?? {
        label: '未知状态',
        value: 'unknown',
        color: 'default',
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
    async updateTaskStats() {
      try {
        this.taskStats = (await getAllCertTasksStats()).map((stat) => {
          let color;
          switch (stat.type) {
            case 'PROCESSING':
              color = 'processing';
              break;
            case 'ERROR':
              color = 'error';
              break;
            case 'SUCCESS':
              color = 'success';
              break;
            case 'INVALID':
              color = 'gray';
              break;
            default:
              color = 'default';
          }
          return {
            value: stat.state,
            label: stat.label,
            color,
          };
        });
      } catch (error) {
        console.log(error);
      }
    },
    init() {
      console.log('init cert store');
      this.updateRegions();
      this.updateCategories();
      this.updateTaskStats();
    },
  },
});

// Need to be used outside the setup
export function useCertStoreWithOut() {
  return useCertStore(store);
}
