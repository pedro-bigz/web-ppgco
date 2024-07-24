import { useCallback, useMemo } from "react";
import _sumBy from "lodash/sumBy";
import { useUserContext } from "./useUserContext";

export function useRoles() {
  const { roles } = useUserContext();

  const isRolesLoaded = useMemo(() => {
    return Boolean(roles && roles.length);
  }, [roles]);

  const hasRoles = useCallback(
    (...roleNames: string[]) => {
      const cb = (role: string) => +roleNames.includes(role);
      return _sumBy(roles, cb) === roleNames.length;
    },
    [roles]
  );

  return { hasRoles, isRolesLoaded };
}
