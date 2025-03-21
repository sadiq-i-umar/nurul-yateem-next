import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import ButtonGroup, { ButtonGroupProps } from "../button/group";
import InputField, { InputFieldProps } from "./input-field";

export type FormProps = {
  inputFields: InputFieldProps[];
  buttonGroup?: ButtonGroupProps[];
  hookForm?: HookFormProps;
  submit?: {
    onValid: OnValidSubmit;
    onInvalid?: SubmitErrorHandler<FieldValues> | undefined;
  };
};

export type HookFormProps = UseFormReturn;

export type OnValidSubmit = SubmitHandler<FieldValues>;

const Form = ({ inputFields, buttonGroup, hookForm, submit }: FormProps) => {
  return (
    <form
      onSubmit={
        submit
          ? hookForm?.handleSubmit(submit.onValid, submit.onInvalid)
          : undefined
      }
      className="flex flex-col gap-8"
    >
      {inputFields.map((inputField, index) => (
        <InputField key={index} {...inputField} hookForm={hookForm} />
      ))}
      {buttonGroup && <ButtonGroup {...buttonGroup} />}
    </form>
  );
};

export default Form;
