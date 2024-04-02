export const formatNumberLength = (
  num: number,
  length: number,
  padding = "0"
) => {
  return String(num).padStart(length, padding);
};
