import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";

import { RouterProvider } from "routes";
import { LoadingProvider, ReactQueryProvider, UserProvider } from "core";

import "./fonts.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <ReactQueryProvider>
        <LoadingProvider>
          <UserProvider>
            <RouterProvider />
          </UserProvider>
        </LoadingProvider>
      </ReactQueryProvider>
    </NextUIProvider>
  </React.StrictMode>
);
