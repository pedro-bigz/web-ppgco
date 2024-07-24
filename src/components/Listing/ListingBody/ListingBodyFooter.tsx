import { PerPageSelect } from "../PerPageSelect";
import { Pagination } from "../Pagination";
import { useListingContext } from "core";
import { numberFormat } from "utils";
import classNames from "classnames";

interface TableFooterInterface {
  className?: string;
  showPerPageSelect?: boolean;
}

export const ListingBodyFooter = ({
  className,
  showPerPageSelect = true,
}: TableFooterInterface) => {
  const { data, page, totalPages, totalItems, setPage } = useListingContext();

  const numItems = data.length;
  const itemLabel = numItems > 1 ? "items" : "item";

  return (
    <div
      className={classNames(
        "flex flex-wrap justify-between items-center gap-3",
        className
      )}
    >
      <div className="font-extralight">
        Exibindo {numItems} {itemLabel} de {numberFormat(totalItems)}
      </div>
      <div className="flex flex-wrap items-center gap-5">
        {showPerPageSelect && <PerPageSelect />}
        {totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        )}
      </div>
    </div>
  );
};
