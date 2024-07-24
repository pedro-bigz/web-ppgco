import { useNavigationStore } from "core";

export type DropdownItemData = {
  key: string;
  label: string;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  className?: string;
  handler: () => any;
};

export function useProfileDrowdown() {
  const { navigate } = useNavigationStore();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const dropdownItems = [
    {
      key: "account",
      label: "Conta",
      handler: console.log,
    },
    {
      key: "logout",
      label: "Sair",
      handler: handleLogout,
    },
  ];

  return { dropdownItems };
}
