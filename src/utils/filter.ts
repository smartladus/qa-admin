import dayjs, { Dayjs } from 'dayjs';

export function numberFormat(val: string | number, fractionDigits = 0): string {
  if (isNaN(Number(val)) || Number(val) === 0) return '-';
  const num = `${Number(val).toFixed(fractionDigits)}`;
  // 将整数部分逢三一断
  const integer = num.split('.')[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  // 取出小数点部分
  const decimal = num.lastIndexOf('.') === -1 ? '' : num.split('.')[1];
  return fractionDigits === 0 ? `${integer}` : `${integer}.${decimal}`;
}

export function replaceDivider(srcTxt: string, divider: string, newDivider: string): string {
  return (srcTxt && srcTxt.replaceAll?.(divider, newDivider)) ?? '-';
}

export function dateFormat(date: Dayjs, pattern: string): string {
  const res = dayjs(date).format(pattern);
  return res === 'Invalid Date' ? '-' : res;
}

export function percent(val: string | number, fractionDigits = 0) {
  return !isNaN(Number(val)) ? `${(Number(val) * 100).toFixed(fractionDigits)}%` : 'N/A';
}
