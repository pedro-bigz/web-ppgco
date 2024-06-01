import { dayjs } from "core/dayjs";
import _isEmpty from "lodash/isEmpty";
import _isNumber from "lodash/isNumber";
import _reduce from "lodash/reduce";
import { containsOnlyNumbers } from "utils";

interface SetFormFieldsInterface {
  data: Record<string, any>;
  setForm: any;
}

export function initFormFields({ data, setForm }: SetFormFieldsInterface) {
  if (data && !_isEmpty(data)) {
    const payload: Record<string, string> = _reduce(
      data,
      (accum: any, fieldValue: string, key: string) => {
        if (fieldValue) {
          if (_isNumber(fieldValue)) {
            return { ...accum, [key]: String(fieldValue) };
          }
          if (containsOnlyNumbers(fieldValue)) {
            return { ...accum, [key]: fieldValue };
          }
          // if (dayjs(fieldValue, "DD/MM/YYYY", true).isValid()) {
          //   return { ...accum, [key]: dayjs(fieldValue).format("DD/MM/YYYY") };
          // }
          return { ...accum, [key]: fieldValue };
        }
        return accum;
      },
      {}
    );
    console.log({ payload });
    setForm(payload);
  }
}
