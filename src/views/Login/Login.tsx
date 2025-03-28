import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import { Typography } from "@mui/material";

import { useCheckToken, LogoUFU } from "core";
import { LoginForm } from "./snowflakes";
import { useGetCover } from "./api";

export function LoginPage() {
  const navigate = useNavigate();
  const { data: cover, isLoading: isLoadingCover } = useGetCover();
  const { mutate: apiCheckToken, isPending: isLoading } = useCheckToken();

  const token = sessionStorage.getItem("igreen-token");

  useEffect(() => {
    if (!token) return;

    apiCheckToken(undefined, {
      onSuccess({ hasAccess }) {
        if (hasAccess) navigate("/");
      },
      onError() {
        console.error(`Error in api-check-token`);
      },
    });
  }, [apiCheckToken, navigate, token]);

  if (isLoading || isLoadingCover) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" color="success" />
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="flex w-full lg:w-2/5 flex-col justify-center content-center items-center">
        <img src={LogoUFU} alt="brand" className="mb-8 w-3/5" />
        <Typography fontSize={32} fontWeight={"bold"} className="font-[Nexa]">
          Bem-vindo ao PPGCO
        </Typography>
        <div className="w-full pt-8 px-24">
          <LoginForm />
        </div>
      </div>

      <div className="hidden w-3/5 lg:flex h-1/1 flex-col justify-between bg-gray-100 text-white">
        <div
          className="flex justify-center h-full w-full bg-cover"
          style={{ backgroundImage: `url(${cover})` }}
        >
          {/* {cover && (
            <img src={cover} alt="Logo iGreen Energy" className="w-7/12" />
          )} */}
        </div>
      </div>
    </div>
  );
}
