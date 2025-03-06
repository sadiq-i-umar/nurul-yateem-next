import { Controller } from "react-hook-form";
import { MultiSelect, Option } from "react-multi-select-component";
import { HookFormProps } from "../..";

export type MultiSelectFieldProps = {
  name?: string;
  hookForm?: HookFormProps;
  options: Option[];
};

const MultiSelectField = ({
  name,
  hookForm,
  options,
}: MultiSelectFieldProps) => {
  return (
    <Controller
      name={name ?? ""}
      control={hookForm?.control}
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
