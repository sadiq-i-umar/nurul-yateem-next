"use client";

import { ButtonVariant } from "@/components/button";
import Modal from "@/components/modal";
import { SponsorshipRequest } from "@/types/sponsorship-requests";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSponsorshipRequestApi from "../../guardian/sponsorship-requests/api";

const SponsorSponsorshipRequests = () => {
  const { getAllSponsorshipRequests } = useSponsorshipRequestApi({});

  const sponsorshipRequests = getAllSponsorshipRequests.data?.data.filter(
    (request) => request.status === "published"
  );

  const { ...hookForm } = useForm();

  const [selectedRequest, setSelectedRequest] = useState<SponsorshipRequest>();

  return (
    <div>
      {sponsorshipRequests?.map((request) => (
        <div>
          <p>{JSON.stringify(request)}</p>
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
                alert("Redirecting to third party payment platform...");
              },
            },
            inputFields: [
              {
                label: "Amount",
                textField: {
                  type: "number",
                  required: true,
                },
              },
              {
                label: "Message (Optional)",
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
