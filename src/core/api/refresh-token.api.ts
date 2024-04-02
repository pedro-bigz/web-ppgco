import toast from "react-hot-toast";
import axios from "axios";
import z from "zod";

import { API_PPGCO_URL } from "core";
import { tokenStorage } from "services";

const refreshTokenSchema = z.object({
  auth: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
});

export type TypeRefreshToken = z.infer<typeof refreshTokenSchema>;

export const refreshTokenApi = (refreshToken: string) =>
  new Promise((resolve, reject) => {
    axios
      .post<any, TypeRefreshToken>(
        `${API_PPGCO_URL}/auth/refresh-token`,
        {
          refreshToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenStorage.getToken()}`,
          },
        }
      )
      .then(({ data }: any) => {
        tokenStorage.setToken(data.auth.accessToken);
        resolve(data);
      })
      .catch((error) => {
        toast.error("Erro ao renovar Token.");
        tokenStorage.resetToken();
        reject(error);
      });
  });
