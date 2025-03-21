import { HookFormRequired, InputFieldProps } from "..";
import { HookFormProps } from "../..";
import { textFieldStyle } from "../text";

export type TextAreaFieldProps = {
  name?: InputFieldProps["name"];
  rows?: number;
  required?: HookFormRequired;
  disabled?: boolean;
  hookForm?: HookFormProps;
};

const TextAreaField = ({
  name,
  required,
  disabled,
  hookForm,
  rows,
}: TextAreaFieldProps) => {
  return (
    <div>
      <textarea
        disabled={disabled}
        className={`${textFieldStyle} w-full`}
        rows={rows ?? 4}
        {...hookForm?.register(name ?? "", {
          required: required,
        })}
      ></textarea>
    </div>
  );
};

export default TextAreaField;
