import { useContext } from "react";
import { UserContext } from "core";

export const useUserContext = () => {
  return useContext(UserContext);
};
