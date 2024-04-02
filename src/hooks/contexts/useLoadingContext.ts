import { useContext } from "react";
import { LoadingContext } from "core";

export const useLoadingContext = () => {
  return useContext(LoadingContext);
};
