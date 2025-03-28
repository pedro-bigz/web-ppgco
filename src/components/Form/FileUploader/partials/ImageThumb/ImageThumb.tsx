import { Image } from "@nextui-org/react";
import { FileWithPath } from "react-dropzone/.";
import { FileThumb } from "../FileThumb";

interface UploadedFileProps {
  file: FileWithPath;
  type: string;
  removeFile: (file: File) => void;
}

export function ImageThumb({ file, type, removeFile }: UploadedFileProps) {
  const preview = URL.createObjectURL(file);

  return (
    <FileThumb file={file} type={type} removeFile={removeFile}>
      <Image
        src={preview}
        isZoomed
        radius="sm"
        className="block w-auto h-full aspect-square"
        alt={`${file.name}_thumb`}
        onLoad={() => {
          URL.revokeObjectURL(preview);
        }}
      />
    </FileThumb>
  );
}
