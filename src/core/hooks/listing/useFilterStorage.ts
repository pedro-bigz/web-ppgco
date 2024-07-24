import { FilterStorage } from "./FilterStorage";

export function useFilterStorage(storage = sessionStorage) {
  const filterStorage = new FilterStorage(storage);

  return { filterStorage };
}
