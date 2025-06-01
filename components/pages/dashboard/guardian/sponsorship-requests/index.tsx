"use client";

import useActionApi from "@/components/action/api";
import { PerformActionMutationProps } from "@/components/action/types";
import { getSnapshot } from "@/components/action/utils";
import useCommentForm from "@/components/approvals/forms/comment";
import Button, { ButtonProps, ButtonVariant } from "@/components/button";
import { FileUploadType } from "@/components/form/input-field/file-upload";
import Modal from "@/components/modal";
import useOrphanListApi from "@/components/orphan-list/api";
import { icon } from "@/constants/icon";
import { image } from "@/constants/image";
import { Action } from "@/types/action";
import { Entity } from "@/types/entity";
import { SponsorshipRequest } from "@/types/sponsorship-requests";
import { Status } from "@/types/status";
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
import { supportingDocumentsInputFields } from "./fields/input";

const GuardianSponsorshipRequest = () => {
  const [selectedRequest, setSelectedRequest] = useState<SponsorshipRequest>();

  const [actionMutationProps, setActionMutationProps] =
    useState<PerformActionMutationProps>();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [isRequestEditModal, setIsRequestEditModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);

  const { getMySponsorshipRequests, deleteSupportingDocument } =
    useSponsorshipRequestApi({});
  const { getMyOrphans } = useOrphanListApi();
  const { performActionMutation } = useActionApi({
    onSuccess: () => {
      setOpenCreateModal(false);
      setIsEditModal(false);
      setSelectedRequest(undefined);
      hookForm.reset();
    },
  });

  const mySponsorshipRequests = getMySponsorshipRequests.data?.data;

  const { ...hookForm } = useForm();
  const { form: commentForm } = useCommentForm({
    onSuccess: () => {
      setOpenCommentModal(false);
      setActionMutationProps(undefined);
      setOpenCreateModal(false);
      setSelectedRequest(undefined);
      hookForm.reset();
      commentForm.hookForm?.reset();
    },
    commentFieldLabel: "Additional Comment",
    performActionMutationProps: actionMutationProps,
  });

  const createButton: ButtonProps = {
    variant: ButtonVariant.CONTAINED,
    icon: icon.plus,
    text: "Create sponsorship request",
    onClick: () => setOpenCreateModal(true),
  };

  const selectedRequestSupportingDocuments =
    selectedRequest?.supportingDocuments.map((doc) => {
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
          return (
            <div key={request.id}>
              <p>{request.title}</p>
              <p>{request.description}</p>
              <p>{request.targetAmount}</p>
              <p>{request.status}</p>
              <div className="flex gap-2 font-bold underline">
                {[Status.draft, Status.rejected].includes(request.status) && (
                  <button
                    onClick={() => {
                      setOpenCommentModal(true);
                      setActionMutationProps({
                        data: {
                          snapshot: getSnapshot(request),
                        },
                        params: {
                          entityId: request.id,
                          entity: Entity.sponsorshipRequest,
                          action: Action.request_approval,
                        },
                      });
                    }}
                  >
                    Request Approval
                  </button>
                )}
                {request.status === Status.draft && (
                  <button
                    onClick={() => {
                      setOpenCreateModal(true);
                      setIsEditModal(true);
                      setSelectedRequest(request);
                    }}
                  >
                    Edit
                  </button>
                )}
                {request.status === Status.draft && (
                  <button
                    onClick={() =>
                      performActionMutation.mutateAsync({
                        data: {
                          snapshot: getSnapshot(request),
                        },
                        params: {
                          entity: Entity.sponsorshipRequest,
                          entityId: request.id,
                          action: Action.delete,
                        },
                      })
                    }
                  >
                    Delete
                  </button>
                )}
                {[Status.approved, Status.edit_approved].includes(
                  request.status
                ) && (
                  <button
                    onClick={() =>
                      performActionMutation.mutateAsync({
                        data: {
                          snapshot: getSnapshot(request),
                        },
                        params: {
                          entity: Entity.sponsorshipRequest,
                          entityId: request.id,
                          action: Action.publish,
                        },
                      })
                    }
                  >
                    Publish
                  </button>
                )}
                {[
                  Status.edit_rejected,
                  Status.publish_rejected,
                  Status.reopened,
                ].includes(request.status) && (
                  <button
                    onClick={() => {
                      setOpenCommentModal(true);
                      setActionMutationProps({
                        data: {
                          snapshot: getSnapshot(request),
                        },
                        params: {
                          entityId: request.id,
                          entity: Entity.sponsorshipRequest,
                          action: Action.request_publish,
                        },
                      });
                    }}
                  >
                    {" "}
                    Request Publish
                  </button>
                )}
                {[
                  Status.approved,
                  Status.rejected,
                  Status.edit_rejected,
                  Status.edit_approved,
                  Status.published,
                  Status.publish_rejected,
                  Status.reopened,
                ].includes(request.status) && (
                  <>
                    {request.actionLogs.at(0)?.toStatus ===
                      Status.edit_rejected && (
                      <button
                        onClick={() => {
                          setOpenCommentModal(true);
                          setActionMutationProps({
                            data: {
                              snapshot: getSnapshot(request),
                              change: request.actionLogs.at(0)?.change,
                            },
                            params: {
                              entityId: request.id,
                              entity: Entity.sponsorshipRequest,
                              action: Action.request_edit,
                            },
                          });
                        }}
                      >
                        Request Last Edit
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setIsRequestEditModal(true);
                        setSelectedRequest(request);
                        setOpenCreateModal(true);
                      }}
                    >
                      Request Edit
                    </button>
                  </>
                )}
                {![
                  Status.draft,
                  Status.approval_requested,
                  Status.edit_requested,
                  Status.publish_requested,
                  Status.closed,
                  Status.reopen_publish_requested,
                  Status.reopen_publish_rejected,
                  Status.reopen_requested,
                  Status.reopen_rejected,
                ].includes(request.status) && (
                  <button
                    onClick={() => {
                      setOpenCommentModal(true);
                      setActionMutationProps({
                        data: {
                          snapshot: getSnapshot(request),
                        },
                        params: {
                          entityId: request.id,
                          entity: Entity.sponsorshipRequest,
                          action: Action.close,
                        },
                      });
                    }}
                  >
                    Close
                  </button>
                )}
                {[
                  Status.closed,
                  Status.reopen_publish_rejected,
                  Status.reopen_rejected,
                ].includes(request.status) && (
                  <>
                    <button
                      onClick={() => {
                        setOpenCommentModal(true);
                        setActionMutationProps({
                          data: {
                            snapshot: getSnapshot(request),
                          },
                          params: {
                            entityId: request.id,
                            entity: Entity.sponsorshipRequest,
                            action: Action.request_reopen_publish,
                          },
                        });
                      }}
                    >
                      Re-open (Publish)
                    </button>
                    <button
                      onClick={() => {
                        setOpenCommentModal(true);
                        setActionMutationProps({
                          data: {
                            snapshot: getSnapshot(request),
                          },
                          params: {
                            entityId: request.id,
                            entity: Entity.sponsorshipRequest,
                            action: Action.request_reopen,
                          },
                        });
                      }}
                    >
                      Re-open
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {openCreateModal && (
        <Modal
          open={openCreateModal}
          onClose={() => {
            setOpenCreateModal(false);
            setIsEditModal(false);
            setIsRequestEditModal(false);
            hookForm.reset();
          }}
          sideModal
          title={`${
            isEditModal || isRequestEditModal ? "Edit" : "Create"
          } Sponsorship Request`}
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
                    id:
                      isEditModal || isRequestEditModal
                        ? selectedRequest?.supportingDocuments[index].id
                        : undefined,
                    title: doc[field.supportingDocuments.title.label],
                    description:
                      doc[field.supportingDocuments.description.label],
                    url: await getUrl(
                      doc[field.supportingDocuments.uploadedDocument.label]
                    ),
                    isArchived:
                      selectedRequest?.supportingDocuments[index].isArchived ??
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
                if (isRequestEditModal) {
                  setActionMutationProps({
                    data: {
                      snapshot: getSnapshot(selectedRequest),
                      change: payload,
                    },
                    params: {
                      entity: Entity.sponsorshipRequest,
                      entityId: selectedRequest?.id,
                      action: Action.request_edit,
                    },
                  });
                  setOpenCommentModal(true);
                } else {
                  performActionMutation.mutateAsync({
                    data: {
                      snapshot: getSnapshot(selectedRequest),
                      change: payload,
                    },
                    params: {
                      entityId: isEditModal ? selectedRequest?.id : undefined,
                      entity: Entity.sponsorshipRequest,
                      action: isEditModal ? Action.edit : Action.create,
                    },
                  });
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
                        selectedRequest?.supportingDocuments[groupIndex].id,
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
                  onClick: () => {},
                },
                {
                  variant: ButtonVariant.CONTAINED,
                  type: "submit",
                  text: isEditModal
                    ? "Edit"
                    : isRequestEditModal
                    ? "Request Edit"
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
      {openCommentModal && (
        <Modal
          open={openCommentModal}
          onClose={() => {
            setOpenCommentModal(false);
            commentForm.hookForm?.reset();
          }}
          title="Request Action"
          form={commentForm}
        />
      )}
    </>
  );
};

export default GuardianSponsorshipRequest;
