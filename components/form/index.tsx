import {
  Control,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormReset,
  UseFormResetField,
  UseFormSetValue,
  UseFormUnregister,
  UseFormWatch,
} from "react-hook-form";
import Button, { ButtonProps } from "../button";
import InputField, { InputFieldProps } from "./input-field";

export type FormProps = {
  inputFields: InputFieldProps[];
  buttons?: ButtonProps[];
  hookForm?: HookFormProps;
};

export type HookFormProps = {
  register: UseFormRegister<FieldValues>;
  setValue?: UseFormSetValue<any>;
  watch?: UseFormWatch<FieldValues>;
  resetField?: UseFormResetField<FieldValues>;
  reset?: UseFormReset<FieldValues>;
  unregister?: UseFormUnregister<FieldValues>;
  getValues?: UseFormGetValues<FieldValues>;
  control?: Control<FieldValues, any>;
};

const Form = ({ inputFields, buttons, hookForm }: FormProps) => {
  return (
    <form className="flex flex-col gap-8">
      {inputFields.map((inputField, index) => (
        <InputField key={index} {...inputField} hookForm={hookForm} />
      ))}
      {buttons && (
        <div className="flex items-center justify-end gap-4">
          {buttons?.map((button, index) => (
            <Button key={index} {...button} />
          ))}
        </div>
      )}
    </form>
  );
};

export default Form;
