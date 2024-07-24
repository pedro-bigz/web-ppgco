import { useMemo } from "react";
import { SIDEBAR_MENU_ITENS } from "./Sidebar.mock";
import { usePermissions } from "core";

export function useMenuAuthorization() {
  const { can } = usePermissions();

  const sidebarItems = useMemo(() => {
    return SIDEBAR_MENU_ITENS.filter(({ permission }) => can(permission));
  }, [can]);

  return { sidebarItems };
}
