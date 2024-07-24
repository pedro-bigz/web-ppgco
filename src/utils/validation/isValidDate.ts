import { dayjs } from "core";

export function isValidDate(date?: string | unknown, format?: string) {
  console.log({ date });

  if (typeof date !== "string" || date?.length < 10) {
    return false;
  }

  const dateFormat = format || "YYYY-MM-DD";

  return dayjs(date, dateFormat).isValid();
}
