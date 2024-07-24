import { useContext } from "react";
import { LoadingContext } from "core";

export function useLoadingContext() {
  return useContext(LoadingContext);
}
