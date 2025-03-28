import { Typography } from "@mui/material";
import { LoadingLogo } from "business";
import { LogoUFU, useUserContext } from "core";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ForgotPasswordForm } from "views/ForgotPassword/snowflakes";

export function ForgotPasswordPage() {
  // const navigate = useNavigate();
  const { user, isLoadingUser } = useUserContext();

  if (isLoadingUser) {
    return <LoadingLogo />;
  }

  useEffect(() => {
    if (!user) return;

    console.log("/login");
  }, [user]);

  return (
    <div className="flex h-screen">
      <div className="flex w-full lg:w-2/5 flex-col justify-center content-center items-center">
        <img src={LogoUFU} alt="brand" className="mb-8 w-3/5" />
        <Typography fontSize={32} fontWeight={"bold"} className="font-[Nexa]">
          Encontre sua conta
        </Typography>
        <div className="w-full pt-8 px-24">
          <ForgotPasswordForm />
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
