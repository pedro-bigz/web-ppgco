import { ChangeEvent, useRef, useState } from "react";
import { Selection } from "@nextui-org/react";
import _get from "lodash/get";
import { useMapOptions } from "./useMapOptions";

export type OptionKey = string | number;

export type SelectOptionValue = any;
export type SelectOption = Record<string, SelectOptionValue>;

export interface ListBoxTrack {
  label: string;
  key: string;
}

export interface OnChangeAttributes {
  e: ChangeEvent<HTMLSelectElement | HTMLInputElement>;
  options: SelectOption[];
  keys: Selection;
}

export interface ListBoxOnChangeHandler {
  (props: OnChangeAttributes): void;
}

export interface UseListBoxParams {
  name: string;
  options: any[];
  track: ListBoxTrack;
  onChange: ListBoxOnChangeHandler;
}

export function useListBox({
  name,
  track,
  options,
  onChange,
}: UseListBoxParams) {
  const listboxRef = useRef<HTMLInputElement>(null);
  const { optionsMap } = useMapOptions({ options, track });

  const [selected, setSelected] = useState<Selection>();

  const getOption = (key: OptionKey) => {
    return _get(optionsMap, key);
  };

  const emitOnChange = (keys: Selection) => {
    const options = [...keys].reduce((accum: any[], key: OptionKey) => {
      const option = getOption(key as string);

      if (!option) {
        console.error("ListBox item not founded");
        return accum;
      }

      return [...accum, option];
    }, []);

    const listboxRefProp = listboxRef?.current ?? {};

    const e = {
      target: {
        ...listboxRefProp,
        name,
        value: String(keys),
        // value: String([...keys]),
      },
    } as ChangeEvent<HTMLInputElement>;

    onChange?.({ e, options, keys });
  };

  const handleSelectionChange = (keys: Selection) => {
    setSelected(keys);
    emitOnChange(keys);
  };

  return {
    selected,
    listboxRef,
    optionsMap,
    getOption,
    setSelected,
    emitOnChange,
    handleSelectionChange,
  };
}
