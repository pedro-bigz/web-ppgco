import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppLayout } from "layout";
import { tokenStorage } from "services";
import { Spinner } from "@nextui-org/react";
import { useUserContext } from "hooks";

const Loading = (): JSX.Element => (
  <div className="flex items-center justify-center h-screen">
    <Spinner size="lg" color="success" />
  </div>
);

export function AuthGuard(): JSX.Element {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isLogged, setIsLogged } = useUserContext();

  useEffect(() => {
    const token = tokenStorage.getToken();

    if (!token) navigate("/login");

    setIsLogged(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return !isLogged ? <Loading /> : <AppLayout />;
}
