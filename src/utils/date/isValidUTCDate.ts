export function isValidUTCDate(date: string): boolean {
  const regex = /^(?:(?:19|20)\d\d)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  return regex.test(date);
}
