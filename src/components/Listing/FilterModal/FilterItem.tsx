import { useEffect } from "react";
import { Button } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _isEqual from "lodash/isEqual";
import { filterOperators, FilterTypes } from "core";
import { handleClick } from "utils";
import { Autocomplete, TextField, DatePicker } from "components/Form";
import { useFiltersColumn } from "./useFiltersColumn";
import { useFiltersOperator } from "./useFiltersOperator";

export interface FilterItemColumn {
  key: string;
  label: string;
  type: string;
}

export interface FilterItemProps {
  name: string;
  isLast?: boolean;
  columns: FilterItemColumn[];
  onAdd: () => void;
  onRmv: () => void;
}

const contentMasks = {
  number: Number,
  date: "00/00/0000",
  string: String,
  boolean: String,
};

export function FilterItem({
  name,
  columns,
  onAdd,
  onRmv,
  isLast = false,
}: FilterItemProps) {
  const { watch, setValue, formState } = useFormContext();

  console.log({ isLast });

  const watchFieldValue = (...args: string[]) =>
    watch(args.map((arg) => `${name}.${arg}`));

  const [content] = watchFieldValue("content");

  const setFieldValue = (key: string, value: any) => {
    setValue(`${name}.${key}`, value);
  };

  const { column, columnRef } = useFiltersColumn({
    columns,
    setFieldValue,
    watchFieldValue,
  });

  const {
    operator,
    operatorKey,
    operatorList,
    isBetween,
    isInOperation,
    setOperatorList,
    setOperator,
    setOperatorKey,
  } = useFiltersOperator({
    setFieldValue,
    watchFieldValue,
  });

  useEffect(() => {
    if (_isEmpty(formState.errors)) return;
    console.log(formState.errors);
  }, [formState.errors]);

  useEffect(() => {
    if (!column) return;

    const { type } = column;

    if (columnRef.current === type) return;

    const firstLoop = !columnRef.current;

    columnRef.current = type;

    const key = type as FilterTypes | undefined;

    if (!key) {
      setOperatorList([]);
      setOperator(undefined);
      setOperatorKey(undefined);
      return;
    }

    const operators = filterOperators[key];

    setOperatorList(operators);

    if (!operatorKey && (!operator || !firstLoop)) {
      setOperator(operators[0]);
      setOperatorKey(_get(operators, "0.key"));
    }
  }, [column]);

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
        isDisabled={!column || _isEmpty(column)}
        track={{ key: "key", label: "label" }}
      />
      {column?.type !== "date" ? (
        <TextField.Form
          isDisabled={!column || _isEmpty(column)}
          name={`${name}.content[0]`}
          label={isBetween ? "De" : "Pesquisa"}
          mask={
            column?.type in contentMasks && !isInOperation
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
        {!isLast && (
          <Button
            isIconOnly
            variant="flat"
            color="danger"
            isDisabled={isLast}
            onClick={handleClick(onRmv)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        )}
        {isLast && (
          <Button
            isIconOnly
            variant="flat"
            color="primary"
            isDisabled={!isLast}
            onClick={handleClick(onAdd)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        )}
      </div>
    </div>
  );
}
