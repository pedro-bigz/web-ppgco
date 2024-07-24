import { useRef } from "react";
import { useApiQuery } from "./useApiQuery";

export function useUserApi<ResponseDto>() {
  const isDisabled = useRef(
    location.href.replace(location.search, "").endsWith("/login")
  );

  return useApiQuery<ResponseDto>({
    endpoint: "/auth/profile",
    options: {
      enabled: !isDisabled.current,
    },
  });
}
