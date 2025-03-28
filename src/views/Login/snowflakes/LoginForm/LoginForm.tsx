import { Link, useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, TextField, Checkbox } from "components";
import { tokenStorage } from "services";
import { usePostLogin, loginFormSchema, LoginFormDto } from "views/Login/api";
import { useUserContext } from "core";

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

    console.log({ formValues });

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
    <Form {...formProps} onSubmit={formProps.handleSubmit(handleSubmitForm)}>
      <div className="flex flex-col">
        <div className="gap-4 mb-11">
          <TextField.Form
            size="lg"
            type="email"
            name="email"
            label="E-mail"
            defaultValue="ppgco.ufu@gmail.com"
            classNames={{
              inputWrapper: "bg-gray-100 rounded-2xl",
            }}
          />

          <TextField.Form
            isPassword
            size="lg"
            label="Senha"
            name="password"
            defaultValue="Dev@1010"
            classNames={{
              inputWrapper: "mt-4 bg-gray-100 rounded-2xl",
            }}
          />

          <Checkbox.Form
            name="keepConnected"
            className="mt-4"
            defaultSelected
          />
          <label>Manter-me conectado</label>
        </div>

        <Button type="submit" size="lg" className="bg-blue h-16 text-white">
          <span className="font-nexa">Entrar</span>
        </Button>

        <div className="flex justify-center py-5">
          <Link to="/esqueci-a-senha" className="text-[#0500d1]">
            Esqueceu sua senha?
          </Link>
        </div>
      </div>
    </Form>
  );
}
