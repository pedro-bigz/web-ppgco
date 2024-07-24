import { useEffect, useRef, useState } from "react";
import _get from "lodash/get";
import _isEqual from "lodash/isEqual";
import _mapKeys from "lodash/mapKeys";
import { OptionKey, SelectOption, Track } from "./useSelectOptions";

export interface UseMapOptionsParams {
  options: SelectOption[];
  track: Track;
}

export function useMapOptions({ options, track }: UseMapOptionsParams) {
  const [optionsMap, setOptionsMap] = useState<Record<OptionKey, any>>({});

  const optionsRef = useRef<SelectOption>([]);

  useEffect(() => {
    if (_isEqual(optionsRef.current, options)) return;

    setOptionsMap(
      _mapKeys(
        options,
        (option: SelectOption) => _get(option, track.key) as OptionKey
      )
    );

    optionsRef.current = options;
  }, [options]);

  return { optionsMap };
}
