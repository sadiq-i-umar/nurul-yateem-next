"use client";

import useCommentForm from "@/components/approvals/forms/comment";
import Button, { ButtonProps, ButtonVariant } from "@/components/button";
import { InputFieldProps } from "@/components/form/input-field";
import { FileUploadType } from "@/components/form/input-field/file-upload";
import Modal from "@/components/modal";
import useOrphanListApi from "@/components/orphan-list/api";
import { Status } from "@/components/orphan-list/api/types";
import { icon } from "@/constants/icon";
import { image } from "@/constants/image";
import {
  SponsorshipRequest,
  SponsorshipRequestEditRequest,
} from "@/types/sponsorship-requests";
import { getUrl } from "@/utils/api";
import { getGroupPayload } from "@/utils/form/group-field";
import { getOrphansMultiSelectOptions } from "@/utils/form/options";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
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
  const { getMyOrphans } = useOrphanListApi();
  const [selectedRequest, setSelectedRequest] = useState<SponsorshipRequest>();
  const [selectedEditRequest, setSelectedEditRequest] =
    useState<SponsorshipRequestEditRequest>();
  const [editPayload, setEditPayload] = useState<CreateSponsorshipRequestDto>();

  const [openCreateModal, setOpenCreateModal] = useState({
    open: false,
    isEdit: false,
    isRequestEdit: false,
  });
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openReasonModal, setOpenReasonModal] = useState<{
    open: boolean;
    isResubmit?: boolean;
    isPublishRequest?: boolean;
  }>({ open: false });

  const { ...hookForm } = useForm();
  const { form: commentForm } = useCommentForm({
    onSuccess: () => {
      if (
        openCreateModal.isRequestEdit ||
        openReasonModal.isResubmit ||
        openReasonModal.isPublishRequest
      ) {
        setOpenCreateModal({
          open: false,
          isEdit: false,
          isRequestEdit: false,
        });
        setOpenReasonModal({
          open: false,
          isPublishRequest: false,
          isResubmit: false,
        });
        setEditPayload(undefined);
        setSelectedRequest(undefined);
        setSelectedEditRequest(undefined);
      }
      hookForm.reset();
      commentForm.hookForm?.reset();
    },
    sponsorshipRequestId: selectedRequest?.id,
    sponsorshipRequestEditPayload: editPayload,
    commentFieldLabel: `Reason for ${
      openReasonModal.isPublishRequest
        ? "publishing without edit"
        : "requesting the edit"
    }`,
    editRequestId: selectedEditRequest?.id,
    resubmit: openReasonModal.isResubmit,
    publishRequest: openReasonModal.isPublishRequest,
  });

  const {
    createEditSponsorshipRequest,
    getMySponsorshipRequests,
    deleteSponsorshipRequest,
    deleteSupportingDocument,
    submitSponsorshipRequest,
  } = useSponsorshipRequestApi({
    onSuccess: () => {
      if (!selectedRequest) {
        setOpenCreateModal({
          open: false,
          isEdit: false,
          isRequestEdit: false,
        });
      }
    },
    selectedRequestId: selectedRequest?.id,
  });

  const mySponsorshipRequests = getMySponsorshipRequests.data?.data;

  const createButton: ButtonProps = {
    variant: ButtonVariant.CONTAINED,
    icon: icon.plus,
    text: "Create sponsorship request",
    onClick: () =>
      setOpenCreateModal({ open: true, isEdit: false, isRequestEdit: false }),
  };

  const selectedRequestSupportingDocuments =
    selectedRequest?.SupportingDocument.map((doc) => {
      const keysToUse = Object.keys(doc).filter((formKey) =>
        ["title", "description", "url"].includes(formKey)
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

  //For re-rendering the form when a sponsorship request is updated
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    if (mySponsorshipRequests) {
      hookForm.reset();
      hookForm.unregister();
      const editedRequest = mySponsorshipRequests.find(
        (request) => request.id === selectedRequest?.id
      );
      setSelectedRequest(editedRequest);
      setFormKey(formKey + 1);
    } else {
      hookForm.reset();
    }
  }, [mySponsorshipRequests]);

  return (
    <>
      <div className="flex flex-col gap-12 p-10">
        <div className="flex justify-end">
          <Button {...createButton} />
        </div>
        {getMySponsorshipRequests?.data?.data.map((request) => {
          const isRequiredStatus = (statuses: Status[]) => {
            return statuses.includes(request.status);
          };

          const mostRecentEditRequest = request.EditRequest.at(0);

          const mostRecentEditRequestActionLog =
            mostRecentEditRequest?.ActionLog.at(0);

          return (
            <div>
              <p>{request.title}</p>
              <p>{request.description}</p>
              <p>{request.targetAmount}</p>
              <p>{request.status}</p>
              {mostRecentEditRequest?.status === "rejected" &&
                request.PublishRequest.at(0)?.status !== "pending" && (
                  <div>
                    <button
                      onClick={() => {
                        setOpenReasonModal({
                          open: true,
                          isPublishRequest: true,
                        });
                        setSelectedRequest(request);
                      }}
                    >
                      Request publish without edit
                    </button>
                    <button
                      onClick={() => {
                        setOpenReasonModal({ open: true, isResubmit: true });
                        setSelectedEditRequest(mostRecentEditRequest);
                      }}
                    >
                      Request last edit with different reason
                    </button>
                    <span>
                      Edit Request Rejected. Reason:
                      {mostRecentEditRequestActionLog?.reason}
                    </span>
                    {request.PublishRequest.at(0)?.status === "rejected" && (
                      <p>
                        Publish Reject Reason:{" "}
                        {request.PublishRequest.at(0)?.ActionLog.at(0)?.reason}
                      </p>
                    )}
                  </div>
                )}
              {isRequiredStatus(["draft", "rejected"]) && (
                <>
                  <button
                    onClick={() =>
                      submitSponsorshipRequest.mutateAsync(request.id)
                    }
                  >
                    Submit for approval
                  </button>

                  <button
                    onClick={() => {
                      setSelectedRequest(request);
                      setOpenCreateModal({
                        open: true,
                        isEdit: true,
                        isRequestEdit: false,
                      });
                    }}
                  >
                    Edit
                  </button>
                  {request.status !== "rejected" && (
                    <button
                      onClick={() =>
                        deleteSponsorshipRequest.mutateAsync(request.id)
                      }
                    >
                      Delete
                    </button>
                  )}
                </>
              )}
              {/* {request.status === "approved" && (
                <button
                  onClick={() =>
                    publishSponsorshipRequest.mutateAsync(request.id)
                  }
                >
                  Publish
                </button>
              )} */}
              {isRequiredStatus(["approved", "published"]) &&
                (request.editRequested ? (
                  <p>Edit Requested</p>
                ) : (
                  request.PublishRequest.at(0)?.status !== "pending" && (
                    <div>
                      {mostRecentEditRequest?.status !== "rejected" && (
                        <button>Publish</button>
                      )}
                      <button
                        onClick={() => {
                          setOpenCreateModal({
                            open: true,
                            isEdit: false,
                            isRequestEdit: true,
                          });
                          setSelectedRequest(request);
                        }}
                      >
                        Request Edit
                      </button>
                    </div>
                  )
                ))}
              {request.PublishRequest.at(0)?.status === "pending" && (
                <div>Publish Requested</div>
              )}
            </div>
          );
        })}
      </div>
      {openCreateModal.open && (
        <Modal
          open={openCreateModal.open}
          onClose={() => {
            setOpenCreateModal({
              open: false,
              isEdit: false,
              isRequestEdit: false,
            });
            if (openCreateModal.isEdit || openCreateModal.isRequestEdit) {
              setSelectedRequest(undefined);
            }
            hookForm.reset();
          }}
          sideModal
          title={
            openCreateModal.isEdit || openCreateModal.isRequestEdit
              ? "Edit Sponsorship Request"
              : "Create Sponsorship Request"
          }
          form={{
            hookForm: hookForm,
            key: formKey,
            submit: {
              onValid: async (values) => {
                const supportingDocuments = await Promise.all(
                  getGroupPayload(hookForm, field.supportingDocuments.label, [
                    field.supportingDocuments.title.label,
                    field.supportingDocuments.description.label,
                    field.supportingDocuments.uploadedDocument.label,
                  ]).map(async (doc, index) => ({
                    id: openCreateModal.isEdit
                      ? selectedRequest?.SupportingDocument[index].id
                      : undefined,
                    title: doc[field.supportingDocuments.title.label],
                    description:
                      doc[field.supportingDocuments.description.label],
                    url: await getUrl(
                      doc[field.supportingDocuments.uploadedDocument.label]
                    ),
                    isArchived:
                      selectedRequest?.SupportingDocument[index].isArchived ??
                      false,
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
                if (openCreateModal.isRequestEdit) {
                  setEditPayload(payload);
                  setOpenReasonModal({ open: true });
                } else {
                  createEditSponsorshipRequest.mutateAsync(payload);
                }
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
                    variant: ButtonVariant.CONTAINED,
                    text: "Add Supporting Document",
                  },
                  onDeleteClick: (groupIndex) => {
                    deleteSupportingDocument.mutateAsync({
                      id: selectedRequest?.id,
                      attachmentId:
                        selectedRequest?.SupportingDocument[groupIndex].id,
                    });
                  },
                },
              },
            ],
            buttonGroup: {
              buttons: [
                {
                  variant: ButtonVariant.CONTAINED_DARK,
                  text: "Cancel",
                  onClick: () =>
                    setOpenCreateModal({
                      open: false,
                      isEdit: false,
                      isRequestEdit: false,
                    }),
                },
                {
                  variant: ButtonVariant.CONTAINED,
                  type: "submit",
                  text: selectedRequest
                    ? openCreateModal.isEdit
                      ? "Edit"
                      : "Request Edit"
                    : "Add",
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
              variant: ButtonVariant.CONTAINED,
              text: "Continue",
              onClick: () => {},
            },
          }}
        />
      )}
      {openReasonModal.open && (
        <Modal
          open={openReasonModal.open}
          onClose={() => {
            setOpenReasonModal({
              open: false,
              isPublishRequest: false,
              isResubmit: false,
            });
            commentForm.hookForm?.reset();
          }}
          title={`Request ${
            openReasonModal.isPublishRequest ? "Publish" : "Edit"
          }`}
          form={commentForm}
        />
      )}
    </>
  );
};

export default GuardianSponsorshipRequest;
