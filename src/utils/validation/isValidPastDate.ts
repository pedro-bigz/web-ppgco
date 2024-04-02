import dayjs from "dayjs";

export function isValidPastDate(date?: string | unknown, format?: string) {
  if (typeof date !== "string") return false;

  if (date?.length < 10) return false;

  const dateFormat = format || "DD/MM/YYYY";

  const now = dayjs();
  const dateToCheck = dayjs(date, dateFormat);

  return dateToCheck.isValid() && dateToCheck.isSameOrBefore(now);
}
