export const moneyToDecimal = (val: string) => {
  return +val.replace(".", "").replace(",", ".");
};
