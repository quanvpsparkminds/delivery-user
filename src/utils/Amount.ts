import BigNumber from "bignumber.js";

/**
 * Regex that we use in this helper
 */
const regex = {
  /**
   * replace all the "," with "."
   */
  replaceCommas: /\,/g,
  /**
   * only accept number
   */
  onlyNumber: /^[0-9]*$/,
  /**
   * only accept number and "."
   */
  onlyNumberAndDot: /[^0-9.]/g,
  /**
   * thousan format
   */
  thousan: /\B(?=(\d{3})+(?!\d))/g,
};

/**
 *
 * @param text formated amount
 * @returns amount just include number and "."
 * @example 1,234.56 => 1234.56
 */
const clean = (text: string = "") => text.replace(regex.onlyNumberAndDot, "");

/**
 *
 * @param text raw amount
 * @returns amount includes comma every 3 chars
 * @example 1234567 => 1,234,567
 */
const format = (text: string = "") => {
  // Split the cleaned text into integer and fractional parts
  const [integerPart, fractionalPart] = text.split(".");

  // Format the integer part with commas
  const formattedInteger = integerPart.replace(regex.thousan, ",");

  return text?.includes(".")
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

type TFormatAmountParamsOptions = {
  maxDecimals: number;
  maxAmount: number;
};

/**
 *
 * @param prev the previous value (formated)
 * @param next the value that user just entered
 * @param maxDecimals the maximum chars after the "."
 * @param maxAmount the maximum value that user can enter
 * @returns the value after fully formated
 */
const formatAmount = (
  prev: string = "",
  next: string = "",
  { maxDecimals, maxAmount }: TFormatAmountParamsOptions
) => {
  if (!next) return "";

  // There are some keyboard that the decimal symbol is not ".", it's "," so we need to check and add the "." to the end of text if needed
  const isNeedToAddDotToTheEnd = next.length > 1 && next.endsWith(",");

  next = clean(next);

  if (isNeedToAddDotToTheEnd) next += ".";

  // nếu ký tự đầu tiên ko phải là số thì return
  // if the first letter is not number then return
  if (!regex.onlyNumber.test(next.charAt(0))) {
    return prev;
  }

  // nếu ký tự đầu tiên là 0 và ký tự liền kề nó là số và giá trị mới có lengh > 1 thì xóa số 0 ở đầu đi
  // if the first letter is 0 and the next letter is number and the length of next value is greather than 1 then remove the leading zero
  if (
    next.charAt(0) === "0" &&
    regex.onlyNumber.test(next.charAt(1)) &&
    next.length > 1
  ) {
    return next.slice(1, next.length);
  }

  // thay toàn bộ "," thành "."
  // replace all the "," with "."
  next = next.replace(regex.replaceCommas, ".");

  // if the next value is greater than max amount then return the previous value
  if (BigNumber(next).isGreaterThan(maxAmount)) {
    return format(prev);
  }

  // nếu giá trị mới có dấu chấm ở cuối thì trả về giá trị mới
  // if the previous value doesn't include "." and the next value includes "." or the next value includes "." at the end then return next value
  if (next.charAt(next.length - 1) === "." && maxDecimals !== 0) {
    return format(next);
  }

  if (next?.includes(".") && next?.split(".")?.[1]?.length > maxDecimals) {
    return prev;
  }

  return format(next);
};

export type Numberish = string | number | BigNumber;

const formatCurrency = (
  number?: Numberish | null,
  decimal = 2,
  mode: "format" | "toFixed" = "format"
) => {
  if (!number) return "--";
  const value = number instanceof BigNumber ? number : new BigNumber(number);
  const valueString =
    mode === "format" ? value.toFormat(decimal) : value.toFixed(decimal);
  return valueString.replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "");
};

/**
 * Format amount with currency symbol
 * @param amount - The amount to format
 * @param currencySymbol - Currency symbol (e.g., "$", "€", "₨")
 * @param decimal - Number of decimal places
 * @param showSign - Whether to show +/- sign for positive/negative amounts
 * @returns Formatted amount string with currency symbol
 * @example formatAmountWithSymbol(1000, "S$", 2, true) => "S$1,000.00"
 * @example formatAmountWithSymbol(-1000, "€", 2, true) => "-€1,000.00"
 */
const formatAmountWithSymbol = (
  amount: number,
  currencySymbol: string,
  decimal: number = 2,
  showSign: boolean = true
): string => {
  const formattedAmount = formatCurrency(amount, decimal);

  let sign = "";
  if (showSign && amount < 0) {
    sign = "-";
  }

  return `${sign}${currencySymbol} ${formattedAmount}`;
};

/**
 * Format exchange rate between two currencies
 * @param fromSymbol - Source currency symbol
 * @param toSymbol - Target currency symbol
 * @param rate - Exchange rate
 * @param decimal - Number of decimal places for rate
 * @returns Formatted rate string
 * @example formatExchangeRate("S$", "₨", 99.98, 2) => "1S$ = 99.98₨"
 */
const formatExchangeRate = (
  fromSymbol: string,
  toSymbol: string,
  rate: number,
  decimal: number = 2
): string => {
  const formattedRate = formatCurrency(rate, decimal);
  return `1${fromSymbol} = ${formattedRate}${toSymbol}`;
};

const formatMoney = (amount: number) => {
  return amount.toLocaleString("vi-VN") + " VNĐ";
};

export const amountUtils = {
  clean,
  format,
  formatAmount,
  formatCurrency,
  formatAmountWithSymbol,
  formatExchangeRate,
  formatMoney,
};
