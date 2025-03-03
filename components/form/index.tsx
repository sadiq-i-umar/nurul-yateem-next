import { UseFormSetValue } from "react-hook-form";
import Button, { ButtonProps } from "../button";
import InputField, { InputFieldProps } from "./input-field";

export type FormProps = {
  inputFields: InputFieldProps[];
  buttons?: ButtonProps[];
};

export type HookFormProps = {
  setValue: UseFormSetValue<any>;
};

const Form = ({ inputFields, buttons }: FormProps) => {
  return (
    <form className="flex flex-col gap-8">
      {inputFields.map((inputField, index) => (
        <InputField key={index} {...inputField} />
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
