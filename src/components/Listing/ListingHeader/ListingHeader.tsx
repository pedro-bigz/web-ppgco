import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, CardBody } from "@nextui-org/react";
import { FilterIcon, PlusIcon } from "assets";
import { useListingContext } from "hooks";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { numberFormat } from "utils";
import { FilterModal } from "../FilterModal";

export interface ListingTitleProps {
  title: string;
}

export const ListingHeader = ({ title }: ListingTitleProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { totalItems } = useListingContext();

  const [isOpenFilters, setIsOpenFilters] = useState<boolean>(false);

  // const goTo = (url: string) => () => navigate(url);
  const goToRegister = () => navigate(pathname + "/cadastrar");
  const handleOnFilterStateChange = () => {
    setIsOpenFilters(!isOpenFilters);
  };

  return (
    <>
      <FilterModal isOpen={isOpenFilters} onOpenChange={setIsOpenFilters} />
      <Card className="mb-5">
        <CardBody className="px-5">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="font-sfPro text-xl font-extrabold">{title}</div>
              <div className="font-sfPro text-sm font-thin">
                ({numberFormat(totalItems)} resultados)
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleOnFilterStateChange}
                radius="full"
                variant="bordered"
                color="primary"
                className="px-5 font-bold font-sfPro"
                startContent={<FilterIcon color="text-primary" />}
              >
                Filtrar
              </Button>
              <Button
                onClick={goToRegister}
                radius="full"
                variant="solid"
                color="primary"
                className="px-5 font-bold font-sfPro"
                startContent={<FontAwesomeIcon icon={faPlus} />}
              >
                Cadastrar
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};
