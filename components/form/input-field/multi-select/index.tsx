import { Controller } from "react-hook-form";
import { MultiSelect, Option } from "react-multi-select-component";
import { HookFormRequired } from "..";
import { HookFormProps } from "../..";

export type MultiSelectFieldProps = {
  name?: string;
  hookForm?: HookFormProps;
  required?: HookFormRequired;
  defaultValue?: Option[];
  options: Option[];
};

const MultiSelectField = ({
  name,
  hookForm,
  required,
  defaultValue,
  options,
}: MultiSelectFieldProps) => {
  return (
    <Controller
      name={name ?? ""}
      control={hookForm?.control}
      rules={{
        required: required,
      }}
      defaultValue={defaultValue}
      render={({ field }) => (
        <MultiSelect
          options={options}
          value={field.value ?? []}
          valueRenderer={(selected, options) => {
            if (selected.length === options.length) {
              return <p>All orphans selected</p>;
            } else {
              return;
            }
          }}
          onChange={field.onChange}
          labelledBy="Select"
        />
      )}
    />
  );
};

export default MultiSelectField;
