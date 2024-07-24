import { useEffect, useState } from "react";
import { Select, SelectItem, Selection } from "@nextui-org/react";
import _isEmpty from "lodash/isEmpty";
import { perPageItems, PerPageSelectionItems } from "./PerPageSelect.mock";
import { useListingContext } from "core";

interface PerPageSelectInterface {
  label?: string;
  className?: string;
  defaultValue?: PerPageSelectionItems;
}

export function PerPageSelect({
  className,
  label = "",
}: PerPageSelectInterface) {
  const { perPage, setPerPage } = useListingContext();
  const [selectedKeys, setSelectedKeys] = useState<Selection>();

  useEffect(() => {
    if (_isEmpty(selectedKeys)) return;

    const [index] = selectedKeys || [];
    const selected = perPageItems[+index];

    setPerPage(selected.value);
  }, [setPerPage, selectedKeys]);

  const defaultSelectedKey = perPageItems.findIndex(
    (item) => item.value === perPage
  );

  return (
    <div className={className}>
      <Select
        aria-labelledby="items per page"
        onSelectionChange={setSelectedKeys}
        items={perPageItems}
        label={label}
        selectedKeys={selectedKeys}
        disallowEmptySelection={true}
        defaultSelectedKeys={[
          defaultSelectedKey > -1 ? String(defaultSelectedKey) : "5",
        ]}
        size="sm"
        classNames={{
          base: "w-auto",
          mainWrapper: "w-[70px]",
          trigger: "bg-white border-1 border-[#DEDEDE!important]",
        }}
      >
        {(column) => (
          <SelectItem key={column.key} textValue={String(column.value)}>
            <div className="flex gap-2 items-center">
              <span className="text-small">{column.value}</span>
            </div>
          </SelectItem>
        )}
      </Select>
    </div>
  );
}
