import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { useLoadingContext } from "hooks";
// import { Filter } from "components";
import _isEmpty from "lodash/isEmpty";

export type Filter = Record<string, string | number | boolean>;

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
  filters: Filter[];
  totalPages: number;
  totalItems: number;
  isLoading: boolean;
  loadingNumber: number;
  // hasFilters: boolean;
  // numFilters: number;
  orderBy: OrderBy[];
  refetch: RefetchCallback;
  load: () => void;
  stopLoading: () => void;
  removeItem: <T = unknown>(find: (data: T) => any) => void;
  setData: Dispatch<SetStateAction<unknown[]>>;
  setOrderBy: Dispatch<SetStateAction<OrderBy[]>>;
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

export type Finder<T = unknown, R = any> = (data: T) => R;

const ListingContextDefaultValues = {
  data: [],
  fields: {},
  customData: {},
  page: 1,
  search: "",
  filters: [],
  perPage: 10,
  totalPages: 1,
  totalItems: 0,
  isLoading: false,
  hasFilters: false,
  loadingNumber: 0,
  numFilters: 0,
  orderBy: [],
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

export const ListingProvider = ({ children }: ListingProviderProps) => {
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
  const [filters, setFilters] = useState<Filter[]>(defaultFilters);
  const [perPage, setPerPage] = useState<number>(defaultPerPage);
  const [orderBy, setOrderBy] = useState<OrderBy[]>(defaultOrderBy);
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

  // const hasFilters = !_isEmpty(filters);
  // const numFilters = filters.length;

  // setData([
  //   {
  //     id: "1",
  //     name: "Tony Reichert",
  //     role: "CEO",
  //     status: "Active",
  //     teste: "Active",
  //     teste2: "Active",
  //     teste3: "Active",
  //     teste4: "Active",
  //   },
  //   {
  //     id: "2",
  //     name: "Zoey Lang",
  //     role: "Technical Lead",
  //     status: "Paused",
  //     teste: "Active",
  //     teste2: "Active",
  //     teste3: "Active",
  //     teste4: "Active",
  //   },
  //   {
  //     id: "3",
  //     name: "Jane Fisher",
  //     role: "Senior Developer",
  //     status: "Active",
  //     teste: "Active",
  //     teste2: "Active",
  //     teste3: "Active",
  //     teste4: "Active",
  //   },
  //   {
  //     id: "4",
  //     name: "William Howard",
  //     role: "Community Manager",
  //     status: "Vacation",
  //     teste: "Active",
  //     teste2: "Active",
  //     teste3: "Active",
  //     teste4: "Active",
  //   },
  // ]);

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
    // hasFilters,
    // numFilters,
    orderBy,
    setOrderBy,
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
    removeItem,
  };

  return (
    <ListingContext.Provider value={listingData}>
      {children}
    </ListingContext.Provider>
  );
};
