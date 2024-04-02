import { LoginPage, NotFoundPage } from "views";
  
export const publicRoutes = [
  {
      path: "/login",
      element: <LoginPage />
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];