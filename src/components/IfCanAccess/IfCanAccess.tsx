import { Spinner } from "@nextui-org/react";
import { usePermissions } from "core";

export interface IfCanAccessProps {
  permission: string;
  children: JSX.Element;
}

export function IfCanAccess({ permission, children }: IfCanAccessProps) {
  const { cannot, isPermissionsLoaded } = usePermissions();

  if (!isPermissionsLoaded) {
    return (
      <div className="flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (cannot(permission)) {
    return <div>Você não possui permissão para acessar este módulo</div>;
  }

  return children;
}
