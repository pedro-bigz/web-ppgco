import { Pagination as NextPagination } from "@nextui-org/react";

interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (value: number) => void;
}

export function Pagination({ page, totalPages, setPage }: PaginationProps) {
  return (
    <NextPagination
      loop
      showControls
      variant="bordered"
      total={totalPages}
      initialPage={page}
      onChange={setPage}
      classNames={{
        wrapper: "gap-0 overflow-visible h-8 rounded border border-divider",
        item: "w-8 h-8 text-small rounded-none border-none",
        cursor:
          "bg-gradient-to-b shadow-lg from-[#3b82f6] to-[#1e40af] from-10% via-30% to-90% text-white font-bold",
      }}
    />
  );
}
