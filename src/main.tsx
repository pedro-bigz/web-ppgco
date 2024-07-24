import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { Toaster } from "react-hot-toast";

import { RouterProvider } from "routes";
import { LoadingProvider, ReactQueryProvider, UserProvider } from "core";

import "./fonts.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <I18nProvider locale="pt-BR">
        <ReactQueryProvider>
          <LoadingProvider>
            <UserProvider>
              <RouterProvider />
            </UserProvider>
          </LoadingProvider>

          <Toaster position="top-right" />
        </ReactQueryProvider>
      </I18nProvider>
    </NextUIProvider>
  </React.StrictMode>
);
