import {
  DashboardIcon,
  ManagementIcon,
  PartnerIcon,
  PreferencesIcon,
  RelatorioIcon,
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
  children?: ListMenuItemType[];
};

export const SIDEBAR_MENU_ITENS = [
  {
    title: "Dashboard",
    icon: DashboardIcon,
    route: "/dashboard",
  },
  {
    title: "Disciplinas",
    route: "/disciplinas",
    icon: SubjectsIcon,
  },
  {
    title: "Marcos Temporais",
    route: "/marcos-temporais",
    icon: CalendarIcon,
  },
  {
    title: "Publicações",
    route: "/publicacoes",
    icon: PenIcon,
  },
  {
    title: "Coorientadores",
    route: "/coorientadores",
    icon: UserGroupIcon,
  },
  {
    title: "Alunos",
    route: "/alunos",
    icon: HoodIcon,
  },
] as ListMenuItemType[];
