import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from "react-router-dom";
import { privateRoutes } from "./privateRoutes";
import { publicRoutes } from "./publicRoutes";
import { AuthGuard } from "./AuthGuard";

const privateRouteConfig = {
  element: <AuthGuard />,
  children: [...privateRoutes],
};

const routes = createBrowserRouter([privateRouteConfig, ...publicRoutes]);

export function RouterProvider() {
  return <ReactRouterProvider router={routes} />;
}
