"use client";

import { ButtonType } from "@/components/button";
import EmptyState from "@/components/empty-state";
import { FileUploadType } from "@/components/form/input-field/file-upload";
import SideModal from "@/components/side-modals";
import { icon } from "@/constants/icon";
import { image } from "@/constants/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Option } from "react-multi-select-component";

const GuardianSponsorshipRequestPage = () => {
  const {
    register,
    setValue,
    watch,
    reset,
    resetField,
    unregister,
    getValues,
    control,
  } = useForm();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const myOrphans: Option[] = [
    { label: "John Doe", value: "uuid-1" },
    { label: "Frank Doe", value: "uuid-2" },
  ];

  useEffect(() => {
    console.log("Watched Values:");
    console.log(watch());
  }, [watch()]);

  return (
    <div className="flex justify-center">
      <EmptyState
        image={{
          src: image.emptyState.sponsorshipRequest,
          alt: "sponsorship",
          width: 300,
          height: 300,
        }}
        title="You haven't created a sponsorship request yet!"
        button={{
          type: ButtonType.CONTAINED,
          icon: icon.plus,
          text: "Create sponsorship request",
          onClick: () => setOpenCreateModal(true),
        }}
      />
      {openCreateModal && (
        <SideModal
          open={openCreateModal}
          onClose={() => {
            setOpenCreateModal(false);
            reset();
          }}
          title="Create Sponsorship Request"
          form={{
            hookForm: {
              register: register,
              setValue: setValue,
              watch: watch,
              reset: reset,
              resetField: resetField,
              unregister: unregister,
              getValues: getValues,
              control: control,
            },
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
                dateField: true,
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
                    type: ButtonType.CONTAINED,
                    text: "Add Supporting Document",
                  },
                },
              },
            ],
            buttons: [
              {
                type: ButtonType.CONTAINED_DARK,
                text: "Cancel",
                onClick: () => setOpenCreateModal(false),
              },
              { type: ButtonType.CONTAINED, text: "Add", onClick: () => {} },
            ],
          }}
        />
      )}
    </div>
  );
};

export default GuardianSponsorshipRequestPage;
