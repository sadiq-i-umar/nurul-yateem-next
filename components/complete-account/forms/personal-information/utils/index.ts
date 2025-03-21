import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
const dayjsUtc = dayjs.utc();

export const getMaxDate = () => {
  const currentYear = dayjsUtc.get("year");
  const month = dayjsUtc.add(1, "month").get("month");
  const date = dayjsUtc.get("date");
  const maxYear = currentYear - 18;
  return dayjs(`${maxYear}-${month}-${date}`);
};
