import {
  parseAbsoluteToLocal,
  parseDate,
  parseDateTime,
} from "@internationalized/date";
import { dayjs } from "core/dayjs";
import _isEmpty from "lodash/isEmpty";
import _isNumber from "lodash/isNumber";
import _reduce from "lodash/reduce";
import { containsOnlyNumbers, formatFones } from "utils";
import { DateFormat, DateTimeFormat } from "./form.constants";

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
          if (key.startsWith("phone")) {
            return { ...accum, [key]: formatFones(fieldValue) };
          }
          if (_isNumber(fieldValue)) {
            return { ...accum, [key]: String(fieldValue) };
          }
          if (dayjs(fieldValue, DateTimeFormat, true).isValid()) {
            return {
              ...accum,
              [key]: fieldValue,
              [key + "_picker"]: parseAbsoluteToLocal(fieldValue),
            };
          }
          if (dayjs(fieldValue, DateFormat, true).isValid()) {
            return {
              ...accum,
              [key]: fieldValue,
              [key + "_picker"]: parseDate(fieldValue),
            };
          }
          if (containsOnlyNumbers(fieldValue)) {
            return { ...accum, [key]: fieldValue };
          }
          return { ...accum, [key]: fieldValue };
        }
        return accum;
      },
      {}
    );
    setForm(payload);
  }
}
