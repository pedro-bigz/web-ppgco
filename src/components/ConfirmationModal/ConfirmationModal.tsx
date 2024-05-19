import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { borderColors, titles } from "./ConfirmationModal.mock";

export interface ConfirmationEventHandler<R = void> {
  (...args: any[]): R;
}

export interface ConfirmationModalInterface {
  status: "success" | "error" | "warn";
  isOpen: boolean;
  description: string | JSX.Element;
  onOpenChange: ConfirmationEventHandler;
  onAccept?: ConfirmationEventHandler;
  onReject?: ConfirmationEventHandler;
  onSetted?: ConfirmationEventHandler<boolean>;
}

export const ConfirmationModal = ({
  status,
  isOpen,
  description,
  onOpenChange,
  onAccept,
  onReject,
  onSetted,
}: ConfirmationModalInterface) => {
  const handleOnEvent =
    (
      onClose: ConfirmationEventHandler,
      onEvent?: ConfirmationEventHandler,
      status = false
    ) =>
    () => {
      onClose();
      onEvent?.();
      onSetted?.(status);
    };
  return (
    <Modal
      size="md"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{ wrapper: borderColors[status] }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {titles[status]}
            </ModalHeader>
            <ModalBody>{description}</ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                variant="light"
                onPress={handleOnEvent(onClose, onAccept, true)}
              >
                Confirmar
              </Button>
              <Button
                color="danger"
                variant="solid"
                onPress={handleOnEvent(onClose, onReject, false)}
              >
                Cancelar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
