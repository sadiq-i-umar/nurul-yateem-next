"use client";

import { ButtonVariant } from "@/components/button";
import Modal from "@/components/modal";
import { SponsorshipRequest } from "@/types/sponsorship-requests";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSponsorshipRequestApi from "../../guardian/sponsorship-requests/api";
import useSponsorshipRequestSponsorApi from "./api";

const SponsorSponsorshipRequests = () => {
  const { getPublishedRequests } = useSponsorshipRequestApi({});
  const { initializeTransaction } = useSponsorshipRequestSponsorApi();

  const sponsorshipRequests = getPublishedRequests.data?.data;

  const { ...hookForm } = useForm();

  const [selectedRequest, setSelectedRequest] = useState<SponsorshipRequest>();

  const field = {
    amount: {
      label: "Amount",
    },
    message: {
      label: "Message (Optional)",
    },
  };

  return (
    <div>
      {sponsorshipRequests?.map((request, index) => (
        <div key={index}>
          <p>{request.title}</p>
          <p>{request.description}</p>
          <p>{request.targetAmount}</p>
          <button onClick={() => setSelectedRequest(request)}>Donate</button>
        </div>
      ))}
      {selectedRequest && (
        <Modal
          open={selectedRequest ? true : false}
          onClose={() => setSelectedRequest(undefined)}
          form={{
            hookForm: hookForm,
            submit: {
              onValid: () => {
                // alert("Redirecting to third party payment platform...");
                initializeTransaction.mutateAsync({
                  sponsorshipRequestId: selectedRequest.id,
                  amount: hookForm.getValues(field.amount.label),
                });
              },
            },
            inputFields: [
              {
                label: field.amount.label,
                textField: {
                  type: "number",
                  required: true,
                },
              },
              {
                label: field.message.label,
                textAreaField: {},
              },
            ],
            buttonGroup: {
              position: "center",
              buttons: [
                {
                  variant: ButtonVariant.CONTAINED,
                  text: "Donate",
                  type: "submit",
                },
              ],
            },
          }}
        />
      )}
    </div>
  );
};

export default SponsorSponsorshipRequests;
