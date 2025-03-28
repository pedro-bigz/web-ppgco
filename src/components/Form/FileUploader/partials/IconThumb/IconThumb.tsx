import { FileWithPath } from "react-dropzone/.";
import { FileThumb } from "../FileThumb";
import { mimeTypeList } from "./IconThumb.constants";
import {
  faFile,
  faFileExcel,
  faFileLines,
  faFilePdf,
  faFilePowerpoint,
  faFileWord,
  faFileZipper,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FileIconProps {
  file: FileWithPath;
  type: string;
  removeFile: (file: File) => void;
}

type FileIconNames =
  | "pdf"
  | "text"
  | "zip"
  | "document"
  | "spreadsheet"
  | "presentation"
  | "unknown";

const fileIcons = {
  pdf: faFilePdf,
  text: faFileLines,
  zip: faFileZipper,
  document: faFileWord,
  spreadsheet: faFileExcel,
  presentation: faFilePowerpoint,
  unknown: faFile,
};

function findIconNameFromFile(file: File) {
  const [iconName] =
    Object.entries(mimeTypeList).find(([_name, mimeTypeList]) => {
      return mimeTypeList.includes(file.type);
    }) || [];

  return iconName || "unknown";
}

interface IconContainerProps {
  children: JSX.Element;
}

function IconContainer({ children }: IconContainerProps) {
  return (
    <div className="flex w-full item-center justify-center">{children}</div>
  );
}

export function FileIcon({ file, type, removeFile }: FileIconProps) {
  const fileIconKey = findIconNameFromFile(file);
  const iconDefinition = fileIcons[fileIconKey as FileIconNames];

  return (
    <FileThumb file={file} type={type} removeFile={removeFile}>
      <IconContainer>
        <FontAwesomeIcon icon={iconDefinition} className="fa-10x" />
      </IconContainer>
    </FileThumb>
  );
}
