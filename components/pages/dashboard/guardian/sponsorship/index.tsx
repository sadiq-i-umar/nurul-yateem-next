"use client";

import { ButtonType } from "@/components/button";
import EmptyState from "@/components/empty-state";
import { FileUploadType } from "@/components/form/input-field/file-upload";
import SideModal from "@/components/side-modals";
import { icon } from "@/constants/icon";
import { image } from "@/constants/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Option } from "react-multi-select-component";

const GuardianSponsorshipRequestPage = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const { setValue, watch, reset } = useForm();
  const [selectedOrphans, setSelectedOrphans] = useState([]);
  const myOrphans: Option[] = [];

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
          icon: {
            src: icon.plus,
            alt: "add",
            width: 20,
            height: 20,
          },
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
            inputFields: [
              {
                fileUploadField: {
                  name: "cover-image",
                  fileType: FileUploadType.IMAGE,
                  icon: {
                    src: icon.picture,
                    alt: "image-upload",
                    height: 36,
                    width: 36,
                  },
                  text: "Add image not less than 4mb",
                  value: watch("cover-image"),
                  hookForm: { setValue: setValue },
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
                  value: selectedOrphans,
                  onChange: setSelectedOrphans,
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
