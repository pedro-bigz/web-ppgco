import {
  Modal as NextModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Spinner,
} from "@nextui-org/react";
export interface LoadingModalProps {
  isOpen: boolean;
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full";
  classNames?: Record<string, string>;
  isDismissable?: boolean;
}

export function LoadingModal({
  isOpen,
  size = "md",
  classNames,
}: LoadingModalProps) {
  return (
    <>
      <NextModal
        classNames={classNames}
        size={size}
        isOpen={isOpen}
        isDismissable={false}
        hideCloseButton={true}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Carregando...
              </ModalHeader>
              <ModalBody>
                <div className="w-full h-full flex justify-center align-center my-10">
                  <Spinner size="lg" />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </NextModal>
    </>
  );
}
