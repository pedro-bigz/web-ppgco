import { AutocompleteOption, Operations } from "core";
import { useEffect, useMemo, useState } from "react";
import { GenericFunction } from "utils";

export interface UseFiltersOperatorParams {
  watchFieldValue: GenericFunction;
  setFieldValue: GenericFunction;
}

export function useFiltersOperator({
  watchFieldValue,
  setFieldValue,
}: UseFiltersOperatorParams) {
  const [operatorList, setOperatorList] = useState<AutocompleteOption[]>([]);
  const [operator = {}, operatorKey] = watchFieldValue(
    "operator",
    "operator_key"
  );

  const setOperator = (value: any) => {
    setFieldValue("operator", value);
  };

  const setOperatorKey = (value: any) => {
    setFieldValue("operator_key", value);
  };

  const isBetween = useMemo(() => {
    return (
      operatorKey === Operations.between ||
      operatorKey === Operations.notBetween
    );
  }, [operatorKey]);

  const isInOperation = useMemo(() => {
    return operatorKey === Operations.in || operatorKey === Operations.notIn;
  }, [operatorKey]);

  useEffect(() => {
    if (!operatorKey || !operatorList || operator?.key === operatorKey) return;

    const op = operatorList.find((op) => op.key === operatorKey);

    if (!op) return;

    setOperator(op);
  }, [operatorKey, operatorList]);

  return {
    operator,
    operatorList,
    isBetween,
    isInOperation,
    operatorKey,
    setOperatorList,
    setOperator,
    setOperatorKey,
  };
}
