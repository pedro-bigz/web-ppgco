import { Selection } from "@nextui-org/react";
import { useState } from "react";

type Key = string | number;

export interface UseBulkSelectionParams {
  onSelectKeys?: (keys: Set<Key>) => void;
}

export const useBulkSelection = ({ onSelectKeys }: UseBulkSelectionParams) => {
  const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(new Set([]));

  const handleOnSelectionChange = (keys: Selection) => {
    console.log(keys);
    onSelectKeys?.(new Set([...keys]));
    setSelectedKeys?.(new Set([...keys]));
  };

  return { selectedKeys, setSelectedKeys, handleOnSelectionChange };
};
