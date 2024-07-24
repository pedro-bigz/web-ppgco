import toast from "react-hot-toast";
import z from "zod";

import { tokenStorage } from "services";
import { axiosAuth } from "./auth.api";

const refreshTokenSchema = z.object({
  auth: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
});

export type TypeRefreshToken = z.infer<typeof refreshTokenSchema>;

export const refreshTokenApi = (refreshToken: string, headers: Headers) =>
  new Promise((resolve, reject) => {
    axiosAuth
      .post<any, TypeRefreshToken>(
        "/refresh-token",
        { refreshToken },
        { headers: Object.fromEntries(headers.entries()) }
      )
      .then(({ data }: any) => {
        tokenStorage.setToken(data.auth.accessToken);
        headers.append("Authorization", tokenStorage.getAuthorization());

        resolve(data);
      })
      .catch((error) => {
        toast.error("Erro ao renovar Token.");
        tokenStorage.resetToken();
        reject(error);
      });
  });
