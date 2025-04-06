import { ButtonVariant } from "@/components/button";
import { FormProps } from "@/components/form";
import useOrphanListApi from "@/components/orphan-list/api";
import useSponsorshipRequestApi from "@/components/pages/dashboard/guardian/sponsorship-requests/api";
import { useForm } from "react-hook-form";

const useRejectionForm = ({
  orphanId,
  onSuccess,
  sponsorshipRequestId,
}: {
  orphanId?: string;
  sponsorshipRequestId?: string;
  onSuccess?: () => void;
}) => {
  const { ...hookForm } = useForm();
  const { rejectOrphan } = useOrphanListApi(hookForm, onSuccess);
  const { rejectSponsorshipRequest } = useSponsorshipRequestApi({
    hookForm,
    onSuccess,
  });
  const rejectionMessageFieldLabel = "Rejection Message";

  const form: FormProps = {
    hookForm: hookForm,
    submit: {
      onValid: () => {
        if (orphanId)
          rejectOrphan.mutateAsync({
            id: orphanId,
            reason: hookForm.getValues(rejectionMessageFieldLabel),
          });
        if (sponsorshipRequestId)
          rejectSponsorshipRequest.mutateAsync({
            id: sponsorshipRequestId,
            reason: hookForm.getValues(rejectionMessageFieldLabel),
          });
      },
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
          variant: ButtonVariant.CONTAINED,
          text: "Submit",
          type: "submit",
        },
      ],
    },
  };
  return { form };
};

export default useRejectionForm;
