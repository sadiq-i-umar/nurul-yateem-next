export type TextFieldType = "text" | "number" | "message";

export type TextFieldProps = {
  type: TextFieldType;
};

export const textFieldStyle =
  "border-2 rounded-lg px-2 py-3 border-tetiary-100";

const TextField = ({ type }: TextFieldProps) => {
  return <input type={type} className={textFieldStyle} />;
};

export default TextField;
