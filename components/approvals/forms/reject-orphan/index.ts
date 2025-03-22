import { ButtonType } from "@/components/button";
import { FormProps } from "@/components/form";
import useOrphanListApi from "@/components/orphan-list/api";
import { useForm } from "react-hook-form";

const useRejectOrphanForm = (orphanId?: string, onSuccess?: () => void) => {
  const { ...hookForm } = useForm();
  const { rejectOrphan } = useOrphanListApi(hookForm, onSuccess);
  const rejectionMessageFieldLabel = "Rejection Message";

  const form: FormProps = {
    hookForm: hookForm,
    submit: {
      onValid: () =>
        rejectOrphan.mutateAsync({
          id: orphanId,
          reason: hookForm.getValues(rejectionMessageFieldLabel),
        }),
    },
    inputFields: [
      {
        label: rejectionMessageFieldLabel,
        textAreaField: {
          required: true,
        },
      },
    ],
    buttonGroup: {
      position: "end",
      buttons: [
        {
          variant: ButtonType.CONTAINED,
          text: "Submit",
          type: "submit",
        },
      ],
    },
  };
  return { form };
};

export default useRejectOrphanForm;
