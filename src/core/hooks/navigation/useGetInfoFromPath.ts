import { useLocation } from "react-router-dom";

const pathTitles = {
  "/": "Início",
  "/disciplinas/cadastrar": "Disciplinas - Cadastro",
};

type PathKeys = keyof typeof pathTitles;

export function useGetInfoFromPath(): {
  title: string;
  currentRoute: string;
} {
  const location = useLocation();
  const foundPath = Object.keys(pathTitles).find((path: any) =>
    location.pathname.includes(path)
  ) as PathKeys;

  return {
    title: foundPath ? pathTitles[foundPath] : pathTitles["/"],
    currentRoute: location.pathname,
  };
}
