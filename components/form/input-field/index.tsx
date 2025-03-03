import DateField from "./date";
import FileUploadField, { FileUploadFieldProps } from "./file-upload";
import MultiSelectField, { MultiSelectFieldProps } from "./multi-select";
import TextField, { TextFieldProps } from "./text";
import TextAreaField, { TextAreaFieldProps } from "./text-area";

export type InputFieldProps = {
  label?: string;
  textField?: TextFieldProps;
  textAreaField?: TextAreaFieldProps;
  multiSelectField?: MultiSelectFieldProps;
  fileUploadField?: FileUploadFieldProps;
  dateField?: any;
};

const InputField = ({
  label,
  textField,
  textAreaField,
  multiSelectField,
  dateField,
  fileUploadField,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <p>{label}</p>}
      {textField && <TextField {...textField} />}
      {textAreaField && <TextAreaField {...textAreaField} />}
      {multiSelectField && <MultiSelectField {...multiSelectField} />}
      {dateField && <DateField />}
      {fileUploadField && <FileUploadField {...fileUploadField} />}
    </div>
  );
};

export default InputField;
