import { ButtonVariant } from "@/components/button";
import { FormProps } from "@/components/form";
import useOrphanListApi from "@/components/orphan-list/api";
import useSponsorshipRequestApi from "@/components/pages/dashboard/guardian/sponsorship-requests/api";
import { CreateSponsorshipRequestDto } from "@/components/pages/dashboard/guardian/sponsorship-requests/api/types";
import { useForm } from "react-hook-form";

const useCommentForm = ({
  commentFieldLabel,
  orphanId,
  onSuccess,
  sponsorshipRequestId,
  editRequestId,
  sponsorshipRequestEditPayload,
}: {
  commentFieldLabel?: string;
  orphanId?: string;
  sponsorshipRequestId?: string;
  editRequestId?: string;
  sponsorshipRequestEditPayload?: CreateSponsorshipRequestDto;
  onSuccess?: () => void;
}) => {
  const { ...hookForm } = useForm();
  const { rejectOrphan } = useOrphanListApi(hookForm, onSuccess);
  const { rejectSponsorshipRequest, requestEdit, rejectEditRequest } =
    useSponsorshipRequestApi({
      hookForm,
      onSuccess,
      selectedRequestId: sponsorshipRequestId,
    });
  const _commentFieldLabel = commentFieldLabel ?? "Rejection Message";
  const getCommentFieldValue = () => {
    return hookForm.getValues(_commentFieldLabel);
  };

  const form: FormProps = {
    hookForm: hookForm,
    submit: {
      onValid: () => {
        if (sponsorshipRequestEditPayload) {
          requestEdit.mutateAsync({
            edit: sponsorshipRequestEditPayload,
            reason: getCommentFieldValue(),
          });
        } else {
          if (orphanId)
            rejectOrphan.mutateAsync({
              id: orphanId,
              reason: getCommentFieldValue(),
            });
          if (sponsorshipRequestId)
            rejectSponsorshipRequest.mutateAsync({
              id: sponsorshipRequestId,
              reason: getCommentFieldValue(),
            });
          if (editRequestId)
            rejectEditRequest.mutateAsync({
              id: editRequestId,
              reason: getCommentFieldValue(),
            });
        }
      },
    },
    inputFields: [
      {
        label: _commentFieldLabel,
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

export default useCommentForm;
