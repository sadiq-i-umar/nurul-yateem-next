import { ButtonType } from "@/components/button";
import { FormProps } from "@/components/form";
import { FileUploadType } from "@/components/form/input-field/file-upload";
import { Orphan } from "@/components/orphan-list/api/types";
import { icon } from "@/constants/icon";
import options from "@/constants/options";
import useStateAndLga from "@/hooks/state-and-lga";
import { getUrl } from "@/utils/api";
import { getOptions } from "@/utils/form/options";
import { getLgas } from "@/utils/nigeria-states";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import useAddOrphanApi from "../api";
import { AddEditOrphanPayload } from "../api/types";
import field from "./fields";
import useSchoolStatusField from "./hooks/school-status";

const useAddOrphansForm = ({
  orphan,
  onSuccess,
}: {
  orphan?: Orphan;
  onSuccess?: () => void;
}) => {
  const { ...hookForm } = useForm({ mode: "onChange" });
  const reset = hookForm.reset;

  const { lgaOptions } = useStateAndLga(
    hookForm.watch(field.stateOfOrigin.label)
  );

  const { disableField } = useSchoolStatusField(hookForm);

  const disableConstraint = { required: !disableField, disabled: disableField };

  const { addOrphan } = useAddOrphanApi({
    orphanId: orphan?.id,
    hookForm: hookForm,
    onSuccess: onSuccess,
  });

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

        const payload: AddEditOrphanPayload = {
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
          defaultValue: orphan?.picture,
        },
      },
      {
        label: field.gender.label,
        radioGroupField: {
          options: field.gender.options,
          required: true,
          defaultValue: orphan?.user.profile.gender,
        },
      },
      {
        label: field.firstName.label,
        textField: {
          type: "text",
          required: true,
          defaultValue: orphan?.user.profile.firstName,
        },
      },
      {
        label: field.lastName.label,
        textField: {
          type: "text",
          required: true,
          defaultValue: orphan?.user.profile.lastName,
        },
      },
      {
        label: field.affidavit.label,
        fileUploadField: {
          fileType: FileUploadType.DOC,
          text: "Drag or Drop Document",
          icon: icon.doc,
          required: true,
          defaultValue: orphan?.affidavitOfGuardianship,
        },
      },
      {
        label: field.stateOfOrigin.label,
        selectField: {
          options: field.stateOfOrigin.options,
          required: true,
          defaultValue: orphan?.user.profile.localGovernment.state.name,
        },
      },
      {
        label: field.lga.label,
        selectField: {
          options: orphan
            ? getOptions(
                getLgas(orphan?.user.profile.localGovernment.state.name) ?? []
              )
            : lgaOptions,
          required: true,
          defaultValue: orphan?.user.profile.localGovernment.name,
        },
      },
      {
        label: field.dob.label,
        dateField: {
          required: true,
          defaultValue: orphan?.user.profile.dateOfBirth
            ? dayjs(orphan?.user.profile.dateOfBirth)
            : undefined,
        },
      },
      {
        label: field.schoolStatus.label,
        selectField: {
          options: options.schoolStatus,
          required: true,
          defaultValue: orphan
            ? orphan?.schoolName
              ? options.schoolStatus[0].label
              : options.schoolStatus[1].label
            : undefined,
        },
      },
      {
        label: field.schoolName.label,
        textField: {
          type: "text",
          ...disableConstraint,
          defaultValue: orphan?.schoolName,
        },
      },
      {
        label: field.schoolAddress.label,
        textAreaField: {
          ...disableConstraint,
          defaultValue: orphan?.schoolAddress,
        },
      },
      {
        label: field.schoolContactPerson.label,
        textField: {
          type: "text",
          ...disableConstraint,
          defaultValue: orphan?.schoolContactPerson,
        },
      },
      {
        label: field.contactPersonPhone.label,
        textField: {
          type: "text",
          ...disableConstraint,
          defaultValue: orphan?.schoolContactPhone,
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

  return { form, reset };
};

export default useAddOrphansForm;
