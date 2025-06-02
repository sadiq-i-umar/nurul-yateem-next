import { HookFormProps } from "@/components/form";
import { useEffect, useState } from "react";
import field from "../../fields";

const useEmploymentStatus = (
  hookForm: Pick<HookFormProps, "watch" | "clearErrors">
) => {
  const watch = hookForm.watch;

  const employmentStatus = watch(field.employmentStatus.label);
  const [unemployedDisabled, setUnemployedDisabled] = useState(false);
  const [selfEmployedDisabled, setSelfEmployedDisabled] = useState(false);

  const disableField = unemployedDisabled || selfEmployedDisabled;

  useEffect(() => {
    switch (employmentStatus) {
      case "":
        setSelfEmployedDisabled(true);
        setUnemployedDisabled(true);
        break;
      case field.employmentStatus.options[0].label:
        setSelfEmployedDisabled(true);
        setUnemployedDisabled(false);
        break;
      case field.employmentStatus.options[2].label:
        setUnemployedDisabled(true);
        setSelfEmployedDisabled(false);
        break;
      default:
        setSelfEmployedDisabled(false);
        setUnemployedDisabled(false);
        break;
    }
    hookForm.clearErrors();
  }, [employmentStatus]);

  return { unemployedDisabled, disableField };
};

export default useEmploymentStatus;
