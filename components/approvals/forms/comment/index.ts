import useActionApi from "@/components/action/api";
import { PerformActionMutationProps } from "@/components/action/types";
import { ButtonVariant } from "@/components/button";
import { FormProps } from "@/components/form";
import { useForm } from "react-hook-form";

const useCommentForm = ({
  commentFieldLabel,
  onSuccess,
  performActionMutationProps,
}: {
  commentFieldLabel?: string;
  onSuccess?: () => void;
  performActionMutationProps?: PerformActionMutationProps;
}) => {
  const { ...hookForm } = useForm();
  const { performActionMutation } = useActionApi({
    onSuccess: onSuccess,
  });
  const _commentFieldLabel = commentFieldLabel ?? "Rejection Message";
  const getCommentFieldValue = () => {
    return hookForm.getValues(_commentFieldLabel);
  };

  const form: FormProps = {
    hookForm: hookForm,
    submit: {
      onValid: () =>
        performActionMutation.mutateAsync({
          ...performActionMutationProps,
          data: {
            ...performActionMutationProps?.data,
            comment: getCommentFieldValue(),
          },
        }),
    },
    inputFields: [
      {
        label: _commentFieldLabel,
        textAreaField: {
          required: false,
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
