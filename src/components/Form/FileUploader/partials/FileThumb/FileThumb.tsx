import { useState } from "react";
import { Card, CardBody, Tooltip } from "@nextui-org/react";
import { FileWithPath } from "react-dropzone/.";
import { ThumbMenu } from "../ThumbMenu";
import { handleNotPropagedClick } from "../../utils";

interface FileThumbProps {
  file: FileWithPath;
  type: string;
  children: JSX.Element;
  removeFile: (file: File) => void;
}

const MAX_FILE_NAME_SIZE = 15;

export function FileThumb({
  file,
  type,
  children,
  removeFile,
}: FileThumbProps) {
  const [showOptionMenu, setShowOptionMenu] = useState<boolean>(false);

  const handleShowOptionMenu = (value: boolean) => {
    return () => {
      setShowOptionMenu(value);
    };
  };

  return (
    <Tooltip placement="bottom" content={file.name}>
      <Card
        radius="md"
        className="bg-white border-small w-[200px] h-autpo p-4 box-border"
        key={file.name}
        onClick={handleNotPropagedClick}
      >
        <CardBody className="flex flex-col justfy-center items-center p-0">
          <div
            className="flex w-full overflow-hidden relative"
            onMouseOver={handleShowOptionMenu(true)}
            onMouseLeave={handleShowOptionMenu(false)}
          >
            {children}
            {showOptionMenu && (
              <ThumbMenu file={file} type={type} removeFile={removeFile} />
            )}
          </div>
          <div className="pt-4">
            {file.name.substring(0, MAX_FILE_NAME_SIZE)}
            {file.name.length >= MAX_FILE_NAME_SIZE ? "..." : ""}
          </div>
        </CardBody>
      </Card>
    </Tooltip>
  );
}
