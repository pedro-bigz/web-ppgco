import { useContext } from "react";
import { UserContext } from "core";

export function useUserContext() {
  return useContext(UserContext);
}
