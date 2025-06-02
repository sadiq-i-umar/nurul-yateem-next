import { HookFormProps } from "@/components/form";
import { useEffect, useState } from "react";
import field from "../../fields";

const useSchoolStatusField = (
  hookForm: Pick<HookFormProps, "watch" | "clearErrors">
) => {
  const schoolStatus = hookForm.watch(field.schoolStatus.label);
  const [disableField, setDisableField] = useState(false);

  useEffect(() => {
    if (schoolStatus === field.schoolStatus.options[0].label) {
      setDisableField(false);
    } else if (schoolStatus === field.schoolStatus.options[1].label) {
      setDisableField(true);
    } else {
      setDisableField(true);
    }
    hookForm.clearErrors([
      field.schoolName.label,
      field.schoolAddress.label,
      field.schoolContactPerson.label,
      field.contactPersonPhone.label,
    ]);
  }, [schoolStatus]);

  return { disableField };
};

export default useSchoolStatusField;
