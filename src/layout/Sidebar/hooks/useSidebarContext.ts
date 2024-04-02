import { useContext } from "react";
import { SidebarContext } from "../contexts";

export function useSidebarContext() {
  return useContext(SidebarContext);
}
