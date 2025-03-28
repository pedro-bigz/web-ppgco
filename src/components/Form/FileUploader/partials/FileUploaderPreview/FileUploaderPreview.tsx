import { useEffect, useMemo, useState } from "react";
import { FileIcon } from "../IconThumb";
import { ImageThumb } from "../ImageThumb";
import { VideoThumb } from "../VideoThumb";
import { Card, Skeleton } from "@nextui-org/react";
import { getType } from "../../utils";
import { Document, Page } from "react-pdf";

interface FileUploaderPreviewProps {
  file: File;
  removeFile: any;
}

type FileUploaderPreviewComponents = "image" | "video" | "default";

export function FileUploaderPreview({
  file,
  removeFile,
}: FileUploaderPreviewProps) {
  const [type, setType] = useState<string>();
  const previewComponents = {
    image: ImageThumb,
    video: VideoThumb,
    default: FileIcon,
  };

  useEffect(() => {
    getType(file).then(setType);
  }, []);

  const previewComponentKey = useMemo(() => {
    if (!type) return undefined;

    return (
      type in previewComponents ? type : "default"
    ) as FileUploaderPreviewComponents;
  }, [type]);

  if (!type || !previewComponentKey) {
    return (
      <Card
        radius="md"
        className="w-[200px] h-[250px] space-y-5 border-small] p-4 box-border"
      >
        <Skeleton className="rounded-lg h-[166px]">
          <div className="h-[166px] rounded-lg bg-default-300" />
        </Skeleton>
        <div className="space-y-3 mt-2">
          <Skeleton className="w-full rounded-lg">
            <div className="h-3 w-full rounded-lg bg-default-200" />
          </Skeleton>
        </div>
      </Card>
    );
  }

  const PreviewComponent = previewComponents[previewComponentKey];

  return <PreviewComponent file={file} type={type} removeFile={removeFile} />;
}
