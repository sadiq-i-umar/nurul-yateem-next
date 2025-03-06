import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Controller } from "react-hook-form";
import { HookFormProps } from "../..";

type DateFieldProps = {
  name?: string;
  hookForm?: HookFormProps;
};

const DateField = ({ name, hookForm }: DateFieldProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name ?? ""}
        control={hookForm?.control}
        render={({ field }) => (
          <DatePicker
            {...field}
            value={field.value ?? null}
            onChange={(date) => field.onChange(date)}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateField;
