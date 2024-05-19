import { useUserApi } from "hooks";
import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

export type UserProviderValueInterface = {
  user: Record<string, any>;
  setUser: Dispatch<SetStateAction<Record<string, any>>>;
  isLogged: boolean;
  setIsLogged: Dispatch<SetStateAction<boolean>>;
};

const UserProviderDefaultValues = {
  user: {},
  setUser: () => undefined,
  isLogged: false,
  setIsLogged: () => undefined,
};

export const UserContext = createContext<UserProviderValueInterface>(
  UserProviderDefaultValues
);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [isLogged, setIsLogged] = useState(UserProviderDefaultValues.isLogged);
  const [user, setUser] = useState(UserProviderDefaultValues.user);

  const { data } = useUserApi();

  useEffect(() => setUser(data as Record<string, any>), [data]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLogged,
        setIsLogged,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
