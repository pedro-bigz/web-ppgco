import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

export type SidebarProviderValueInterface = {
  isOpen: boolean;
  navigate: NavigateFunction;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onOpenChange: () => void;
};

const SidebarProviderDefaultValues = {
  isOpen: false,
  navigate: () => undefined,
  setIsOpen: () => undefined,
  onOpenChange: () => undefined,
};

export const SidebarContext = createContext<SidebarProviderValueInterface>(
  SidebarProviderDefaultValues
);

type SidebarProviderProps = {
  children: ReactNode;
};

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(SidebarProviderDefaultValues.isOpen);

  const onOpenChange = () => setIsOpen(!isOpen);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        navigate,
        setIsOpen,
        onOpenChange,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
