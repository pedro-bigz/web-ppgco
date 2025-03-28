import { detectFileType } from "./detectFileType";

export async function getType(file: File) {
  const type = file.type || (await detectFileType(file));

  return type.split("/")[0];
}
