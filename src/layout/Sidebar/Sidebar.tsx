// import { Accordion, AccordionItem } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";

import { ChevronRight, LogoUFU45 } from "assets";
import { ListMenuItemType, SIDEBAR_MENU_ITENS } from "./Sidebar.mock";
import { Listbox, ListboxItem, Tooltip } from "@nextui-org/react";
import { Icon } from "components";
import { ListboxWrapper } from "components";
import { useSidebarContext } from "./hooks";
import { MouseEvent } from "react";

// interface ChildrenMenuProps extends ListMenuItemType {
//   isSelectedItem: boolean;
//   isLastItem: boolean;
//   onClick: () => void;
// }

export function Sidebar() {
  const { pathname } = useLocation();
  const { isOpen, setIsOpen, navigate } = useSidebarContext();

  const handleNavigate = (item: ListMenuItemType) => {
    return (e: MouseEvent<HTMLLIElement>) => {
      console.log({ e, item });
      navigate(item.route);
    };
  };

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
        "flex flex-col justify-start transition-width duration-1000 ease-in-out h-screen w-0 bg-white border-r-1 shadow-2xl absolute md:static z-50",
        {
          "w-[302px]": isOpen,
          "w-0 md:w-28": !isOpen,
        }
      )}
    >
      <div className="my-2 flex items-center justify-center gap-4 p-4">
        <img src={LogoUFU45} alt="brand" className="mb-4" />
      </div>

      <ListboxWrapper className="mx-[21px] my-[14px] w-full max-w-[260px] px-1 py-2">
        <Listbox variant="flat" aria-label="Listbox menu with icons">
          {SIDEBAR_MENU_ITENS.map((item) => {
            const isSelectedMenu = isSomeChildMenuSelected(item);

            return (
              <ListboxItem
                key={item.title}
                onClick={handleNavigate(item)}
                shouldHighlightOnFocus={false}
                classNames={{
                  base: classNames(
                    "max-w-full justify-center items-center transition-all duration-1000 ease-in-out w-full h-[3.5rem]",
                    {
                      "px-5 flex": isOpen,
                      "w-0 md:w-12 hidden md:flex": !isOpen,
                      "hover:bg-[#6b7280 !important] bg-[#0059b6] text-white":
                        isSelectedMenu,
                      "hover:bg-gray-200": !isSelectedMenu,
                    }
                  ),
                  title: "bg-red",
                }}
              >
                <div
                  className={classNames(
                    "flex text-base text-gray-500 font-bold whitespace-nowrap",
                    {
                      "text-white": isSelectedMenu,
                      "justify-center": !isOpen,
                      "items-center": !isOpen,
                    }
                  )}
                >
                  <Icon
                    icon={item?.icon}
                    iconProps={
                      isSelectedMenu ? { color: "text-white" } : undefined
                    }
                  />

                  {isOpen && <div className="ml-4">{item.title}</div>}
                </div>
              </ListboxItem>
            );
          })}
        </Listbox>
      </ListboxWrapper>

      <div className="flex justify-center items-end pb-[42px] px-8 mt-auto">
        <Tooltip
          placement="right-end"
          content={isOpen ? "Encolher menu" : "Expandir menu"}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={classNames(
              "h-[42px] w-[42px] max-w-full flex justify-center items-center bg-white border rounded-full transition-transform transform",
              { "scale-x-[-1] ": !isOpen }
            )}
          >
            <ChevronRight />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
