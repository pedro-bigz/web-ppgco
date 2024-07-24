import { MouseEvent } from "react";
import { useLocation } from "react-router-dom";
import { useSidebarContext } from "./hooks";
import { ListMenuItemType } from "./Sidebar.mock";
import { useMenuAuthorization } from "./useMenuAuthorization";

export function useSidebar() {
  const { pathname } = useLocation();
  const { sidebarItems } = useMenuAuthorization();
  const { isOpen, setIsOpen, navigate } = useSidebarContext();

  const handleNavigate = (item: ListMenuItemType) => {
    return (e: MouseEvent<HTMLLIElement>) => {
      navigate(item.route);
    };
  };

  const isSomeChildMenuSelected = ({ route, children }: ListMenuItemType) => {
    const format = (str: string) => str + "/";
    const isSelected = (route: string, pathname: string) =>
      route && format(pathname).includes(format(route));

    const hasMatchingChild = children?.some(({ route }) =>
      isSelected(route, pathname)
    );

    return isSelected(route, pathname) || hasMatchingChild;
  };

  return {
    isOpen,
    setIsOpen,
    sidebarItems,
    handleNavigate,
    isSomeChildMenuSelected,
  };
}
