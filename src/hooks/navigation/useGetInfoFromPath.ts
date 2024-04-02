import { useLocation } from "react-router-dom";

const pathTitles = {
  "/": "Início",
};

type PathKeys = keyof typeof pathTitles;

export const useGetInfoFromPath = (): {
  title: string;
  currentRoute: string;
} => {
  const location = useLocation();
  const foundPath = Object.keys(pathTitles).find((path: any) =>
    location.pathname.includes(path)
  ) as PathKeys;

  return {
    title: foundPath ? pathTitles[foundPath] : pathTitles["/"],
    currentRoute: location.pathname,
  };
};
