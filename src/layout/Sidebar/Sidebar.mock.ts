import {
  ConfigIcon,
  DashboardIcon,
  ManagementIcon,
  PartnerIcon,
  PreferencesIcon,
  RelatorioIcon,
  ResearchLineIcon,
  StoreIcon,
  // mainLogo,
  // shortMainLogo,
} from "assets";
import { CalendarIcon } from "assets/svg/calendar-icon";
import { HoodIcon } from "assets/svg/hood-icon";
import { PenIcon } from "assets/svg/pen-icon";
import { SubjectsIcon } from "assets/svg/subjects-icon";
import { UserGroupIcon } from "assets/svg/user-group-icon";
import { GenericIconDefinition } from "components";

export type ListMenuItemType = {
  title: string;
  icon: GenericIconDefinition;
  route: string;
  permission: string;
  children?: ListMenuItemType[];
};

export const SIDEBAR_MENU_ITENS = [
  {
    title: "Dashboard",
    icon: DashboardIcon,
    permission: "dashboard",
    route: "/dashboard",
  },
  {
    title: "Disciplinas",
    route: "/disciplinas",
    permission: "subjects",
    icon: SubjectsIcon,
  },
  {
    title: "Marcos Temporais",
    route: "/marcos-temporais",
    permission: "milestone",
    icon: CalendarIcon,
  },
  {
    title: "Publicações",
    route: "/publicacoes",
    permission: "publication-project",
    icon: PenIcon,
  },
  {
    title: "Professores",
    route: "/professores",
    permission: "advisor",
    icon: UserGroupIcon,
  },
  {
    title: "Estudantes",
    route: "/estudantes",
    permission: "student",
    icon: HoodIcon,
  },
  {
    title: "Linhas de Pesquisa",
    route: "/linhas-de-pesquisa",
    permission: "research-line",
    icon: ResearchLineIcon,
  },
  {
    title: "Configurações",
    route: "/configuracoes",
    permission: "configuration",
    icon: ConfigIcon,
  },
] as ListMenuItemType[];
