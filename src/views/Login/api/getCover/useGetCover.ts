import { useApiQuery } from "core";

export function useGetCover() {
  return useApiQuery<string>({
    endpoint: "/covers/login",
  });
}
