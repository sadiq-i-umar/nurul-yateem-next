"use client";

import Button, { ButtonProps, ButtonType } from "@/components/button";
import { InputFieldProps } from "@/components/form/input-field";
import { FileUploadType } from "@/components/form/input-field/file-upload";
import Modal from "@/components/modal";
import useOrphanListApi from "@/components/orphan-list/api";
import { icon } from "@/constants/icon";
import { image } from "@/constants/image";
import { SponsorshipRequest } from "@/types/sponsorship-requests";
import { getUrl } from "@/utils/api";
import { getGroupPayload } from "@/utils/form/group-field";
import { getOrphansMultiSelectOptions } from "@/utils/form/options";
import dayjs from "dayjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Option } from "react-multi-select-component";
import useSponsorshipRequestApi from "./api";
import { CreateSponsorshipRequestDto } from "./api/types";
import field from "./fields";

const supportingDocumentsInputFields: InputFieldProps[] = [
  {
    label: field.supportingDocuments.title.label,
    textField: { type: "text", required: true },
  },
  {
    label: field.supportingDocuments.description.label,
    textAreaField: { required: true },
  },
  {
    label: field.supportingDocuments.uploadedDocument.label,
    fileUploadField: {
      fileType: FileUploadType.DOC,
      icon: icon.doc,
      text: "Drag and Drop .pdf, .png, .jpeg",
      required: true,
    },
  },
];

const GuardianSponsorshipRequest = () => {
  const { ...hookForm } = useForm();

  const { getMyOrphans } = useOrphanListApi();
  const { createSponsorshipRequest, getMySponsorshipRequests } =
    useSponsorshipRequestApi({
      hookForm: hookForm,
      onSuccess: () => setOpenCreateModal({ open: false, isEdit: false }),
    });

  const [selectedRequest, setSelectedRequest] = useState<SponsorshipRequest>();

  const [openCreateModal, setOpenCreateModal] = useState({
    open: false,
    isEdit: false,
  });
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const createButton: ButtonProps = {
    variant: ButtonType.CONTAINED,
    icon: icon.plus,
    text: "Create sponsorship request",
    onClick: () => setOpenCreateModal({ open: true, isEdit: false }),
  };

  const selectedRequestSupportingDocuments =
    selectedRequest?.SupportingDocument.map((doc) => {
      const keysToUse = Object.keys(doc).filter((key) =>
        ["title", "description", "url"].includes(key)
      );
      return keysToUse.map((_, keyIndex) => {
        const field = supportingDocumentsInputFields[keyIndex];
        return {
          ...field,
          textField: field.textField
            ? { ...field.textField, defaultValue: doc.title }
            : undefined,
          textAreaField: field.textAreaField
            ? { ...field.textAreaField, defaultValue: doc.description }
            : undefined,
          fileUploadField: field.fileUploadField
            ? { ...field.fileUploadField, defaultValue: doc.url }
            : undefined,
        };
      });
    });

  return (
    <>
      <div className="flex flex-col gap-12 p-10">
        <div className="flex justify-end">
          <Button {...createButton} />
        </div>
        {getMySponsorshipRequests?.data?.data.map((request) => (
          <div>
            <p>{request.title}</p>
            <p>{request.description}</p>
            <p>{request.targetAmount}</p>
            <p>{request.status}</p>
            <button>Submit for approval</button>
            <button
              onClick={() => {
                setSelectedRequest(request);
                setOpenCreateModal({ open: true, isEdit: true });
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
      {openCreateModal.open && (
        <Modal
          open={openCreateModal.open}
          onClose={() => {
            setOpenCreateModal({ open: false, isEdit: false });
            if (openCreateModal.isEdit) {
              setSelectedRequest(undefined);
            }
            hookForm.reset();
          }}
          sideModal
          title={
            openCreateModal.isEdit
              ? "Edit Sponsorship Request"
              : "Create Sponsorship Request"
          }
          form={{
            hookForm: hookForm,
            submit: {
              onValid: async (values) => {
                const supportingDocuments = await Promise.all(
                  getGroupPayload(hookForm, field.supportingDocuments.label, [
                    field.supportingDocuments.title.label,
                    field.supportingDocuments.description.label,
                    field.supportingDocuments.uploadedDocument.label,
                  ]).map(async (doc) => ({
                    title: doc[field.supportingDocuments.title.label],
                    description:
                      doc[field.supportingDocuments.description.label],
                    url: await getUrl(
                      doc[field.supportingDocuments.uploadedDocument.label]
                    ),
                  }))
                );
                const payload: CreateSponsorshipRequestDto = {
                  title: values[field.title.label],
                  description: values[field.description.label],
                  targetAmount: Number(values[field.targetAmount.label]),
                  deadline: dayjs(values[field.deadline.label]).toISOString(),
                  orphans: values[field.orphans.label]?.map(
                    (orphan: Option) => orphan.value
                  ),
                  supportingDocuments: supportingDocuments,
                };
                createSponsorshipRequest.mutateAsync(payload);
              },
            },
            inputFields: [
              {
                name: field.coverImage.label,
                fileUploadField: {
                  fileType: FileUploadType.IMAGE,
                  icon: icon.picture,
                  text: "Add an image not greater than 3MB",
                  required: false,
                },
              },
              {
                label: field.title.label,
                textField: {
                  type: "text",
                  required: true,
                  defaultValue: selectedRequest?.title,
                },
              },
              {
                label: field.description.label,
                textAreaField: {
                  rows: 5,
                  required: true,
                  defaultValue: selectedRequest?.description,
                },
              },
              {
                label: field.targetAmount.label,
                textField: {
                  type: "number",
                  required: true,
                  defaultValue: selectedRequest?.targetAmount,
                },
              },
              {
                label: field.deadline.label,
                dateField: {
                  required: true,
                  defaultValue: selectedRequest
                    ? dayjs(selectedRequest.deadline)
                    : undefined,
                },
              },
              {
                label: field.orphans.label,
                multiSelectField: {
                  options:
                    getOrphansMultiSelectOptions(getMyOrphans.data?.data) ?? [],
                  required: true,
                  defaultValue: getOrphansMultiSelectOptions(
                    selectedRequest?.orphans
                  ),
                },
              },
              {
                groupField: {
                  name: field.supportingDocuments.label,
                  inputFields: supportingDocumentsInputFields,
                  defaultGroups: selectedRequestSupportingDocuments,
                  actionButton: {
                    icon: icon.plus,
                    variant: ButtonType.CONTAINED,
                    text: "Add Supporting Document",
                  },
                },
              },
            ],
            buttonGroup: {
              buttons: [
                {
                  variant: ButtonType.CONTAINED_DARK,
                  text: "Cancel",
                  onClick: () =>
                    setOpenCreateModal({ open: false, isEdit: false }),
                },
                {
                  variant: ButtonType.CONTAINED,
                  type: "submit",
                  text: "Add",
                },
              ],
              position: "end",
            },
          }}
        />
      )}
      {openSuccessModal && (
        <Modal
          open={openSuccessModal}
          onClose={() => setOpenSuccessModal(false)}
          centerContent={{
            image: {
              src: image.walletSuccess,
              alt: "Wallet Success",
              width: 215,
              height: 198,
            },
            title: "SPONSORSHIP REQUEST",
            subtitle:
              "You have successfully added a sponsorship request and is currently under review.",
            button: {
              variant: ButtonType.CONTAINED,
              text: "Continue",
              onClick: () => {},
            },
          }}
        />
      )}
    </>
  );
};

export default GuardianSponsorshipRequest;
