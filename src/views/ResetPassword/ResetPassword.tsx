import { Typography } from "@mui/material";

import { LogoUFU, useParam } from "core";
import { ResetPasswordForm } from "./snowflakes";
import { useGetValidateToken } from "./api";
import { useNavigate } from "react-router-dom";
import { LoadingLogo } from "business";

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const token = useParam("token");

  const { data: isValidToken, isLoading: isLoadingValidation } =
    useGetValidateToken({ token });

  if (isLoadingValidation) {
    return <LoadingLogo />;
  }

  if (!isValidToken) {
    return navigate("/nao-encontrado");
  }

  return (
    <div className="flex h-screen">
      <div className="flex w-full lg:w-2/5 flex-col justify-center content-center items-center">
        <img src={LogoUFU} alt="brand" className="mb-8 w-3/5" />
        <Typography fontSize={32} fontWeight={"bold"} className="font-[Nexa]">
          Redefina sua senha
        </Typography>
        <div className="w-full pt-8 px-24">
          <ResetPasswordForm token={token} />
        </div>
      </div>

      <div className="hidden w-3/5 lg:flex h-1/1 flex-col justify-between bg-gray-100 p-5 text-white">
        <div className="flex justify-center">
          {/* <img src={LogoUFU} alt="Logo iGreen Energy" className="w-7/12" /> */}
        </div>
      </div>
    </div>
  );
}
