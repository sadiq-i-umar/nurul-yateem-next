import { textFieldStyle } from "../text";

export type TextAreaFieldProps = {
  rows: number;
};

const TextAreaField = ({ rows }: TextAreaFieldProps) => {
  return (
    <div>
      <textarea className={`${textFieldStyle} w-full`} rows={rows}></textarea>
    </div>
  );
};

export default TextAreaField;
