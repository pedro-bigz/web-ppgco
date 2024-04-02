import { ReactNode } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";

interface ReactQueryProviderProps {
  children: ReactNode;
}

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
