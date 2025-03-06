import { HookFormProps } from "..";
import DateField from "./date";
import FileUploadField, { FileUploadFieldProps } from "./file-upload";
import GroupField, { GroupFieldProps } from "./group";
import MultiSelectField, { MultiSelectFieldProps } from "./multi-select";
import TextField, { TextFieldProps } from "./text";
import TextAreaField, { TextAreaFieldProps } from "./text-area";

export type InputFieldProps = {
  label?: string;
  name?: string;
  textField?: TextFieldProps;
  textAreaField?: TextAreaFieldProps;
  multiSelectField?: MultiSelectFieldProps;
  fileUploadField?: FileUploadFieldProps;
  dateField?: any;
  groupField?: GroupFieldProps;
  hookForm?: HookFormProps;
};

const InputField = ({
  label,
  name,
  textField,
  textAreaField,
  multiSelectField,
  dateField,
  fileUploadField,
  groupField,
  hookForm,
}: InputFieldProps) => {
  const _name = name ?? label;
  return (
    <div className="flex flex-col gap-2">
      {label && <p>{label}</p>}
      {textField && (
        <TextField {...textField} name={_name} hookForm={hookForm} />
      )}
      {textAreaField && (
        <TextAreaField {...textAreaField} name={_name} hookForm={hookForm} />
      )}
      {multiSelectField && (
        <MultiSelectField
          {...multiSelectField}
          name={_name}
          hookForm={hookForm}
        />
      )}
      {dateField && <DateField name={_name} hookForm={hookForm} />}
      {fileUploadField && (
        <FileUploadField
          {...fileUploadField}
          name={_name}
          hookForm={hookForm}
        />
      )}
      {groupField && <GroupField {...groupField} hookForm={hookForm} />}
    </div>
  );
};

export default InputField;
