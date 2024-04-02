import { LoadingModal } from "components";
import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export type LoadingContextValueInterface = {
  isLoading: boolean;
  loadingNumber: number;
  load: () => void;
  stopLoading: () => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setLoadingNumber: Dispatch<SetStateAction<number>>;
};

const LoadingContextDefaultValues = {
  isLoading: false,
  loadingNumber: 0,
  load: () => undefined,
  stopLoading: () => undefined,
  setIsLoading: () => undefined,
  setLoadingNumber: () => undefined,
};

export const LoadingContext = createContext<LoadingContextValueInterface>(
  LoadingContextDefaultValues
);

type LoadingProviderProps = {
  children: ReactNode;
};

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const { isLoading: defaultIsLoading, loadingNumber: defaultLoadingNumber } =
    LoadingContextDefaultValues;

  const [isLoading, setIsLoading] = useState<boolean>(defaultIsLoading);
  const [loadingNumber, setLoadingNumber] =
    useState<number>(defaultLoadingNumber);

  const load = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const loadingData = {
    isLoading,
    loadingNumber,
    load,
    stopLoading,
    setIsLoading,
    setLoadingNumber,
  };

  return (
    <LoadingContext.Provider value={loadingData}>
      <LoadingModal isOpen={isLoading} />
      {children}
    </LoadingContext.Provider>
  );
};
