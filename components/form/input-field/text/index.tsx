import { HookFormProps } from "../..";

export type TextFieldType = "text" | "number" | "message";

export type TextFieldProps = {
  name?: string;
  type: TextFieldType;
  hookForm?: HookFormProps;
};

export const textFieldStyle =
  "border-2 rounded-lg px-2 py-3 border-tetiary-100";

const TextField = ({ type, name, hookForm }: TextFieldProps) => {
  return (
    <input
      type={type}
      className={textFieldStyle}
      {...hookForm?.register?.(name ?? "")}
    />
  );
};

export default TextField;
