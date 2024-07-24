import { useNavigationStore, useUserContext } from "core";
import { ProfileDrowdown, SearchBar } from "./partials";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useSidebarContext } from "layout/Sidebar";

export function TopBar() {
  const { navigation } = useNavigationStore();
  const { user } = useUserContext();
  const { onOpenChange } = useSidebarContext();

  const title = navigation.title;

  // console.log({ user });

  return (
    <div className="flex justify-between items-center bg-background drop-shadow top-0 z-40 pl-[15px] pr-[5px] md:pl-[36px] md:pr-[24px] py-[17px] gap-8">
      <div className="w-[500px] max-w-[40%] md:max-w-[60%] flex gap-[50px]">
        <div className="flex items-center font-montserrat font-bold gap-4">
          <Button
            isIconOnly
            color="primary"
            className="block md:hidden"
            onClick={onOpenChange}
          >
            <FontAwesomeIcon icon={faBars} />
          </Button>
          {title}
        </div>
        <div className="w-full hidden lg:block">
          <SearchBar />
        </div>
      </div>
      <ProfileDrowdown
        user={{
          name: (user?.first_name ?? "") + " " + (user?.last_name ?? ""),
          description: user?.email ?? "",
        }}
      />
    </div>
  );
}
