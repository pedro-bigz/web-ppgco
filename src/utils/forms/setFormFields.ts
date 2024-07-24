import dayjs from "dayjs";
import _isEmpty from "lodash/isEmpty";
import _isNumber from "lodash/isNumber";
import { containsOnlyNumbers } from "utils";
import { DateFormat, DateTimeFormat } from "./form.constants";
import { parseAbsoluteToLocal, parseDate } from "@internationalized/date";

interface SetFormFieldsInterface {
  data: Record<string, any | any[]>;
  setValue: (key: string, value: string) => void;
}

export function setFormFields({ data, setValue }: SetFormFieldsInterface) {
  if (data && !_isEmpty(data)) {
    Object.keys(data).map((key: string) => {
      const fieldValue = data[key];
      if (fieldValue) {
        if (_isNumber(fieldValue)) {
          setValue(key, String(fieldValue));
          return;
        }
        if (dayjs(fieldValue, DateTimeFormat, true).isValid()) {
          setValue(key, fieldValue);
          setValue(key + "_picker", parseAbsoluteToLocal(fieldValue) as any);
        }
        if (dayjs(fieldValue, DateFormat, true).isValid()) {
          setValue(key, fieldValue);
          setValue(key + "_picker", parseDate(fieldValue) as any);
        }
        if (containsOnlyNumbers(fieldValue)) {
          setValue(key, fieldValue);
          return;
        }
        setValue(key, fieldValue);
      }
    });
  }
}
