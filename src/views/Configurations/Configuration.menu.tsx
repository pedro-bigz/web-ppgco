import { Button, Tooltip } from "@nextui-org/react";
import {
  AddUserIcon,
  MaintenanceDateIcon,
  NotificationImportantIcon,
} from "assets";
import { Icon } from "components";
import { useNavigationStore } from "core";
import { useNavigation } from "react-router-dom";

export function ConfigurationMenu() {
  const { navigate } = useNavigationStore();

  const goTo = (url: string) => () => navigate(url);

  return (
    <div className="flex flex-wrap justify-center md:justify-start w-full gap-5 md:p-10">
      <div className="flex justify-center">
        <Tooltip content="Notificar usuários" placement="bottom">
          <Button
            onClick={goTo("/notificacoes")}
            className="flex bg-gradient-to-tr from-pink-600 to-yellow-300 text-white shadow-lg h-auto w-[250px]"
          >
            <div className="flex flex-col items-center justify-center gap-2 h-full px-5 py-6">
              <div>
                <Icon
                  icon={NotificationImportantIcon}
                  iconProps={{ width: 48 }}
                />
              </div>
              <h3 className="text-xl font-bold">Notificações</h3>
            </div>
          </Button>
        </Tooltip>
      </div>
      <div className="flex justify-center">
        <Tooltip
          content="Cadastro de Marcos temporais padrão"
          placement="bottom"
        >
          <Button
            onClick={goTo("/marcos-temporais-padrao")}
            className="flex bg-gradient-to-tr from-success-600 to-lime-300 text-white shadow-lg h-auto w-[250px]"
          >
            <div className="flex flex-col items-center justify-center gap-2 h-full px-5 py-6">
              <div>
                <Icon icon={MaintenanceDateIcon} iconProps={{ width: 64 }} />
              </div>
              <h3 className="text-xl font-bold">Marcos Temporais</h3>
            </div>
          </Button>
        </Tooltip>
      </div>
      <div className="flex justify-center">
        <Tooltip
          content="Cadastro de novos Coordenadores(as) e secretários(as)"
          placement="bottom"
        >
          <Button
            onClick={goTo("/usuarios")}
            className="flex bg-gradient-to-tr from-purple-600 to-sky-300 text-white shadow-lg h-auto w-[250px]"
          >
            <div className="flex flex-col items-center justify-center gap-2 h-full px-5 py-6">
              <div>
                <Icon icon={AddUserIcon} iconProps={{ width: 64 }} />
              </div>
              <h3 className="text-xl font-bold">Usuários</h3>
            </div>
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
