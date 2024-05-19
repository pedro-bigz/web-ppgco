import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ConfirmationModal } from "components/ConfirmationModal";
import {
  ActionsItem,
  Table,
  TableColumnAttributes,
  TableRowInterface,
} from "../Table";
import { useDeleteItems, DeleteApiCallbacks } from "./useDeleteItems";
import { useListing } from "./useListing";

export interface ListingBodyInterface {
  rowKey?: string | number;
  actions?: ActionsItem[];
  endpoint: string;
  columns: TableColumnAttributes[];
  onDeleteCallbacks?: DeleteApiCallbacks;
}

export const ListingBody = ({
  endpoint,
  columns,
  actions,
  rowKey = "id",
  onDeleteCallbacks,
}: ListingBodyInterface) => {
  const navigate = useNavigate();

  const { data, isLoading, removeItem } = useListing({ endpoint });
  const { pathname } = useLocation();
  const { mutate: deleteItem } = useDeleteItems({ endpoint });

  const [item, setItem] = useState<TableRowInterface>({});
  const [isShownConfirmation, setIsShownConfirmation] =
    useState<boolean>(false);

  const onDelete = () => {
    deleteItem(+item[rowKey]!, {
      onSuccess(data: any) {
        if (onDeleteCallbacks?.onSuccess) {
          return onDeleteCallbacks?.onSuccess(data);
        }
        return toast.success("Deletado com sucesso");
      },
      onError(error) {
        if (onDeleteCallbacks?.onError) {
          return onDeleteCallbacks?.onError(error);
        }
        return toast.error("Erro ao deletar item");
      },
      onSettled() {
        removeItem<TableRowInterface>((current: TableRowInterface) => {
          return current[rowKey] === item[rowKey];
        });
        setItem({});
      },
    });
  };

  return (
    <>
      <ConfirmationModal
        status={"warn"}
        isOpen={isShownConfirmation}
        description={<div>Deletar item?</div>}
        onOpenChange={setIsShownConfirmation}
        onAccept={onDelete}
        onReject={console.log}
      />
      <Table
        rowKey={rowKey}
        rows={data as TableRowInterface[]}
        columns={columns}
        isLoading={isLoading}
        actions={[
          {
            label: "Editar",
            onClick(item: TableRowInterface) {
              navigate(`${pathname}/${item[rowKey]}/editar`);
            },
          },
          {
            label: "Deletar",
            onClick(item: TableRowInterface) {
              setItem(item);
              setIsShownConfirmation(true);
            },
          },
          ...(actions ?? []),
        ]}
      />
    </>
  );
};
