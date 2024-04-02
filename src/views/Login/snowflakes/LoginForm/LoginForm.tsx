import { useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, TextField, Checkbox } from "components";
import { LoginFormDto, loginFormSchema } from "./LoginForm.dto";
import { usePostLogin } from "views/Login/api";
import { tokenStorage } from "services";
import { useUserContext } from "hooks";

export function LoginForm() {
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const formProps = useForm({
    mode: "onSubmit",
    resolver: zodResolver(loginFormSchema),
  });

  const { mutate: onSubmitForm } = usePostLogin();

  const handleSubmitForm = ({ keepConnected, ...formValues }: FieldValues) => {
    tokenStorage.keepConnected(keepConnected);

    onSubmitForm(formValues as LoginFormDto, {
      onSuccess({ auth, user }) {
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
    <Form {...formProps} onSubmit={handleSubmitForm}>
      <div className="flex flex-col">
        <div className="gap-4 mb-11">
          <TextField.Form
            size="lg"
            type="email"
            name="email"
            label="E-mail"
            classNames={{
              inputWrapper: "bg-gray-100 rounded-2xl",
            }}
          />

          <TextField.Form
            isPassword
            size="lg"
            label="Senha"
            name="password"
            classNames={{
              inputWrapper: "my-4 bg-gray-100 rounded-2xl",
            }}
          />

          <Checkbox name="keepConnected" defaultSelected />
          <label>Manter-me conectado</label>
        </div>

        <Button type="submit" size="lg" className="bg-blue h-16 text-white">
          <span className="font-nexa">Entrar</span>
        </Button>
      </div>
    </Form>
  );
}
