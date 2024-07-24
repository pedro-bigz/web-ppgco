import { useCallback, useMemo } from "react";
import { useUserContext } from "./useUserContext";

export function usePermissions() {
  const { permissions } = useUserContext();

  const isPermissionsLoaded = useMemo(() => {
    return Boolean(permissions && permissions.length);
  }, [permissions]);

  const can = useCallback(
    (permission: string) =>
      permissions.length && permissions.includes(permission),
    [permissions]
  );

  const cannot = useCallback(
    (permission: string) =>
      permissions.length && !permissions.includes(permission),
    [permissions]
  );

  return { can, cannot, isPermissionsLoaded };
}
