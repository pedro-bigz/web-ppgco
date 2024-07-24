import { createContext, useState, ReactNode, useEffect } from "react";
import { useUserApi } from "core";
import _isEmpty from "lodash/isEmpty";

interface UserDataType {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date?: Date;
  language: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

interface WithRoles {
  roles?: any[];
}

interface WithPermissions {
  permissions?: string[];
}

export type ApiProfileResponse = UserDataType & WithPermissions & WithRoles;

export type UserProviderValueInterface = {
  user?: Record<string, any>;
  roles: string[];
  permissions: string[];
  resetUser: () => void;
  setUser: (data: ApiProfileResponse) => void;
};

const UserProviderDefaultValues = {
  user: undefined,
  roles: [],
  permissions: [],
  setUser: () => undefined,
  resetUser: () => undefined,
};

export const UserContext = createContext<UserProviderValueInterface>(
  UserProviderDefaultValues
);

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const {
    user: defaultUser,
    roles: defaultRoles,
    permissions: defaultPermissions,
  } = UserProviderDefaultValues;

  const [roles, setRoles] = useState<string[]>(defaultRoles);
  const [permissions, setPermissions] = useState<string[]>(defaultPermissions);
  const [user, setUserData] = useState<UserDataType | undefined>(defaultUser);

  const { data } = useUserApi<ApiProfileResponse>();

  const resetUser = () => setUserData(undefined);
  const setUser = (data: ApiProfileResponse) => {
    const { permissions, roles, ...userData } = data;

    setUserData(userData);
    setRoles(roles ?? []);
    setPermissions(permissions ?? []);
  };

  useEffect(() => {
    if (!data) return;
    setUser(data);
  }, [data]);

  return (
    <UserContext.Provider
      value={{
        user,
        roles,
        permissions,
        setUser,
        resetUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
