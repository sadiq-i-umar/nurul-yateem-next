import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";
import { HookFormRequired, HookFormValidate, InputFieldProps } from "..";

export type DateFieldProps = {
  name?: InputFieldProps["name"];
  required?: HookFormRequired;
  validate?: HookFormValidate;
  hookForm?: InputFieldProps["hookForm"];
  maxDate?: dayjs.Dayjs;
  defaultValue?: dayjs.Dayjs;
};

const DateField = ({
  name,
  required,
  validate,
  hookForm,
  maxDate,
  defaultValue,
}: DateFieldProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name ?? ""}
        control={hookForm?.control}
        defaultValue={defaultValue}
        rules={{
          required: required,
          validate: validate,
        }}
        render={({ field }) => (
          <DatePicker
            {...field}
            value={field.value ?? null}
            onChange={(date) => field.onChange(date)}
            maxDate={maxDate}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateField;
