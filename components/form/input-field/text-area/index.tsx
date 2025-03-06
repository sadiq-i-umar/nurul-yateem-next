import { HookFormProps } from "../..";
import { textFieldStyle } from "../text";

export type TextAreaFieldProps = {
  rows: number;
  name?: string;
  hookForm?: HookFormProps;
};

const TextAreaField = ({ name, hookForm, rows }: TextAreaFieldProps) => {
  return (
    <div>
      <textarea
        className={`${textFieldStyle} w-full`}
        rows={rows}
        {...hookForm?.register(name ?? "")}
      ></textarea>
    </div>
  );
};

export default TextAreaField;
