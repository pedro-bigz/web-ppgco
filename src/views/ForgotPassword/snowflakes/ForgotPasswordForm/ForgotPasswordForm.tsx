import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, TextField } from "components";
import { usePostForgotPassword, ForgotPasswordFormDto, postForgotPasswordSchema } from "views/ForgotPassword/api";
import toast from "react-hot-toast";

export function ForgotPasswordForm() {
  const formProps = useForm({
    mode: "onSubmit",
    resolver: zodResolver(postForgotPasswordSchema),
  });

  const { mutate: onSubmitForm } = usePostForgotPassword();

  const handleSubmitForm = ({ keepConnected, ...formValues }: FieldValues) => {
    onSubmitForm(formValues as ForgotPasswordFormDto, {
      onSuccess() {
        toast.success('O link de redefinição de senha foi enviado para o e-mail informado');
      },
      onError() {
        toast.error('Erro ao enviar e-mail de redefinição de senha')
      },
    });
  };

  return (
    <Form {...formProps} onSubmit={formProps.handleSubmit(handleSubmitForm)}>
      <div className="flex flex-col">
        <div className="gap-4 mb-11">
          <TextField.Form
            size="lg"
            label="E-mail"
            name="email"
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