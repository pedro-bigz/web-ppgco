import { FileWithPath } from "react-dropzone/.";
import { FileThumb } from "../FileThumb";

interface UploadedFileProps {
  file: FileWithPath;
  type: string;
  removeFile: (file: File) => void;
}

interface SquareVideoProps {
  src: string;
  type: string;
  controls: boolean;
  width: number;
  height: number;
  className: string;
}

function SquareVideo({
  src,
  type,
  controls,
  width,
  height,
  className,
}: SquareVideoProps) {
  return (
    <video
      controls={controls}
      width={width}
      height={height}
      className={
        "block w-auto h-full aspect-square object-cover rounded-[--nextui-radius-small] " +
        className
      }
    >
      <source src={src} type={type} />
    </video>
  );
}

export function VideoThumb({ file, type, removeFile }: UploadedFileProps) {
  const preview = URL.createObjectURL(file);

  return (
    <FileThumb file={file} type={type} removeFile={removeFile}>
      <SquareVideo
        controls={false}
        width={166}
        height={166}
        type={file.type}
        src={preview + "#t=5,10"}
        className="pointer-events-none inset-0 z-40"
      />
    </FileThumb>
  );
}
