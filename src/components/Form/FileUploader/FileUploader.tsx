import { Accept, useDropzone } from "react-dropzone";
import { FileUploaderPreview } from "./partials";
import { useEffect, useState } from "react";

interface FileUploaderProps {
  label: string;
  onDrop: any;
  accept?: Accept;
  maxFiles?: number;
  minSize?: number;
  maxSize?: number;
  multiple?: boolean;
}

export function FileUploader({
  label,
  onDrop,
  accept,
  minSize,
  maxSize,
  maxFiles = 1,
  multiple,
}: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (acceptFiles: File[]) => {
    onDrop(acceptFiles);
    setFiles((state) => [...state, ...acceptFiles]);
  };

  const {
    acceptedFiles,
    isFocused,
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps,
  } = useDropzone({
    minSize,
    maxSize,
    accept,
    maxFiles,
    multiple,
    onDrop: handleDrop,
  });

  useEffect(() => {
    console.log({ acceptedFiles });
  }, [acceptedFiles]);

  // Dynamic class names based on dropzone state
  const dropzoneClassName = `
    flex flex-col items-center justify-center p-8 w-full 
    border-2 border-dashed rounded-lg cursor-pointer 
    transition-colors duration-200 ease-in-out
    ${isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"}
    ${isDragAccept ? "border-green-500 bg-green-50" : ""}
    ${isDragReject ? "border-red-500 bg-red-50" : ""}
    ${isFocused ? "ring-2 ring-blue-400 ring-offset-2" : ""}
  `;

  const handleRemoveFile = (index: number) => {
    return () => {
      setFiles((state) => [
        ...state.slice(0, index),
        ...state.slice(index + 1, state.length),
      ]);
    };
  };

  return (
    <div className="space-y-2 w-full">
      <div {...getRootProps({ className: dropzoneClassName })}>
        <input {...getInputProps()} />
        <div className="text-center space-y-2">
          <svg
            className="w-12 h-12 mx-auto text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="text-sm text-gray-600">
            {isDragActive ? (
              <span className="text-blue-500">{label}</span>
            ) : (
              <span className="font-medium text-blue-600">{label}</span>
            )}
          </p>
          <p className="text-xs text-gray-500">
            {isDragReject
              ? "Sorry, only images (JPEG, JPG, PNG, GIF) are accepted"
              : "PNG, JPG, GIF up to 10MB"}
          </p>
          <div className="flex flex-wrap gap-3">
            {files.map((file, index) => (
              <FileUploaderPreview
                key={index}
                file={file}
                removeFile={handleRemoveFile(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
