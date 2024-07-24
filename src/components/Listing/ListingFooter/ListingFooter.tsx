import { Card, CardBody, CardProps } from "@nextui-org/react";
import { PerPageSelect } from "../PerPageSelect";
import { Pagination } from "../Pagination";
import { useListingContext } from "core";
import { numberFormat } from "utils";

export function ListingFooter(props: CardProps) {
  const { data, page, totalPages, totalItems, setPage } = useListingContext();

  return (
    <Card {...props}>
      <CardBody className="px-5">
        <div className="flex justify-between items-center">
          <div className="font-extralight">
            Exibindo {data.length} items de {numberFormat(totalItems)}
          </div>
          <div className="flex items-center gap-5">
            <PerPageSelect />
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
