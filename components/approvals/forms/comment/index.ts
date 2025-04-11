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
  publishRequestId,
  sponsorshipRequestEditPayload,
  resubmit,
  publishRequest,
}: {
  commentFieldLabel?: string;
  orphanId?: string;
  sponsorshipRequestId?: string;
  editRequestId?: string;
  publishRequestId?: string;
  sponsorshipRequestEditPayload?: CreateSponsorshipRequestDto;
  resubmit?: boolean;
  publishRequest?: boolean;
  onSuccess?: () => void;
}) => {
  const { ...hookForm } = useForm();
  const { rejectOrphan } = useOrphanListApi(hookForm, onSuccess);
  const {
    rejectSponsorshipRequest,
    requestEdit,
    rejectEditRequest,
    resubmitEditRequest,
    requestPublish,
    rejectPublishRequest,
  } = useSponsorshipRequestApi({
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
            (publishRequest
              ? requestPublish
              : rejectSponsorshipRequest
            ).mutateAsync({
              id: sponsorshipRequestId,
              reason: getCommentFieldValue(),
            });
          if (editRequestId)
            (resubmit ? resubmitEditRequest : rejectEditRequest).mutateAsync({
              id: editRequestId,
              reason: getCommentFieldValue(),
            });
          if (publishRequestId)
            rejectPublishRequest.mutateAsync({
              id: publishRequestId,
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
