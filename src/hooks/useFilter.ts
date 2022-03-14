import dayjs, { Dayjs } from 'dayjs';

export function useFilter() {
  function numberFormat(val: number): string {
    // 将整数部分逢三一断
    return val ? val.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') : '0';
  }
  function replaceDivider(srcTxt: string, divider: string, newDivider: string): string {
    return (srcTxt && srcTxt.replaceAll?.(divider, newDivider)) ?? '-';
  }
  function dateFormat(date: Dayjs, pattern: string): string {
    const res = dayjs(date).format(pattern);
    return res === 'Invalid Date' ? '-' : res;
  }
  return {
    numberFormat,
    replaceDivider,
    dateFormat,
  };
}
