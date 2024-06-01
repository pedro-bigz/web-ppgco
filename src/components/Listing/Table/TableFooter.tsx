import { PerPageSelect } from "../PerPageSelect";
import { Pagination } from "../Pagination";
import { useListingContext } from "hooks";
import { numberFormat } from "utils";
import classNames from "classnames";

interface TableFooterInterface {
  className?: string;
}

export const TableFooter = ({ className }: TableFooterInterface) => {
  const { data, totalItems } = useListingContext();
  const numItems = data.length;
  const itemLabel = numItems > 1 ? "items" : "item";

  return (
    <div className={classNames("flex justify-between items-center", className)}>
      <div className="font-extralight">
        Exibindo {numItems} {itemLabel} de {numberFormat(totalItems)}
      </div>
      <div className="flex items-center gap-5">
        <PerPageSelect />
        <Pagination />
      </div>
    </div>
  );
};
