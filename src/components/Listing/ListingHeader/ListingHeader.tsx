import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, CardBody } from "@nextui-org/react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useListingContext } from "core";
import { handleClick, numberFormat } from "utils";
import { FilterPopover } from "../FilterModal";

export interface ListingTitleProps {
  title: string;
  hideFilters?: boolean;
  hideCreateButton?: boolean;
  columns: { key: string; label: string; type: string }[];
}

export function ListingHeader({
  title,
  columns,
  hideFilters,
  hideCreateButton,
}: ListingTitleProps) {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const {
    numFilters,
    filters,
    totalItems,
    setFilters,
    saveFilters,
    resetSavedFilters,
  } = useListingContext();

  return (
    <>
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
              {!hideFilters && (
                <FilterPopover
                  label={
                    numFilters < 1
                      ? "Filtrar"
                      : `${numFilters} Filtro(s) aplicados`
                  }
                  defaultFilters={filters}
                  columns={columns}
                  onSave={saveFilters}
                  onReset={resetSavedFilters}
                  onFilter={setFilters}
                  buttonProps={{
                    color: numFilters < 1 ? "default" : "primary",
                    className:
                      numFilters < 1 ? "border-black" : "border-primary",
                  }}
                />
              )}
              {!hideCreateButton && (
                <Button
                  onClick={handleClick(navigate, pathname + "/cadastrar")}
                  radius="full"
                  variant="solid"
                  color="primary"
                  className="px-5 font-bold font-sfPro"
                  startContent={<FontAwesomeIcon icon={faPlus} />}
                >
                  Cadastrar
                </Button>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
