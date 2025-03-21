import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { HookFormRequired, HookFormValidate, InputFieldProps } from "..";

export type TextFieldType =
  | "text"
  | "number"
  | "message"
  | "password"
  | "email";

export type TextFieldProps = {
  name?: InputFieldProps["name"];
  hookForm?: InputFieldProps["hookForm"];
  required?: HookFormRequired;
  validate?: HookFormValidate;
  disabled?: boolean;
  type: TextFieldType;
};

export const textFieldStyle =
  "border-2 rounded-lg px-2 py-3 border-tetiary-100 w-full";

const TextField = ({
  type,
  name,
  required,
  validate,
  disabled,
  hookForm,
}: TextFieldProps) => {
  const [showText, setShowText] = useState(false);

  return (
    <div className="relative">
      <input
        disabled={disabled}
        type={type === "password" ? (showText ? "text" : "password") : type}
        className={textFieldStyle}
        {...hookForm?.register?.(name ?? "", {
          required: required,
          validate: validate,
        })}
      />
      {type === "password" && (
        <span
          onClick={() => setShowText(!showText)}
          className="absolute top-3 right-5 cursor-pointer"
        >
          {showText ? <VisibilityOff /> : <Visibility />}
        </span>
      )}
    </div>
  );
};

export default TextField;
