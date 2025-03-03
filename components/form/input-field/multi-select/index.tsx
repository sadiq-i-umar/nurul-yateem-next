import { MultiSelect, SelectProps } from "react-multi-select-component";

export type MultiSelectFieldProps = Pick<
  SelectProps,
  "options" | "value" | "onChange"
>;

const MultiSelectField = ({
  options,
  value,
  onChange,
}: MultiSelectFieldProps) => {
  return (
    <MultiSelect
      options={options}
      value={value}
      onChange={onChange}
      labelledBy="Select"
    />
  );
};

export default MultiSelectField;
