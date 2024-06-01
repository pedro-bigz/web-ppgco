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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { EditIcon, TrashBIcon, TrashIcon } from "assets";

export interface ListingBodyInterface {
  track?: {
    key: string | number;
    label: string;
  };
  actions?: ActionsItem[];
  endpoint: string;
  columns: TableColumnAttributes[];
  onDeleteCallbacks?: DeleteApiCallbacks;
}

export const ListingBody = ({
  endpoint,
  columns,
  actions,
  track = {
    key: "id",
    label: "name",
  },
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
    deleteItem(+item[track.key]!, {
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
          return current[track.key] === item[track.key];
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
        title="Confirmação de deleção"
        description={
          <div>
            <div>Deseja realmente deletar este item?</div>
            <div>
              <span className="font-bold">
                <span className="text-base">{item[track.key]}</span> -{" "}
                <span className="text-2xl">{item[track.label]}</span>
              </span>
            </div>
          </div>
        }
        onOpenChange={setIsShownConfirmation}
        onAccept={onDelete}
        onReject={console.log}
      />
      <Table
        rowKey={track.key}
        rows={data as TableRowInterface[]}
        columns={columns}
        isLoading={isLoading}
        actions={[
          {
            label: "Editar",
            className: "text-primary text-lg font-bold font-nexa",
            icon: () => <EditIcon className="mx-2" width={14} height={14} />,
            onClick(item: TableRowInterface) {
              navigate(`${pathname}/${item[track.key]}/editar`);
            },
          },
          {
            label: "Deletar",
            className: "text-danger text-lg font-bold font-nexa",
            icon: () => <TrashBIcon className="mx-2" width={13} height={17} />,
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
