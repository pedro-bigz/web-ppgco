import { useEffect } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { ZodSchema } from "zod";

export interface UseMilestoneFormParams {
  milestoneId?: string;
  schema: ZodSchema;
}

interface UseMilestoneDocumentParams extends UseFormReturn {
  formId: number;
}

export function useMilestoneDocument({
  formId,
  control,
  watch,
}: UseMilestoneDocumentParams) {
  const {
    fields: documents,
    append: appendDocument,
    remove: removeDocument,
  } = useFieldArray({
    control,
    name: `data.${formId}.documents`,
    shouldUnregister: true,
  });

  const hasDocuments = watch(`data.${formId}.need_document`);

  const addDocument = () => {
    appendDocument({
      doc_name: "",
      description: "",
    });
  };

  const isLastDocument = (index: number) => {
    return index === documents.length - 1;
  };

  const handleAddDocument = () => addDocument;
  const handleRemoveDocument = (index: number) => () => removeDocument(index);

  useEffect(() => {
    if (!hasDocuments || documents.length) return;
    addDocument();
  }, [hasDocuments]);

  return {
    documents,
    hasDocuments,
    addDocument,
    removeDocument,
    isLastDocument,
    handleAddDocument,
    handleRemoveDocument,
  };
}
