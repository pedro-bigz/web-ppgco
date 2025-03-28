import { ForgotPasswordPage, LoginPage, NotFoundPage, ResetPasswordPage } from "views";
  
export const publicRoutes = [
  {
      path: "/login",
      element: <LoginPage />
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/esqueci-a-senha",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/redefinir-senha/:token",
    element: <ResetPasswordPage />,
  },
];