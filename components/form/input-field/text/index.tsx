import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { HookFormRequired, HookFormValidate, InputFieldProps } from "..";

export type TextFieldType = "text" | "number" | "password" | "email";

export type TextFieldProps = {
  name?: InputFieldProps["name"];
  hookForm?: InputFieldProps["hookForm"];
  required?: HookFormRequired;
  validate?: HookFormValidate;
  disabled?: boolean;
  defaultValue?: string | number;
  type: TextFieldType;
  placeholder?: string;
};

export const textFieldStyle =
  "border-2 rounded-lg px-4 py-4 border-tetiary-100 w-full text-sm";

const TextField = ({
  type,
  name,
  required,
  validate,
  disabled,
  hookForm,
  defaultValue,
  placeholder,
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
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
      {type === "password" && (
        <span
          onClick={() => setShowText(!showText)}
          className="absolute top-3 right-5 cursor-pointer"
        >
          {showText ? (
            <VisibilityOff className="text-gray-400" />
          ) : (
            <Visibility className="text-gray-400" />
          )}
        </span>
      )}
    </div>
  );
};

export default TextField;
