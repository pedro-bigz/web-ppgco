import {
  AddUserIcon,
  MaintenanceDateIcon,
  NotificationImportantIcon,
} from "assets";
import { Icon } from "components";
import { CardButton } from "./snowflakes";

export function ConfigurationMenu() {
  return (
    <div className="flex flex-wrap justify-center md:justify-start w-full gap-5 md:p-10">
      <div className="flex justify-center">
        <CardButton
          tooltip="Notificar usuários"
          href="/notificacoes"
          label="Notificações"
          className="bg-gradient-to-tr from-pink-600 to-yellow-300"
          icon={
            <Icon icon={NotificationImportantIcon} iconProps={{ width: 48 }} />
          }
        />
      </div>
      <div className="flex justify-center">
        <CardButton
          tooltip="Cadastro de Marcos temporais padrão"
          href="/marcos-temporais-padrao"
          label="Marcos Temporais"
          className="bg-gradient-to-tr from-success-600 to-lime-300"
          icon={<Icon icon={MaintenanceDateIcon} iconProps={{ width: 64 }} />}
        />
      </div>
      <div className="flex justify-center">
        <CardButton
          tooltip="Cadastro de novos Coordenadores(as) e secretários(as)"
          href="/usuarios"
          label="Usuários"
          className="bg-gradient-to-tr from-purple-600 to-sky-300"
          icon={<Icon icon={AddUserIcon} iconProps={{ width: 64 }} />}
        />
      </div>
      <div className="flex justify-center">
        <CardButton
          tooltip="Alterar banners"
          href="/banners"
          label="Banners"
          className="bg-gradient-to-tr from-danger-600 to-pink-300"
          icon={<Icon icon={AddUserIcon} iconProps={{ width: 64 }} />}
        />
      </div>
    </div>
  );
}
