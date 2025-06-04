import { Option } from "react-multi-select-component";
import { HookFormRequired, HookFormValidate, InputFieldProps } from "..";

export type SelectFieldProps = {
  name?: InputFieldProps["name"];
  required?: HookFormRequired;
  validate?: HookFormValidate;
  hookForm?: InputFieldProps["hookForm"];
  value?: string;
  defaultValue?: string;
  options: Option[];
};

const SelectField = ({
  name,
  required,
  validate,
  hookForm,
  options,
  value,
  defaultValue,
}: SelectFieldProps) => {
  return (
    <select
      {...hookForm?.register(name ?? "", {
        validate: {
          [`${name} is required`]: (value: string) =>
            required && value.length > 0,
          ...validate,
        },
      })}
      value={value}
      defaultValue={defaultValue}
    >
      <option value="">--Select--</option>
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectField;
