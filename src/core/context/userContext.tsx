import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export type UserProviderValueInterface = {
  user: Record<string, any>;
  setUser: Dispatch<SetStateAction<Record<string, any>>>;
};

const UserProviderDefaultValues = {
  user: {},
  setUser: () => undefined,
};

export const UserContext = createContext<UserProviderValueInterface>(
  UserProviderDefaultValues
);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState(UserProviderDefaultValues.user);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
