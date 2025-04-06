import { ButtonVariant } from "@/components/button";
import { FormProps } from "@/components/form";
import { FileUploadType } from "@/components/form/input-field/file-upload";
import { icon } from "@/constants/icon";
import { CompleteAccountSectionProps } from "../..";
import useStateAndLga from "../../../../hooks/state-and-lga";
import field from "../fields";
import { getMaxDate } from "./utils";

const usePersonalInformationSection = ({
  hookForm,
  onNextClick,
}: CompleteAccountSectionProps) => {
  const form: FormProps = {
    hookForm: hookForm,
    submit: {
      onValid: () => onNextClick?.(),
    },
    inputFields: [
      {
        label: field.picture.label,
        fileUploadField: {
          fileType: FileUploadType.IMAGE,
          icon: icon.picture,
          text: "Upload your picture",
          isAvatar: true,
        },
      },
      {
        label: field.gender.label,

        radioGroupField: {
          required: true,
          options: field.gender.options,
        },
      },
      {
        label: field.dateOfBirth.label,
        dateField: {
          required: true,
          maxDate: getMaxDate(),
        },
      },
      {
        label: field.martialStatus.label,
        selectField: {
          required: true,
          options: field.martialStatus.options,
        },
      },
      {
        label: field.phoneNumber.label,

        textField: {
          type: "text",
          required: true,
        },
      },
      {
        label: field.alternatePhoneNumber.label,
        textField: {
          type: "text",
        },
      },
      {
        label: field.homeAddress.label,
        textAreaField: {
          required: true,
        },
      },
      {
        label: field.stateOfOrigin.label,
        selectField: {
          options: field.stateOfOrigin.options,
          required: true,
        },
      },
      {
        label: field.lga.label,
        selectField: {
          options: useStateAndLga(hookForm.watch(field.stateOfOrigin.label))
            .lgaOptions,
          required: true,
        },
      },
    ],
    buttonGroup: {
      position: "end",
      buttons: [
        {
          type: "submit",
          text: "Next",
          variant: ButtonVariant.CONTAINED,
        },
      ],
    },
  };
  return { form };
};

export default usePersonalInformationSection;
