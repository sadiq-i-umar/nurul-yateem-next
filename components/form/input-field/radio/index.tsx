import { useEffect, useState } from "react";
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
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    options[0]?.value
  );

  useEffect(() => {
    hookForm?.setValue(name ?? "", options[0].value);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-10">
      {options.map((option) => (
        <label
          className={`flex items-center gap-2 ${
            selectedValue === option.value && "border-primary"
          } border-2 rounded-lg p-4 cursor-pointer`}
          key={option.value}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            defaultChecked={defaultValue === option.value}
            {...hookForm?.register(name ?? "", {
              required: required,
              onChange: (e) => {
                setSelectedValue(e.target.value);
                hookForm?.setValue(name ?? "", e.target.value);
              },
            })}
            className="cursor-pointer"
          />
          <span className="text-sm">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroupField;
