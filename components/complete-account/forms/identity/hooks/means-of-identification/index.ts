import { HookFormProps } from "@/components/form";
import { useEffect } from "react";
import field from "../../../fields";

const useMeansOfIdentification = (
  hookForm: Pick<HookFormProps, "watch" | "unregister" | "clearErrors">
) => {
  const meansOfIdentification = hookForm.watch(
    field.meansOfIdentification.label
  );

  const isUnselected = meansOfIdentification === "";

  const isTextField =
    meansOfIdentification === field.meansOfIdentification.options[0].label ||
    isUnselected;

  useEffect(() => {
    hookForm.unregister(
      isTextField
        ? field.identificationUpload.label
        : field.identificationNumber.label
    ),
      hookForm.clearErrors();
  }, [meansOfIdentification]);

  return { isTextField, isUnselected };
};

export default useMeansOfIdentification;
