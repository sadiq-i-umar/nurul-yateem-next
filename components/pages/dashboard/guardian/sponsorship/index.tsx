"use client";

import Button, { ButtonProps, ButtonType } from "@/components/button";
import EmptyState from "@/components/empty-state";
import { FileUploadType } from "@/components/form/input-field/file-upload";
import Modal from "@/components/modal";
import SponsorshipRequestCard, {
  SponsorshipRequestCardProps,
} from "@/components/sponsorship-request-card";
import { icon } from "@/constants/icon";
import { image } from "@/constants/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Option } from "react-multi-select-component";

const GuardianSponsorshipRequest = () => {
  const { ...hookForm } = useForm();

  const [showEmptyState] = useState(false);

  const [openCreateModal, setOpenCreateModal] = useState({
    open: false,
    isEdit: false,
  });
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const myOrphans: Option[] = [
    { label: "John Doe", value: "uuid-1" },
    { label: "Frank Doe", value: "uuid-2" },
  ];

  const createButton: ButtonProps = {
    variant: ButtonType.CONTAINED,
    icon: icon.plus,
    text: "Create sponsorship request",
    onClick: () => setOpenCreateModal({ open: true, isEdit: false }),
  };

  return (
    <>
      {showEmptyState ? (
        <div className="flex justify-center">
          <EmptyState
            image={{
              src: image.emptyState.sponsorshipRequest,
              alt: "sponsorship",
              width: 300,
              height: 300,
            }}
            title="You haven't created a sponsorship request yet!"
            button={createButton}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-12 p-10">
          <div className="flex justify-end">
            <Button {...createButton} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-10">
            {Array(3)
              .fill({
                title: "Operation Save the children",
                dateCreated: "22 Jan 2022",
                donationProgress: 40,
                description:
                  "Pupils need to have uniforms for school and are in dire need. The more you reach out the more you get help as well. The objective is to reach out to 5000 Orphaned children.",
                status: "pending",
                orphans: ["1", "2", "3", "4", "5"],
                onEditClick: () =>
                  setOpenCreateModal({ open: true, isEdit: true }),
              } as SponsorshipRequestCardProps)
              .map((card) => (
                <SponsorshipRequestCard {...card} />
              ))}
          </div>
        </div>
      )}
      {openCreateModal.open && (
        <Modal
          open={openCreateModal.open}
          onClose={() => {
            setOpenCreateModal({ open: false, isEdit: false });
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
            inputFields: [
              {
                name: "Cover Image",
                fileUploadField: {
                  fileType: FileUploadType.IMAGE,
                  icon: icon.picture,
                  text: "Add an image not greater than 4mb",
                },
              },
              {
                label: "Title",
                textField: {
                  type: "text",
                },
              },
              {
                label: "Description",
                textAreaField: {
                  rows: 5,
                },
              },
              {
                label: "Target Amount",
                textField: {
                  type: "number",
                },
              },
              {
                label: "Deadline",
                dateField: {
                  required: true,
                },
              },
              {
                label: "Orphans",
                multiSelectField: {
                  options: myOrphans,
                },
              },
              {
                groupField: {
                  name: "Supporting Documents",
                  inputFields: [
                    { label: "Title", textField: { type: "text" } },
                    { label: "Description", textField: { type: "message" } },
                    {
                      label: "Uploaded Document",
                      fileUploadField: {
                        fileType: FileUploadType.DOC,
                        icon: icon.doc,
                        text: "Drag and Drop .pdf, .png, .jpeg",
                      },
                    },
                  ],
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
                  type: ButtonType.CONTAINED_DARK,
                  text: "Cancel",
                  onClick: () =>
                    setOpenCreateModal({ open: false, isEdit: false }),
                },
                {
                  type: ButtonType.CONTAINED,
                  text: "Add",
                  onClick: () => {
                    setOpenSuccessModal(true);
                    setOpenCreateModal({ open: false, isEdit: false });
                  },
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
