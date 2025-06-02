import { ButtonVariant } from "@/components/button";
import { FormProps } from "@/components/form";
import { FileUploadType } from "@/components/form/input-field/file-upload";
import { icon } from "@/constants/icon";
import { CompleteAccountSectionProps } from "../..";
import field from "../fields";
import useMeansOfIdentification from "./hooks/means-of-identification";

const useIdentitySection = ({
  hookForm,
  onPrevClick,
  onNextClick,
}: CompleteAccountSectionProps) => {
  const { isTextField, isUnselected } = useMeansOfIdentification(hookForm);

  const form: FormProps = {
    hookForm: hookForm,
    submit: {
      onValid: () => onNextClick?.(),
    },
    inputFields: [
      {
        label: field.meansOfIdentification.label,
        selectField: {
          required: true,
          options: field.meansOfIdentification.options,
        },
      },
      {
        label: isTextField
          ? field.identificationNumber.label
          : field.identificationUpload.label,
        textField: isTextField
          ? {
              required: !isUnselected,
              disabled: isUnselected,
              type: "text",
            }
          : undefined,
        fileUploadField: isTextField
          ? undefined
          : {
              fileType: FileUploadType.DOC,
              text: "Upload your ID",
              icon: icon.doc,
              required: true,
              maxSize: 1,
            },
      },
    ],
    buttonGroup: {
      position: "end",
      buttons: [
        {
          text: "Back",
          variant: ButtonVariant.CONTAINED_DARK,
          onClick: onPrevClick,
        },
        {
          type: "submit",
          text: "Submit",
          variant: ButtonVariant.CONTAINED,
        },
      ],
    },
  };

  return { form };
};

export default useIdentitySection;
