import { InputFieldProps } from "@/components/form/input-field";
import { FileUploadType } from "@/components/form/input-field/file-upload";
import { icon } from "@/constants/icon";
import field from "..";

export const supportingDocumentsInputFields: InputFieldProps[] = [
  {
    label: field.supportingDocuments.title.label,
    textField: { type: "text", required: true },
  },
  {
    label: field.supportingDocuments.description.label,
    textAreaField: { required: true },
  },
  {
    label: field.supportingDocuments.uploadedDocument.label,
    fileUploadField: {
      fileType: FileUploadType.DOC,
      icon: icon.doc,
      text: "Drag and Drop .pdf, .png, .jpeg",
      required: true,
    },
  },
];
