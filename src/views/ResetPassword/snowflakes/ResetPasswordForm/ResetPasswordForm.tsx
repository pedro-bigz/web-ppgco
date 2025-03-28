import { useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, TextField } from "components";
import { tokenStorage } from "services";
import {
  usePostResetPassword,
  resetPasswordFormSchema,
  ResetPasswordFormDto,
} from "views/ResetPassword/api";
import { useUserContext } from "core";
import toast from "react-hot-toast";

interface ResetPasswordForm {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordForm) {
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const formProps = useForm({
    mode: "onSubmit",
    resolver: zodResolver(resetPasswordFormSchema),
  });

  const { mutate: onSubmitForm } = usePostResetPassword({ token });

  const handleSubmitForm = (formValues: FieldValues) => {
    onSubmitForm(formValues as ResetPasswordFormDto, {
      onSuccess({ auth, user }) {
        toast.success("Senha alterada com sucesso.");

        tokenStorage.setToken(auth.accessToken);
        tokenStorage.setRefreshToken(auth.refreshToken);

        setUser(user);
        navigate("/");
      },
      onError(error) {
        console.error(error);
      },
    });
  };

  return (
    <Form {...formProps} onSubmit={formProps.handleSubmit(handleSubmitForm)}>
      <div className="flex flex-col">
        <div className="gap-4 mb-11">
          <TextField.Form
            isPassword
            size="lg"
            label="Senha"
            name="password"
            autoComplete="new-password"
            classNames={{
              inputWrapper: "mt-4 bg-gray-100 rounded-2xl",
            }}
          />

          <TextField.Form
            isPassword
            size="lg"
            label="Confirmação de Senha"
            name="password_confirmation"
            classNames={{
              inputWrapper: "mt-4 bg-gray-100 rounded-2xl",
            }}
          />
        </div>

        <Button type="submit" size="lg" className="bg-blue h-16 text-white">
          <span className="font-nexa">Redefinir Senha</span>
        </Button>
      </div>
    </Form>
  );
}
