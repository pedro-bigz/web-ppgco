import { dayjs } from "core";

export function isValidDate(date?: string | unknown, format?: string) {
  if (typeof date !== "string" || date?.length < 10) {
    return false;
  }

  const dateFormat = format || "DD/MM/YYYY";

  return dayjs(date, dateFormat).isValid();
}
