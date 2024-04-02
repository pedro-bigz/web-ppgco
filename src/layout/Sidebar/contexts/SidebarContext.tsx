import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export type SidebarProviderValueInterface = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onOpenChange: () => void;
};

const SidebarProviderDefaultValues = {
  isOpen: false,
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
  const [isOpen, setIsOpen] = useState(SidebarProviderDefaultValues.isOpen);

  const onOpenChange = () => setIsOpen(!isOpen);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        setIsOpen,
        onOpenChange,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
