import { RouteObject } from "react-router-dom";
import {
  SubjectsCreatePage,
  SubjectsUpdatePage,
  SubjectsListingPage,
  StudentsCreatePage,
  StudentsListingPage,
  StudentsUpdatePage,
  ProfessorsCreatePage,
  ProfessorsListingPage,
  ProfessorsUpdatePage,
  MilestoneListingPage,
  MilestoneUpdatePage,
  MilestoneCreatePage,
  ResearchLineListingPage,
  ResearchLineCreatePage,
  ResearchLineUpdatePage,
} from "views";

export const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: <div>Hello</div>,
  },
  {
    path: "/dashboard",
    element: <div>Hello</div>,
  },
  {
    path: "/disciplinas",
    element: <SubjectsListingPage />,
  },
  {
    path: "/disciplinas/cadastrar",
    element: <SubjectsCreatePage />,
  },
  {
    path: "/disciplinas/:id/editar",
    element: <SubjectsUpdatePage />,
  },
  {
    path: "/marcos-temporais",
    element: <MilestoneListingPage />,
  },
  {
    path: "/marcos-temporais/cadastrar",
    element: <MilestoneCreatePage />,
  },
  {
    path: "/marcos-temporais/:id/editar",
    element: <MilestoneUpdatePage />,
  },
  {
    path: "/publicacoes",
    element: <div>Hello</div>,
  },
  {
    path: "/professores",
    element: <ProfessorsListingPage />,
  },
  {
    path: "/professores/cadastrar",
    element: <ProfessorsCreatePage />,
  },
  {
    path: "/professores/:id/editar",
    element: <ProfessorsUpdatePage />,
  },
  {
    path: "/estudantes",
    element: <StudentsListingPage />,
  },
  {
    path: "/estudantes/cadastrar",
    element: <StudentsCreatePage />,
  },
  {
    path: "/estudantes/:id/editar",
    element: <StudentsUpdatePage />,
  },
  {
    path: "/linhas-de-pesquisa",
    element: <ResearchLineListingPage />,
  },
  {
    path: "/linhas-de-pesquisa/cadastrar",
    element: <ResearchLineCreatePage />,
  },
  {
    path: "/linhas-de-pesquisa/:id/editar",
    element: <ResearchLineUpdatePage />,
  },
];
