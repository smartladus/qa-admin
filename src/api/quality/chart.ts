import { defHttp } from '/@/utils/http/axios';

const urlPrefix = '/api/quality/charts';

enum Api {
  DEFECT_AGE = '/defect_age',
  CUM_DEFECT_RATE = '/cumulative_defect_rate',
  CUM_DEFECT_TREND = '/cumulative_defect_trend',
  PROD_DEFECT_TREND = '/product_defect_trend',
}

export const getDefectAge = () => defHttp.get({ url: Api.DEFECT_AGE }, { urlPrefix });

export const getCumulativeDefectRate = () =>
  defHttp.get({ url: Api.CUM_DEFECT_RATE }, { urlPrefix });

export const getCumulativeDefectTrend = () =>
  defHttp.get({ url: Api.CUM_DEFECT_TREND }, { urlPrefix });

export const getProductDefectTrend = (model) =>
  defHttp.get({ url: Api.PROD_DEFECT_TREND, params: { model } }, { urlPrefix });
