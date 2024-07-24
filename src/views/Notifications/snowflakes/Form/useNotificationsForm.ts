import { ZodSchema } from "zod";
import _trimEnd from "lodash/trimEnd";
import _isEqual from "lodash/isEqual";

import { FieldValues } from "react-hook-form";
import { useCustomForm } from "core";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";

export interface NotificationFormProps {
  notificationId?: string;
  schema: ZodSchema;
}

const defaultFormValues: FieldValues = {
  title: "",
  description: "",
  mode: "",
  values: [] as string[],
};

export const NotificationTypes = [
  { value: "all_advisors", label: "Todos os Professores" },
  { value: "all_students", label: "Todos os Estudantes" },
  { value: "some_advisors", label: "Alguns Professores" },
  { value: "some_students", label: "Alguns Estudantes" },
];

export function useNotificationsForm({ schema }: NotificationFormProps) {
  const { onSubmit, handleOnSubmit, ...formProps } = useCustomForm(
    { endpoint: "/notifications", method: "post" },
    {
      resolver: zodResolver(schema),
      mode: "onSubmit",
      defaultValues: defaultFormValues,
    }
  );

  const { watch, setValue } = formProps;

  const usersRef = useRef<Record<string, any>>({});
  const [users, setUsers] = useState<Record<string, any>>({});

  const mode = watch("notifieds.mode_value");
  const isUserSelectable = mode?.startsWith("some") ?? false;

  const notifierKey = mode?.endsWith("students") ? "user_id" : "id";
  const endpoint = "/" + mode?.replace("some_", "");

  console.log({ mode, endpoint });

  const addUser = (key: string | number, option: any) => {
    return setUsers((state) => ({ ...state, [key]: option }));
  };

  const removeUser = (key: string | number) => {
    return setUsers(({ [key]: _, ...state }) => ({ ...state }));
  };

  const onSelectStudent = ({ key, option }: any) => {
    if (!key) return;
    return !users.hasOwnProperty(key) ? addUser(key, option) : removeUser(key);
  };

  useEffect(() => {
    if (_isEqual(usersRef.current, users)) return;
    usersRef.current = users;

    console.log({ values: Object.keys(users) });
    setValue("notifieds.values", Object.keys(users));
  }, [users]);

  return {
    ...formProps,
    mode,
    users,
    endpoint,
    notifierKey,
    isUserSelectable,
    addUser,
    removeUser,
    onSelectStudent,
    onSubmit,
    handleOnSubmit,
  };
}
