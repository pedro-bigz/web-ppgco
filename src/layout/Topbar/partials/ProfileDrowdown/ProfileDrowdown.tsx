import { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
  AvatarIcon,
  Button,
} from "@nextui-org/react";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { strLimit } from "utils";
import { DropdownItemData, useProfileDrowdown } from "./useProfileDrowdown";

interface UserInterface {
  name: string;
  description: string;
  avatar?: string;
}

interface ProfileDrowdownProps {
  user: UserInterface;
}

export function ProfileDrowdown({ user }: ProfileDrowdownProps) {
  const { dropdownItems } = useProfileDrowdown();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dropdown placement="bottom-start" onOpenChange={setIsOpen}>
      <DropdownTrigger>
        <Button variant="light" className="outline-none">
          <User
            name={strLimit(user.name, 18)}
            description={strLimit(user.description, 20)}
            className="transition-transform"
            classNames={{
              name: "hidden xs:flex",
              description: "hidden xs:flex",
            }}
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
          <FontAwesomeIcon
            icon={!isOpen ? faAngleDown : faAngleUp}
            className="ml-2"
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Account options"
        variant="flat"
        items={dropdownItems}
      >
        {(item: DropdownItemData) => (
          <DropdownItem
            key={item.key}
            color={item?.color}
            className={item.className}
            onClick={item.handler}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
