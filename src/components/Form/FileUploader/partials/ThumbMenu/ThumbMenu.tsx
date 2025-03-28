import { Button } from "@nextui-org/react";
import { TrashIcon } from "assets";
import { FileWithPath } from "react-dropzone/.";

interface ThumbMenuProps {
  type: string;
  file: FileWithPath;
  removeFile: (file: File) => void;
}

export function ThumbMenu({ file, type, removeFile }: ThumbMenuProps) {
  return (
    <div className="absolute top-0 z-50">
      <div className="flex w-[166px] h-[166px] justify-center items-center bg-[#2f2d2de0] text-white backdrop-blur-xs">
        {type}
        <Button
          isIconOnly
          className="text-white px-2"
          variant="light"
          size="lg"
          onPress={() => removeFile(file)}
        >
          <TrashIcon width={64} height={64} />
        </Button>
      </div>
    </div>
  );
}
