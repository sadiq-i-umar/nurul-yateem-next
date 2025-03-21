import { ButtonType } from "@/components/button";
import { FormProps } from "@/components/form";
import { FileUploadType } from "@/components/form/input-field/file-upload";
import { icon } from "@/constants/icon";
import options from "@/constants/options";
import useStateAndLga from "@/hooks/state-and-lga";
import { getUrl } from "@/utils/api";
import { useForm } from "react-hook-form";
import useAddOrphanApi from "../api";
import { AddOrphanPayload } from "../api/types";
import field from "./fields";
import useSchoolStatusField from "./hooks/school-status";

const useAddOrphansForm = () => {
  const { ...hookForm } = useForm();

  const { lgaOptions } = useStateAndLga(
    hookForm.watch(field.stateOfOrigin.label)
  );

  const { disableField } = useSchoolStatusField(hookForm);

  const disableConstraint = { required: !disableField, disabled: disableField };

  const { addOrphan } = useAddOrphanApi();

  const form: FormProps = {
    hookForm: hookForm,
    submit: {
      onValid: async () => {
        const getValue = hookForm.getValues;
        const picture = await getUrl(getValue(field.picture.label));
        const affidavit = await getUrl(getValue(field.affidavit.label));
        const isEnrolled =
          getValue(field.schoolStatus.label) === field.schoolStatus.options[0]
            ? true
            : false;

        const payload: AddOrphanPayload = {
          picture: picture,
          gender: getValue(field.gender.label),
          firstName: getValue(field.firstName.label),
          lastName: getValue(field.lastName.label),
          affidavitOfGuardianship: affidavit,
          localGovernment: getValue(field.lga.label),
          dateOfBirth: getValue(field.dob.label),
          isEnrolled: isEnrolled,
          schoolName: getValue(field.schoolName.label),
          schoolAddress: getValue(field.schoolAddress.label),
          schoolContactPerson: getValue(field.schoolContactPerson.label),
          schoolContactPhone: getValue(field.contactPersonPhone.label),
        };

        addOrphan.mutateAsync(payload);
      },
    },
    inputFields: [
      {
        label: field.picture.label,
        fileUploadField: {
          fileType: FileUploadType.IMAGE,
          text: "Upload Picture",
          icon: icon.picture,
          isAvatar: true,
          required: true,
        },
      },
      {
        label: field.gender.label,
        radioGroupField: {
          options: field.gender.options,
          required: true,
        },
      },
      {
        label: field.firstName.label,
        textField: {
          type: "text",
          required: true,
        },
      },
      {
        label: field.lastName.label,
        textField: {
          type: "text",
          required: true,
        },
      },
      {
        label: field.affidavit.label,
        fileUploadField: {
          fileType: FileUploadType.DOC,
          text: "Drag or Drop Document",
          icon: icon.doc,
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
          options: lgaOptions,
          required: true,
        },
      },
      {
        label: field.dob.label,
        dateField: {
          required: true,
        },
      },
      {
        label: field.schoolStatus.label,
        selectField: {
          options: options.schoolStatus,
          required: true,
        },
      },
      {
        label: field.schoolName.label,
        textField: {
          type: "text",
          ...disableConstraint,
        },
      },
      {
        label: field.schoolAddress.label,
        textAreaField: {
          ...disableConstraint,
        },
      },
      {
        label: field.schoolContactPerson.label,
        textField: {
          type: "text",
          ...disableConstraint,
        },
      },
      {
        label: field.contactPersonPhone.label,
        textField: {
          type: "text",
          ...disableConstraint,
        },
      },
    ],
    buttonGroup: {
      position: "end",
      buttons: [
        {
          variant: ButtonType.CONTAINED,
          type: "submit",
          text: "Submit",
        },
      ],
    },
  };

  return { form };
};

export default useAddOrphansForm;
