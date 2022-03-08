import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

export function useFilter() {
  function numberFormat(val: number): string {
    // 将整数部分逢三一断
    return val ? val.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') : '0';
  }
  function replaceDivider(srcTxt: string, divider: string, newDivider: string): string {
    return (srcTxt && srcTxt.replaceAll?.(divider, newDivider)) ?? '-';
  }
  function dateFormat(dateStr: string, pattern): string {
    return moment(dateStr).format(pattern);
  }
  return {
    numberFormat,
    replaceDivider,
    dateFormat,
  };
}
