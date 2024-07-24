import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _isEqual from "lodash/isEqual";
import { filterOperators, Filters, FilterTypes, Operations } from "core";
import {
  Autocomplete,
  TextField,
  AutocompleteOption,
  DatePicker,
} from "components/Form";
import { handleClick } from "utils";

export interface FilterItemColumn {
  key: string;
  label: string;
  type: string;
}

export interface FilterItemProps {
  name: string;
  columns: FilterItemColumn[];
  onAdd: () => void;
  onRmv: () => void;
}

export function FilterItem({ name, columns, onAdd, onRmv }: FilterItemProps) {
  const { watch, setValue, formState } = useFormContext();

  const watchFieldValue = (...args: string[]) =>
    watch(args.map((arg) => `${name}.${arg}`));

  const [operatorList, setOperatorList] = useState<AutocompleteOption[]>([]);
  const [column = {}, operator = {}, content, columnKey, operatorKey] =
    watchFieldValue(
      "column",
      "operator",
      "content",
      "column_key",
      "operator_key"
    );

  const columnRef = useRef<string>();

  const contentMasks = {
    number: Number,
    date: "00/00/0000",
    string: String,
    boolean: String,
  };

  const isBetween = useMemo(() => {
    return (
      operatorKey === Operations.between ||
      operatorKey === Operations.notBetween
    );
  }, [operatorKey]);

  const setFieldValue = (key: string, value: any) => {
    setValue(`${name}.${key}`, value);
  };

  const setColumn = (value: any) => {
    setFieldValue("column", value);
  };

  const setColumnKey = (value: any) => {
    setFieldValue("column_key", value);
  };

  const setOperator = (value: any) => {
    setFieldValue("operator", value);
  };

  const setOperatorKey = (value: any) => {
    setFieldValue("operator_key", value);
  };

  useEffect(() => {
    if (_isEmpty(formState.errors)) return;
    console.log(formState.errors);
  }, [formState.errors]);

  useEffect(() => {
    if (!column) return;

    const { type } = column;

    if (columnRef.current === type) return;

    const firstLoop = !columnRef.current;

    columnRef.current = column.type;

    const key = type as FilterTypes | undefined;

    if (!key) {
      setOperatorList([]);
      setOperator(undefined);
      setOperatorKey(undefined);
      return;
    }

    const operators = filterOperators[key];

    setOperatorList(operators);

    if (!operator || !firstLoop) {
      setOperator(operators[0]);
      setOperatorKey(_get(operators, "0.key"));
    }
  }, [column]);

  useEffect(() => {
    if (!columnKey || column?.key === columnKey) return;

    setColumn(columns.find((col) => col.key === columnKey));
  }, [columnKey]);

  useEffect(() => {
    if (!operatorKey || operator?.key === operatorKey) return;

    setOperator(operatorList.find((op) => op.key === operatorKey));
  }, [operatorKey]);

  useEffect(() => {
    if (isBetween) {
      setFieldValue("content", [content, ""]);
    }
  }, [isBetween]);

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2">
      <Autocomplete.Form
        name={`${name}.column`}
        label="Nome do campo"
        options={columns}
        track={{ key: "key", label: "label" }}
      />
      <Autocomplete.Form
        name={`${name}.operator`}
        label="Operador"
        options={operatorList}
        isDisabled={!column}
        track={{ key: "key", label: "label" }}
      />
      {column?.type !== "date" ? (
        <TextField.Form
          isDisabled={!column}
          name={`${name}.content[0]`}
          label={isBetween ? "De" : "Pesquisa"}
          mask={
            column?.type in contentMasks
              ? contentMasks[column.type as FilterTypes]
              : undefined
          }
        />
      ) : (
        <DatePicker.Form
          isDisabled={!column}
          name={`${name}.content[0]`}
          label={isBetween ? "De" : "Pesquisa"}
        />
      )}
      {isBetween &&
        (column?.type !== "date" ? (
          <TextField.Form
            isDisabled={!column}
            name={`${name}.content[1]`}
            label="Á"
            mask={
              column?.type in contentMasks
                ? contentMasks[column.type as FilterTypes]
                : undefined
            }
          />
        ) : (
          <DatePicker.Form
            name={`${name}.content[0]`}
            label="Á"
            isDisabled={!column}
          />
        ))}
      <div className="flex justify-end gap-2">
        <Button
          isIconOnly
          variant="flat"
          color="danger"
          onClick={handleClick(onRmv)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
        <Button
          isIconOnly
          variant="flat"
          color="primary"
          onClick={handleClick(onAdd)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
    </div>
  );
}
