import { useEffect, useMemo, useState } from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  ButtonProps,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import _isEmpty from "lodash/isEmpty";
import _mapKeys from "lodash/mapKeys";
import { Filters } from "core";
import { FilterIcon } from "assets";
import { handleClick } from "utils";
import { Form } from "components/Form";
import { FilterItem } from "./FilterItem";
import { schema } from "./Filter.schema";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";

export interface FilterModalProps {
  label: string;
  columns: { key: string; label: string; type: string }[];
  defaultFilters?: Filters;
  onFilter: (filters: Filters) => void;
  onSave: () => void;
  onReset: () => void;
  buttonProps?: Pick<ButtonProps, "variant" | "color" | "radius" | "className">;
}

const defaultFilterForm = [
  {
    column: "",
    operator: "",
    content: [""],
  },
];

export function FilterPopover({
  label,
  columns = [],
  buttonProps,
  defaultFilters = {},
  onSave,
  onReset: onResetSaveds,
  onFilter,
}: FilterModalProps) {
  const [isOpen, onOpenChange] = useState(false);

  const onClose = () => onOpenChange(false);

  const safeDefaultFilters = useMemo(() => {
    return defaultFilters && !_isEmpty(defaultFilters)
      ? [...Object.values(defaultFilters)]
      : defaultFilterForm;
  }, [defaultFilters]);

  const formProps = useForm({
    resolver: zodResolver(schema),
  });

  const { control, reset, handleSubmit } = formProps;
  const { fields, append, remove } = useFieldArray({
    name: "filters",
    control,
    // shouldUnregister: true,
  });

  const onAdd = () =>
    append({
      column: "",
      operator: "",
      content: [""],
    });

  const onRmv = (index: number) => {
    return () => remove(index);
  };

  const onReset = () => {
    onClose();
    onFilter({});
    onResetSaveds();
  };

  const onSubmit = ({ filters }: FieldValues) => {
    onFilter(_mapKeys(filters, "column"));
    onClose();
  };

  useEffect(() => {
    reset({
      filters: safeDefaultFilters.map((filter) => ({
        column_key: filter.column,
        operator_key: filter.operator,
        content: filter.content,
      })),
    });
  }, [safeDefaultFilters]);

  return (
    <Popover
      isOpen={isOpen}
      placement="bottom-end"
      onOpenChange={onOpenChange}
      classNames={{ content: "p-0" }}
    >
      <PopoverTrigger>
        <Button
          radius={buttonProps?.radius ?? "full"}
          color={buttonProps?.color ?? "primary"}
          variant={buttonProps?.variant ?? "bordered"}
          className={classnames(
            buttonProps?.className,
            "px-5 font-bold font-sfPro"
          )}
          startContent={<FilterIcon color="text-primary" />}
        >
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form {...formProps} onSubmit={handleSubmit(onSubmit)}>
          <Card
            classNames={{ header: "px-5", body: "px-5", footer: "px-5 pb-5" }}
          >
            <CardHeader className="flex flex-col items-start gap-1">
              <div className="flex justify-between w-full">
                <h3 className="text-xl font-bold">Filtrar</h3>
                <Button
                  isIconOnly
                  radius="full"
                  type="button"
                  variant="flat"
                  onClick={handleClick(onSave)}
                >
                  <FontAwesomeIcon icon={faSave} />
                </Button>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="flex flex-col gap-3">
                {fields.map((field, index) => (
                  <FilterItem
                    key={field.id}
                    name={`filters.${index}`}
                    columns={columns}
                    onAdd={onAdd}
                    onRmv={onRmv(index)}
                  />
                ))}
                <div className="flex gap-2 justify-end">
                  <Button
                    type="button"
                    color="danger"
                    variant="light"
                    className="px-10"
                    onClick={handleClick(onReset)}
                  >
                    Resetar Filtros
                  </Button>
                </div>
              </div>
            </CardBody>
            <CardFooter className="flex justify-end gap-3">
              <Button
                type="button"
                color="danger"
                variant="solid"
                className="px-10"
                onClick={handleClick(onClose)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                color="primary"
                className="px-10"
                variant="solid"
              >
                Filtrar
              </Button>
            </CardFooter>
          </Card>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
