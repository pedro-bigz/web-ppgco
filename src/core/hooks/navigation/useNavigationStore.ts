import { useNavigate, To } from "react-router-dom";
import { create } from "zustand";
import { useGetInfoFromPath } from "./useGetInfoFromPath";

interface Navigation {
  title: string;
  currentRoute: string;
}

interface NavigationStore {
  navigation: Navigation;
  navigate: (route: To) => void;
}

export const useNavigationStore = () => {
  const navigate = useNavigate();

  const { title, currentRoute } = useGetInfoFromPath();

  const navigateStore = create<NavigationStore>((set: any) => ({
    navigation: { title, currentRoute },
    navigate: (route: To) => {
      navigate(route);
      set(() => ({
        navigation: {
          title,
          currentRoute,
        },
      }));
    },
  }));

  return navigateStore();
};
