import { useApiQuery } from "./useApiQuery";

export const useUserApi = () => {
  return useApiQuery({
    endpoint: "/auth/profile",
  });
};
