import { TextArea, TextField } from "components";
import { FieldArray } from "components/Form/FieldArray";

interface DocumentFormProps {
  className: string;
}

export const DocumentForm = ({ className }: DocumentFormProps) => {
  return (
    <FieldArray
      className={className}
      name="documents"
      fieldKeys={["doc_name", "description"]}
      hasDivisor
    >
      {(field, index) => (
        <>
          <TextField.Form
            name={`documents.${index}.doc_name`}
            label="Nome do Documento"
          />

          <TextArea.Form
            name={`documents.${index}.description`}
            label="Descrição"
          />
        </>
      )}
    </FieldArray>
  );
};
