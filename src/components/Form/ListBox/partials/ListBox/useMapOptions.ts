import { useEffect, useRef, useState } from "react";
import _get from "lodash/get";
import _isEqual from "lodash/isEqual";
import _mapKeys from "lodash/mapKeys";
import { OptionKey, ListBoxTrack } from "./useListBox";
import { SelectOption } from "core";

export interface UseMapOptionsParams {
  options: SelectOption[];
  track: ListBoxTrack;
}

export function useMapOptions({ options, track }: UseMapOptionsParams) {
  const [optionsMap, setOptionsMap] = useState<Record<OptionKey, any>>({});

  const optionsRef = useRef<SelectOption>([]);

  useEffect(() => {
    if (_isEqual(optionsRef.current, options)) return;

    setOptionsMap(
      _mapKeys(options, (option) => _get(option, track.key) as OptionKey)
    );

    optionsRef.current = options;
  }, [options, track.key]);

  return { optionsMap };
}
