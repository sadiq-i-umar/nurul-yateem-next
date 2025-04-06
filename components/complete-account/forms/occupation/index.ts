import { ButtonVariant } from "@/components/button";
import { FormProps } from "@/components/form";
import { CompleteAccountSectionProps } from "../..";
import field from "../fields";
import useEmploymentStatus from "./hooks";

const useOccupationSection = ({
  hookForm,
  onPrevClick,
  onNextClick,
}: CompleteAccountSectionProps) => {
  const { unemployedDisabled, disableField } = useEmploymentStatus(hookForm);

  const form: FormProps = {
    hookForm: hookForm,
    submit: {
      onValid: () => onNextClick?.(),
    },
    inputFields: [
      {
        label: field.employmentStatus.label,
        selectField: {
          required: true,
          options: field.employmentStatus.options,
        },
      },
      {
        label: field.natureOfJob.label,
        textField: {
          type: "text",
          required: !unemployedDisabled,
          disabled: unemployedDisabled,
        },
      },
      {
        label: field.annualIncome.label,
        textField: {
          type: "number",
          required: !unemployedDisabled,
          disabled: unemployedDisabled,
        },
      },
      {
        label: field.employerName.label,
        textField: {
          type: "text",
          required: !disableField,
          disabled: disableField,
        },
      },
      {
        label: field.employerPhoneNumber.label,
        textField: {
          type: "text",
          required: !disableField,
          disabled: disableField,
        },
      },
      {
        label: field.employerAddress.label,
        textAreaField: {
          required: !disableField,
          disabled: disableField,
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
          text: "Next",
          variant: ButtonVariant.CONTAINED,
        },
      ],
    },
  };
  return { form };
};

export default useOccupationSection;
