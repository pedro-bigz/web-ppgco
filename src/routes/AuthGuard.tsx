import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppLayout } from "layout";
import { tokenStorage } from "services";
import { Spinner } from "@nextui-org/react";
import { useNavigationStore } from "core";

type Status = {
  pathname: string | null;
  isLogged: boolean | null;
};

const Loading = (): JSX.Element => (
  <div className="flex items-center justify-center h-screen">
    <Spinner size="lg" color="success" />
  </div>
);

let renderCount = 0;

export function AuthGuard(): JSX.Element {
  const { navigate } = useNavigationStore();
  const { pathname } = useLocation();
  const [isLogged, setIsLogged] = useState<boolean>(false);

  renderCount++;

  const statusRef = useRef<Status>({ pathname: null, isLogged: null });

  useLayoutEffect(() => {
    // console.log({ renderCount, pathname });
    const ref = statusRef.current;

    if (ref.pathname === pathname && ref.isLogged === isLogged) {
      return;
    }

    statusRef.current = { pathname, isLogged };

    if (tokenStorage.hasToken()) {
      tokenStorage.isValidToken().then((response) => {
        // console.log({ response });
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
  }, [pathname]);

  return (
    <>
      <div className="relative">
        <span className="counter absolute bottom-0 right-2">
          Render Count: {renderCount}
        </span>
        {!isLogged ? <Loading /> : <AppLayout />}
      </div>
    </>
  );
}
