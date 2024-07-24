import { Button, Chip } from "@nextui-org/react";
import { ZodSchema } from "zod";
import _trimEnd from "lodash/trimEnd";
import _isEmpty from "lodash/isEmpty";

import {
  Select,
  CardForm,
  TextArea,
  TextField,
  RichTextEditor,
  AsyncAutocomplete,
} from "components";
import {
  NotificationTypes,
  useNotificationsForm,
} from "./useNotificationsForm";
import { run } from "utils";
import { useState } from "react";

export interface NotificationFormProps {
  publicationId?: string;
  schema: ZodSchema;
}

export function NotificationsForm({ schema }: NotificationFormProps) {
  const {
    mode,
    users,
    endpoint,
    notifierKey,
    addUser,
    removeUser,
    handleOnSubmit,
    onSelectStudent,
    isUserSelectable,
    ...formProps
  } = useNotificationsForm({ schema });

  return (
    <CardForm {...formProps} onSubmit={handleOnSubmit}>
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-bold font-montserrat">
          Formulário de cadastro de Notificações
        </h3>
        <div className="flex flex-col gap-3">
          <TextField.Form name="title" label="Título" />
          <RichTextEditor.Form
            name="body"
            label="Descrição"
            defaultValue={`<h1>Descrição</h1><p>Olá está é uma notificação teste</p><div data-youtube-video=""><iframe width="889" height="500" allowfullscreen="true" autoplay="false" disablekbcontrols="false" enableiframeapi="false" endtime="0" ivloadpolicy="0" loop="false" modestbranding="false" origin="" playlist="" src="https://www.youtube.com/embed/ml4USMIm594" start="0"></iframe></div>`}
          />
        </div>
        {!_isEmpty(users) && (
          <div className="flex flex-wrap gap-1">
            {Object.values(users)
              .reverse()
              .map(({ id, user }: any) => (
                <Chip key={id} onClose={run(removeUser, id)}>
                  {user.full_name}
                </Chip>
              ))}
            <TextField.Form isHidden name="values" />
          </div>
        )}
        <div className="flex gap-3">
          <Select.Form
            name="notifieds.mode"
            label="Notificados"
            options={NotificationTypes}
          />
          {isUserSelectable && (
            <AsyncAutocomplete.Uncontrolled
              name="notifieds.value"
              label="Notificados"
              endpoint={endpoint}
              track={{
                key: notifierKey,
                label: "user.full_name",
              }}
              value={" "}
              onChange={onSelectStudent}
            />
          )}
        </div>
        <div className="flex justify-end mt-5">
          <Button
            type="submit"
            className="px-10"
            radius="full"
            variant="solid"
            color="primary"
          >
            Notificar
          </Button>
        </div>
      </div>
    </CardForm>
  );
}
