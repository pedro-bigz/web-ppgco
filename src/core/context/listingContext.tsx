import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { useLoadingContext } from "hooks";
import { Filter } from "components";
import _isEmpty from "lodash/isEmpty";

export type RefetchCallback = (...args: any[]) => void;
export type DBFieldData = { type: string; length: number };

export type ListingContextValueInterface = {
  data: unknown[];
  fields: Record<string, DBFieldData>;
  customData: Record<string, any>;
  perPage: number;
  page: number;
  search: string;
  filters: Filter[];
  totalPages: number;
  totalItems: number;
  isLoading: boolean;
  hasFilters: boolean;
  loadingNumber: number;
  numFilters: number;
  refetch: RefetchCallback;
  load: () => void;
  stopLoading: () => void;
  setData: Dispatch<SetStateAction<unknown[]>>;
  setFields: Dispatch<SetStateAction<Record<string, DBFieldData>>>;
  setCustomData: Dispatch<SetStateAction<Record<string, any>>>;
  setPage: Dispatch<SetStateAction<number>>;
  setSearch: Dispatch<SetStateAction<string>>;
  setFilters: Dispatch<SetStateAction<Filter[]>>;
  setPerPage: Dispatch<SetStateAction<number>>;
  setRefetch: Dispatch<SetStateAction<RefetchCallback>>;
  setTotalPages: Dispatch<SetStateAction<number>>;
  setTotalItems: Dispatch<SetStateAction<number>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setLoadingNumber: Dispatch<SetStateAction<number>>;
};

const ListingContextDefaultValues = {
  data: [],
  fields: {},
  customData: {},
  page: 1,
  search: "",
  filters: [],
  perPage: 25,
  totalPages: 0,
  totalItems: 0,
  isLoading: false,
  hasFilters: false,
  loadingNumber: 0,
  numFilters: 0,
  load: () => undefined,
  stopLoading: () => undefined,
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

export const ListingProvider = ({ children }: ListingProviderProps) => {
  const {
    data: defaultData,
    page: defaultPage,
    search: defaultSearch,
    filters: defaultFilters,
    perPage: defaultPerPage,
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
  const [filters, setFilters] = useState<Filter[]>(defaultFilters);
  const [perPage, setPerPage] = useState<number>(defaultPerPage);
  const [totalPages, setTotalPages] = useState<number>(defaultTotalPages);
  const [totalItems, setTotalItems] = useState<number>(defaultTotalItems);
  const [customData, setCustomData] =
    useState<Record<string, any>>(defaultCustomData);
  const [refetch, setRefetch] = useState<RefetchCallback>(defaultRefetch);
  const {
    isLoading,
    loadingNumber,
    load,
    stopLoading,
    setIsLoading,
    setLoadingNumber,
  } = useLoadingContext();

  const hasFilters = !_isEmpty(filters);
  const numFilters = filters.length;

  const listingData = {
    data,
    page,
    search,
    perPage,
    totalPages,
    totalItems,
    isLoading,
    loadingNumber,
    filters,
    customData,
    fields,
    hasFilters,
    numFilters,
    setFields,
    setCustomData,
    load,
    stopLoading,
    setFilters,
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
  };

  return (
    <ListingContext.Provider value={listingData}>
      {children}
    </ListingContext.Provider>
  );
};
