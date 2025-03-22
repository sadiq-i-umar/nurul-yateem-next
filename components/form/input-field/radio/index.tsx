import { Option } from "react-multi-select-component";
import { HookFormRequired, InputFieldProps } from "..";

export type RadioGroupFieldProps = {
  name?: InputFieldProps["name"];
  required?: HookFormRequired;
  hookForm?: InputFieldProps["hookForm"];
  defaultValue?: string;
  options: Option[];
};

const RadioGroupField = ({
  name,
  required,
  options,
  hookForm,
  defaultValue,
}: RadioGroupFieldProps) => {
  return (
    <div>
      {options.map((option) => (
        <label>
          <input
            type="radio"
            name={name}
            value={option.value}
            defaultChecked={defaultValue === option.value}
            {...hookForm?.register(name ?? "", {
              required: required,
            })}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default RadioGroupField;
