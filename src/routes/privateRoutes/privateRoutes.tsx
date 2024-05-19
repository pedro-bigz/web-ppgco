import { RouteObject } from "react-router-dom";
import {
  SubjectsCreatePage,
  SubjectsEditPage,
  SubjectsListingPage,
} from "views";
import { StudentsListingPage } from "views/Students";
// import {} from "views";

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
    element: <SubjectsEditPage />,
  },
  {
    path: "/marcos-temporais",
    element: <div>Hello</div>,
  },
  {
    path: "/publicacoes",
    element: <div>Hello</div>,
  },
  {
    path: "/coorientadores",
    element: <div>Hello</div>,
  },
  {
    path: "/alunos",
    element: <StudentsListingPage />,
  },
];
