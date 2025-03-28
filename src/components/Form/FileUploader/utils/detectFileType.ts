type FileTypes =
  | "mp4"
  | "webm"
  | "avi"
  | "mov"
  | "mkv"
  | "flv"
  | "wmv"
  | "mpeg"
  | "mpg"
  | "jpg"
  | "jpeg"
  | "png"
  | "gif"
  | "pdf"
  | "txt";

export async function detectFileType(file: File) {
  // Read the first 12 bytes (enough for most video signatures)
  const blob = file.slice(0, 12);
  const buffer = await blob.arrayBuffer();
  const uint8Array = new Uint8Array(buffer);

  // Helper function to check byte sequences
  const checkBytes = (start: number, sequence: any[]) =>
    sequence.every((byte: number, i: any) => uint8Array[start + i] === byte);

  // Check for common file signatures (magic numbers)

  // Video formats
  if (checkBytes(0, [0x00, 0x00, 0x00, 0x20, 0x66, 0x74, 0x79, 0x70])) {
    return "video/mp4"; // MP4
  }
  if (checkBytes(0, [0x1a, 0x45, 0xdf, 0xa3])) {
    return "video/webm"; // WebM
  }
  if (
    checkBytes(0, [0x52, 0x49, 0x46, 0x46]) &&
    checkBytes(8, [0x41, 0x56, 0x49, 0x20])
  ) {
    return "video/x-msvideo"; // AVI
  }
  if (checkBytes(0, [0x46, 0x4c, 0x56, 0x01])) {
    return "video/x-flv"; // FLV
  }
  if (checkBytes(0, [0x30, 0x26, 0xb2, 0x75, 0x8e, 0x66, 0xcf, 0x11])) {
    return "video/x-ms-wmv"; // WMV
  }
  if (checkBytes(0, [0x00, 0x00, 0x01, 0xba])) {
    return "video/mpeg"; // MPEG
  }

  // Image formats (existing)
  if (checkBytes(0, [0x89, 0x50, 0x4e, 0x47])) {
    return "image/png"; // PNG
  }
  if (checkBytes(0, [0xff, 0xd8, 0xff])) {
    return "image/jpeg"; // JPEG
  }

  // Document formats (existing)
  if (checkBytes(0, [0x25, 0x50, 0x44, 0x46])) {
    return "application/pdf"; // PDF
  }

  // Fallback to extension check if magic numbers don't match
  const extension = file.name?.split(".")?.pop()?.toLowerCase();
  const extensionToType = {
    // Video extensions
    mp4: "video/mp4",
    webm: "video/webm",
    avi: "video/x-msvideo",
    mov: "video/quicktime",
    mkv: "video/x-matroska",
    flv: "video/x-flv",
    wmv: "video/x-ms-wmv",
    mpeg: "video/mpeg",
    mpg: "video/mpeg",

    // Image extensions
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",

    // Document extensions
    pdf: "application/pdf",
    txt: "text/plain",
  };

  if (!extension) {
    return "application/octet-stream";
  }

  return extensionToType[extension as FileTypes] || "application/octet-stream";
}
