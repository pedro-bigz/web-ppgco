import { useState } from "react";
// import { Accordion, AccordionItem } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";

import { ChevronRight } from "assets";
import { ListMenuItemType, SIDEBAR_MENU_ITENS } from "./Sidebar.mock";

interface ChildrenMenuProps extends ListMenuItemType {
  isSelectedItem: boolean;
  isLastItem: boolean;
  onClick: () => void;
}

const ChildrenMenu = ({
  route,
  title,
  isLastItem,
  isSelectedItem,
  onClick,
}: ChildrenMenuProps) => (
  <>
    <div className="absolute -mt-5 py-3 mx-7 ">{/* <Connector /> */}</div>

    <ul
      className={classNames("flex cursor-pointer mx-7 pl-3 py-2", {
        "border-l-2": !isLastItem,
      })}
      key={route}
    >
      <li
        className={classNames("flex h-9 items-center rounded-full ", {
          "bg-green text-white z-10": isSelectedItem,
          "hover:bg-gray-200": !isSelectedItem,
        })}
      >
        <span
          className={classNames(
            "mx-3 whitespace-nowrap text-base text-gray-500 font-medium",
            {
              "text-white": isSelectedItem,
            }
          )}
          onClick={onClick}
        >
          {title}
        </span>
      </li>
    </ul>
  </>
);

export function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isSomeChildMenuSelected = ({ route, children }: ListMenuItemType) => {
    const hasMatchingChild = children?.some(
      ({ route }) => route && pathname.includes(route)
    );

    return (route && pathname.includes(route)) || hasMatchingChild;
  };

  return (
    <div
      data-name="sidebar"
      className={classNames(
        "flex flex-col justify-start transition-all duration-1000 ease-in-out h-screen w-0 bg-white border-r-1 shadow-2xl",
        {
          "w-[17rem]": isOpen,
          "w-28": !isOpen,
        }
      )}
    >
      <div className="my-2 flex items-center justify-center gap-4 p-4">
        {/* <img src={isOpen ? ufuLogo : shortUFLogo} alt="brand" /> */}
      </div>

      <div className="flex justify-center items-end h-full pb-[42px] px-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={classNames(
            "h-[42px] w-[42px] flex justify-center items-center bg-white border rounded-full transition-transform transform",
            { "scale-x-[-1] ": !isOpen }
          )}
        >
          <ChevronRight />
        </button>
        {isOpen && (
          <span className="flex items-center whitespace-nowrap overflow-hidden text-ellipsis ml-3 h-[42px]">
            Encolher menu
          </span>
        )}
      </div>
    </div>
  );
}
