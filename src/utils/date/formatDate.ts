import dayjs from "dayjs";

export const formatDate = (date: string | undefined, format = 'DD/MM/YYYY') => {
  if(!date) return;
  const dayJsInstance = dayjs(date);

  if (!dayJsInstance.isValid()) {
    return '';
  }

  return dayJsInstance.format(format);
}