import { useEffect, useMemo, useRef } from "react";
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
    if (tokenStorage.hasToken()) {
      tokenStorage.isValidToken().then((response) => {
        console.log("isValid", response);
        setIsLogged(response);

        if (!response) {
          tokenStorage.resetAllToken();
          navigate("/login");
        }
      });

      return;
    }

    setIsLogged(false);
    navigate("/login");
  }, [pathname, isLogged]);

  const Component = useMemo(() => {
    return !isLogged ? Loading : AppLayout;
  }, [isLogged]);

  return <Component />;
}
