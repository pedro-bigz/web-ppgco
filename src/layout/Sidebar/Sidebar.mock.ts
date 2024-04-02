import {
  ManagementIcon,
  PartnerIcon,
  PreferencesIcon,
  RelatorioIcon,
  StoreIcon,
  mainLogo,
  shortMainLogo,
} from "assets";
import { GenericIconDefinition } from "components";

export type ListMenuItemType = {
  title: string;
  icon: GenericIconDefinition;
  route: string;
  children?: ListMenuItemType[];
};

export const SIDEBAR_MENU_ITENS = [
  {
    title: "Parceiros",
    icon: PartnerIcon,
    route: "/parceiros",
    children: [
      {
        title: "Clientes",
        route: "/clientes",
      },
      {
        title: "Licenciados",
        route: "/licenciados",
      },
    ],
  },
  {
    title: "Gestão",
    route: "/gestao",
    icon: ManagementIcon,
    children: [
      { title: "Sucesso do Cliente", route: "/sucessoCliente" },
      {
        title: "Saque",
        route: "/saque",
      },
      {
        title: "Extrato Bônus",
        route: "/extratoBonus",
      },
      {
        title: "Extrato Bônus Detalhe",
        route: "/extratoBonusDetalhe",
      },
      {
        title: "Digital",
        route: "/digital",
      },
      {
        title: "Recebíveis Clientes",
        route: "/recebiveisClientes",
      },
      {
        title: "Relatório Inadimplência",
        route: "/relatorioInadimplencia",
      },
      {
        title: "Romaneio Kit",
        route: "/romaneioKit",
      },
      {
        title: "Conexão Livre",
        route: "/conexaoLivre",
      },
      {
        title: "Conexão Placas",
        route: "/conexaoPlacas",
      },
    ],
  },
  {
    title: "Igreen Store",
    icon: StoreIcon,
    children: [
      {
        title: "Publicidade",
        route: "/publicidade",
      },
    ],
  },
  {
    title: "Relatórios",
    route: "/relatorios",
    icon: RelatorioIcon,
    children: [
      {
        title: "Relatório de qualificados",
        route: "/relatorio-qualificados",
      },
      {
        title: "Licenciados PRO",
        route: "/relatorio-licenciado-pro",
      },
      {
        title: "Top Expansão",
        route: "/relatorio-top-expansao",
      },
      {
        title: "Top Conexão",
        route: "/relatorio-top-conexao",
      },
    ],
  },
  {
    title: "Preferências",
    route: "/preferencias",
    icon: PreferencesIcon,
    children: [
      {
        title: "Disparos Push",
        route: "/disparosPush",
      },
      {
        title: "Campanhas",
        route: "/campanhas",
      },
    ],
  },
] as ListMenuItemType[];

export const shortLogo = shortMainLogo;
export const fullLogo = mainLogo;
