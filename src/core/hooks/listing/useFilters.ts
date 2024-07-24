import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import _omit from "lodash/omit";

import { useFilterStorage } from "./useFilterStorage";

export enum Operations {
  contains = "contains",
  startsWith = "startsWith",
  endsWith = "endsWith",
  notContains = "notLike",

  gt = "gt",
  lt = "lt",
  gte = "gte",
  lte = "lte",
  equals = "eq",
  notEquals = "ne",
  in = "in",
  notIn = "notIn",
  between = "between",
  notBetween = "notBetween",

  and = "and",
  or = "or",
}

export enum StringOperations {
  contains = Operations.contains,
  startsWith = Operations.startsWith,
  endsWith = Operations.endsWith,
  notContains = Operations.notContains,
  equals = Operations.equals,
  notEquals = Operations.notEquals,
  in = Operations.in,
  notIn = Operations.notIn,
}

export enum NumberOperations {
  gt = Operations.gt,
  lt = Operations.lt,
  gte = Operations.gte,
  lte = Operations.lte,
  equals = Operations.equals,
  notEquals = Operations.notEquals,
  in = Operations.in,
  notIn = Operations.notIn,
  between = Operations.between,
  notBetween = Operations.notBetween,
}

export enum DateOperations {
  gt = Operations.gt,
  lt = Operations.lt,
  gte = Operations.gte,
  lte = Operations.lte,
  equals = Operations.equals,
  notEquals = Operations.notEquals,
  in = Operations.in,
  notIn = Operations.notIn,
  between = Operations.between,
  notBetween = Operations.notBetween,
}

export enum BooleanOperations {
  equals = Operations.equals,
  notEquals = Operations.notEquals,
}

export enum LogicOperations {
  and = Operations.and,
  or = Operations.or,
}

export interface FilterData {
  content: any | any[];
  column?: string;
  operator: string;
}

export interface Filters {
  [P: string]: FilterData;
}

export const stringOps = [
  { key: StringOperations.contains, label: "Contém" },
  { key: StringOperations.equals, label: "Igual" },
  { key: StringOperations.startsWith, label: "Começa com" },
  { key: StringOperations.endsWith, label: "Termina com" },
  { key: StringOperations.notContains, label: "Não contém" },
  { key: StringOperations.notEquals, label: "Diferente" },
  { key: StringOperations.in, label: "Contido Em" },
  { key: StringOperations.notIn, label: "Não Contido Em" },
];

export const numberOps = [
  { key: NumberOperations.equals, label: "Igual" },
  { key: NumberOperations.gt, label: "Maior que" },
  { key: NumberOperations.gte, label: "Maior ou igual a" },
  { key: NumberOperations.lt, label: "Menor que" },
  { key: NumberOperations.lte, label: "Menor ou igual a" },
  { key: NumberOperations.notEquals, label: "Diferente" },
  { key: NumberOperations.between, label: "Entre" },
  { key: NumberOperations.notBetween, label: "Não Entre" },
  { key: NumberOperations.in, label: "Contido Em" },
  { key: NumberOperations.notIn, label: "Não Contido Em" },
];

export const dateOps = [
  { key: DateOperations.equals, label: "Igual" },
  { key: DateOperations.gt, label: "Maior que" },
  { key: DateOperations.gte, label: "Maior ou igual a" },
  { key: DateOperations.lt, label: "Menor que" },
  { key: DateOperations.lte, label: "Menor ou igual a" },
  { key: DateOperations.between, label: "Entre" },
  { key: DateOperations.notBetween, label: "Não Entre" },
  { key: DateOperations.notEquals, label: "Diferente" },
];

export const booleanOps = [
  { key: BooleanOperations.equals, label: "Igual" },
  { key: BooleanOperations.notEquals, label: "Diferente" },
];

export enum FilterTypes {
  boolean = "boolean",
  string = "string",
  number = "number",
  date = "date",
}

export const filterOperators = {
  [FilterTypes.date]: dateOps,
  [FilterTypes.string]: stringOps,
  [FilterTypes.number]: numberOps,
  [FilterTypes.boolean]: booleanOps,
};

export function useFilters(defaultFilters: Filters) {
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const { pathname } = useLocation();
  const { filterStorage } = useFilterStorage();

  const numFilters = Object.keys(filters).length;
  const hasFilters = Boolean(numFilters);

  const addFilter = (key: string, filter: FilterData) => {
    setFilters((state) => ({ ...state, [key]: filter }));
  };

  const rmvFilter = (key: string) => {
    setFilters(({ [key]: _, ...state }) => state);
  };

  const resetFilters = () => {
    setFilters({});
  };

  const resetSavedFilters = () => {
    const response = filterStorage.safeReset(pathname);

    if (response.success) {
      toast.success("Filtros removidos com sucesso");
    } else {
      toast.error("Erro ao resetar filtros");
    }
  };

  const saveFilters = () => {
    const response = filterStorage.safeReplace(pathname, filters);

    if (response.success) {
      toast.success("Filtros salvos com sucesso");
    } else {
      toast.error("Erro ao salvar filtros");
    }
  };

  useEffect(() => {
    setFilters(filterStorage.get(pathname));
  }, []);

  return {
    filters,
    numFilters,
    hasFilters,
    saveFilters,
    setFilters,
    addFilter,
    rmvFilter,
    resetFilters,
    resetSavedFilters,
  };
}
