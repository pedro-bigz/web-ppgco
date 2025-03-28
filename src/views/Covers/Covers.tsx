import { FileUploader } from "components";

export function CoversPage() {
  return <FileUploader onDrop={console.log} label={"Drag here"} />;
}
