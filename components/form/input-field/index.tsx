import { FieldValues, Validate, ValidationRule } from "react-hook-form";
import { HookFormProps } from "..";
import DateField, { DateFieldProps } from "./date";
import FileUploadField, { FileUploadFieldProps } from "./file-upload";
import GroupField, { GroupFieldProps } from "./group";
import MultiSelectField, { MultiSelectFieldProps } from "./multi-select";
import RadioGroupField, { RadioGroupFieldProps } from "./radio";
import SelectField, { SelectFieldProps } from "./select";
import TextField, { TextFieldProps } from "./text";
import TextAreaField, { TextAreaFieldProps } from "./text-area";

export type InputFieldProps = {
  label?: string;
  name?: string;
  textField?: TextFieldProps;
  textAreaField?: TextAreaFieldProps;
  selectField?: SelectFieldProps;
  multiSelectField?: MultiSelectFieldProps;
  radioGroupField?: RadioGroupFieldProps;
  fileUploadField?: FileUploadFieldProps;
  dateField?: DateFieldProps;
  groupField?: GroupFieldProps;
  hookForm?: HookFormProps;
};

export type HookFormValidate =
  | Validate<any, FieldValues>
  | Record<string, Validate<any, FieldValues>>
  | undefined;

export type HookFormRequired = string | ValidationRule<boolean> | undefined;

const InputField = ({
  label,
  name,
  hookForm,
  textField,
  textAreaField,
  selectField,
  multiSelectField,
  radioGroupField,
  dateField,
  fileUploadField,
  groupField,
}: InputFieldProps) => {
  const _name = name ?? label ?? "";
  const errors = hookForm?.formState.errors;
  return (
    <div className="flex flex-col gap-2">
      {label && <p>{label}</p>}
      {textField && (
        <TextField {...textField} name={_name} hookForm={hookForm} />
      )}
      {textAreaField && (
        <TextAreaField {...textAreaField} name={_name} hookForm={hookForm} />
      )}
      {selectField && (
        <SelectField {...selectField} name={_name} hookForm={hookForm} />
      )}
      {multiSelectField && (
        <MultiSelectField
          {...multiSelectField}
          name={_name}
          hookForm={hookForm}
        />
      )}
      {radioGroupField && (
        <RadioGroupField
          {...radioGroupField}
          name={_name}
          hookForm={hookForm}
        />
      )}
      {dateField && (
        <DateField {...dateField} name={_name} hookForm={hookForm} />
      )}
      {fileUploadField && (
        <FileUploadField
          {...fileUploadField}
          name={_name}
          hookForm={hookForm}
        />
      )}
      {groupField && <GroupField {...groupField} hookForm={hookForm} />}
      {errors?.[_name] && (
        <p>
          {errors[_name]?.type === "required"
            ? `${_name} is required`
            : `${errors[_name]?.type}`}
        </p>
      )}
    </div>
  );
};

export default InputField;
