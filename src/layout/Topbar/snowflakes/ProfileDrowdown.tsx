import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
  AvatarIcon,
} from "@nextui-org/react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigationStore } from "hooks";
import { strLimit } from "utils";

interface UserInterface {
  name: string;
  description: string;
  avatar?: string;
}

interface ProfileDrowdownProps {
  user: UserInterface;
}

export function ProfileDrowdown({ user }: ProfileDrowdownProps) {
  const { navigate } = useNavigationStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleLogout = () => {
    sessionStorage.clear();
    // navigate("/login");
  };

  return (
    <Dropdown placement="bottom-start" onOpenChange={setIsOpen}>
      <DropdownTrigger>
        <div className="flex gap-4 items-center justify-end min-w-[232px]">
          <User
            as="button"
            name={user.name}
            description={strLimit(user.description, 20)}
            className="transition-transform"
            avatarProps={{
              src: user?.avatar,
              icon: !user?.avatar ? <AvatarIcon /> : undefined,
              showFallback: true,
              classNames: {
                base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                icon: "text-black/80",
              },
            }}
          />
          <FontAwesomeIcon icon={!isOpen ? faAngleDown : faAngleUp} />
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-bold">Signed in as</p>
          <p className="font-bold">@tonyreichert</p>
        </DropdownItem>
        <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={handleLogout}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
