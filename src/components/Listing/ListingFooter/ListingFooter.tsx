import { Card, CardBody, CardProps } from "@nextui-org/react";
import { PerPageSelect } from "../PerPageSelect";
import { Pagination } from "../Pagination";
import { useListingContext } from "hooks";
import { numberFormat } from "utils";

export const ListingFooter = (props: CardProps) => {
  const { data, totalItems } = useListingContext();

  return (
    <Card {...props}>
      <CardBody className="px-5">
        <div className="flex justify-between items-center">
          <div className="font-extralight">
            Exibindo {data.length} items de {numberFormat(totalItems)}
          </div>
          <div className="flex items-center gap-5">
            <PerPageSelect />
            <Pagination />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
