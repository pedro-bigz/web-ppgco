import * as dayjs from 'dayjs';
import _isEmpty from 'lodash/isEmpty';
import _isNumber from 'lodash/isNumber';
import { containsOnlyNumbers } from 'utils';

interface SetFormFieldsInterface {
  data: Record<string, any>,
  setValue: (key: string, value: string) => void
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
        if (containsOnlyNumbers(fieldValue)) {
          setValue(key, fieldValue);
          return;
        }
        if (dayjs(fieldValue).isValid()) {
          setValue(key, dayjs(fieldValue).format('DD/MM/YYYY'));
          return;
        }
        setValue(key, fieldValue);
      }
    })
  }
}