export function isValidUTCDateTime(dateTime: string): boolean {
  const regex =
    /^(?:(?:19|20)\d\d)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(\.\d{3})?$/;
  return regex.test(dateTime);
}
