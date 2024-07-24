import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import _isEmpty from "lodash/isEmpty";
import { FilterData, Filters, useFilters, useLoadingContext } from "../hooks";

export type RefetchCallback = (...args: any[]) => void;
export type DBFieldData = { type: string; length: number };

export type Order = "ASC" | "DESC";
export type OrderBy = [string, Order];

export type ListingContextValueInterface = {
  data: unknown[];
  fields: Record<string, DBFieldData>;
  customData: Record<string, any>;
  perPage: number;
  page: number;
  search: string;
  filters: Filters;
  totalPages: number;
  totalItems: number;
  isLoading: boolean;
  loadingNumber: number;
  hasFilters: boolean;
  numFilters: number;
  orderBy: OrderBy[];
  refetch: RefetchCallback;
  saveFilters: () => void;
  resetSavedFilters: () => void;
  load: () => void;
  stopLoading: () => void;
  addFilter: (key: string, filter: FilterData) => void;
  rmvFilter: (key: string) => void;
  resetFilters: () => void;
  removeItem: <T = unknown>(find: (data: T) => any) => void;
  setData: Dispatch<SetStateAction<unknown[]>>;
  setOrderBy: Dispatch<SetStateAction<OrderBy[]>>;
  setFields: Dispatch<SetStateAction<Record<string, DBFieldData>>>;
  setCustomData: Dispatch<SetStateAction<Record<string, any>>>;
  setPage: Dispatch<SetStateAction<number>>;
  setSearch: Dispatch<SetStateAction<string>>;
  setFilters: Dispatch<SetStateAction<Filters>>;
  setPerPage: Dispatch<SetStateAction<number>>;
  setRefetch: Dispatch<SetStateAction<RefetchCallback>>;
  setTotalPages: Dispatch<SetStateAction<number>>;
  setTotalItems: Dispatch<SetStateAction<number>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setLoadingNumber: Dispatch<SetStateAction<number>>;
};

export type Finder<T = unknown, R = any> = (data: T) => R;

const ListingContextDefaultValues = {
  data: [],
  fields: {},
  customData: {},
  page: 1,
  search: "",
  filters: {},
  perPage: 10,
  totalPages: 1,
  totalItems: 0,
  isLoading: false,
  hasFilters: false,
  loadingNumber: 0,
  numFilters: 0,
  orderBy: [],
  saveFilters: () => undefined,
  resetSavedFilters: () => undefined,
  addFilter: () => undefined,
  rmvFilter: () => undefined,
  resetFilters: () => undefined,
  load: () => undefined,
  setOrderBy: () => undefined,
  stopLoading: () => undefined,
  removeItem: () => undefined,
  refetch: () => undefined,
  setCustomData: () => undefined,
  setIsLoading: () => undefined,
  setLoadingNumber: () => undefined,
  setData: () => undefined,
  setFields: () => undefined,
  setPage: () => undefined,
  setSearch: () => undefined,
  setFilters: () => undefined,
  setPerPage: () => undefined,
  setRefetch: () => undefined,
  setTotalPages: () => undefined,
  setTotalItems: () => undefined,
};

export const ListingContext = createContext<ListingContextValueInterface>(
  ListingContextDefaultValues
);

type ListingProviderProps = {
  children: ReactNode;
};

export function ListingProvider({ children }: ListingProviderProps) {
  const {
    data: defaultData,
    page: defaultPage,
    search: defaultSearch,
    filters: defaultFilters,
    perPage: defaultPerPage,
    orderBy: defaultOrderBy,
    totalPages: defaultTotalPages,
    totalItems: defaultTotalItems,
    customData: defaultCustomData,
    refetch: defaultRefetch,
    fields: defaultFields,
  } = ListingContextDefaultValues;

  const [data, setData] = useState<unknown[]>(defaultData);
  const [fields, setFields] =
    useState<Record<string, DBFieldData>>(defaultFields);
  const [page, setPage] = useState<number>(defaultPage);
  const [search, setSearch] = useState<string>(defaultSearch);
  const [perPage, setPerPage] = useState<number>(defaultPerPage);
  const [orderBy, setOrderBy] = useState<OrderBy[]>(defaultOrderBy);
  const [totalPages, setTotalPages] = useState<number>(defaultTotalPages);
  const [totalItems, setTotalItems] = useState<number>(defaultTotalItems);
  const [customData, setCustomData] =
    useState<Record<string, any>>(defaultCustomData);
  const [refetch, setRefetch] = useState<RefetchCallback>(defaultRefetch);
  const {
    filters,
    numFilters,
    hasFilters,
    saveFilters,
    setFilters,
    addFilter,
    rmvFilter,
    resetFilters,
    resetSavedFilters,
  } = useFilters(defaultFilters);
  const {
    isLoading,
    loadingNumber,
    load,
    stopLoading,
    setIsLoading,
    setLoadingNumber,
  } = useLoadingContext();

  function removeItem<T = unknown>(find: Finder<T>) {
    const list = [...data];
    const index = list.findIndex(find as Finder<unknown>);

    list.splice(index, 1);
    setData(list);
  }

  const listingData = {
    data,
    page,
    search,
    perPage,
    totalPages,
    totalItems,
    isLoading,
    loadingNumber,
    customData,
    fields,
    filters,
    hasFilters,
    numFilters,
    orderBy,
    saveFilters,
    setFilters,
    addFilter,
    rmvFilter,
    resetFilters,
    setOrderBy,
    setFields,
    setCustomData,
    load,
    stopLoading,
    setData,
    setPage,
    setSearch,
    setPerPage,
    setTotalPages,
    setTotalItems,
    setIsLoading,
    setLoadingNumber,
    refetch,
    setRefetch,
    removeItem,
    resetSavedFilters,
  };

  return (
    <ListingContext.Provider value={listingData}>
      {children}
    </ListingContext.Provider>
  );
}
