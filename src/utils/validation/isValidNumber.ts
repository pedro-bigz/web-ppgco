export function isValidNumber(str?: string) {
  if (!str) return false;
  return !isNaN(Number(str.replace(",", ".")));
}
