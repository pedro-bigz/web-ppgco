type NumberFormatDefaultOptions = Pick<
  Intl.NumberFormatOptions,
  "currency" | "style"
>;

export const numberFormat = (num: number, options = {}, locale = "pt-BR") => {
  const defaultOptions: NumberFormatDefaultOptions = {
    currency: "BRL",
    style: "decimal",
  };
  return new Intl.NumberFormat(locale, {
    ...defaultOptions,
    ...options,
  }).format(num);
};
