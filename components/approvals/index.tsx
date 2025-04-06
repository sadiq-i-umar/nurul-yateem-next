"use client";

import { SponsorshipRequest } from "@/types/sponsorship-requests";
import { useState } from "react";
import Form from "../form";
import useOrphanListApi from "../orphan-list/api";
import { Orphan } from "../orphan-list/api/types";
import useSponsorshipRequestApi from "../pages/dashboard/guardian/sponsorship-requests/api";
import useRejectionForm from "./forms/rejection";

const Approvals = () => {
  const { getAllOrphans, approveOrphan } = useOrphanListApi();
  const { getAllSponsorshipRequests, approveSponsorshipRequest } =
    useSponsorshipRequestApi({});
  const [selectedOrphan, setSelectedOrphan] = useState<Orphan>();
  const [selectedRequest, setSelectedRequest] = useState<SponsorshipRequest>();
  const { form } = useRejectionForm({
    orphanId: selectedOrphan?.id,
    onSuccess: () => {
      setSelectedOrphan(undefined);
      setSelectedRequest(undefined);
    },
    sponsorshipRequestId: selectedRequest?.id,
  });

  const sponsorshipRequests = getAllSponsorshipRequests.data?.data.filter(
    (request) => request.status === "pending"
  );

  return (
    <>
      {getAllOrphans.data?.data.map(
        (orphan) =>
          orphan.status === "pending" && (
            <div>
              <p>{`${orphan.user.profile.firstName} ${orphan.user.profile.lastName}`}</p>
              <p>{`${orphan.status}`}</p>
              <button onClick={() => approveOrphan.mutateAsync(orphan.id)}>
                Approve
              </button>
              <button
                onClick={() => {
                  if (selectedRequest) {
                    setSelectedRequest(undefined);
                  }
                  setSelectedOrphan(orphan);
                }}
              >
                Reject
              </button>
            </div>
          )
      )}
      {(selectedRequest || selectedOrphan) && (
        <div>
          <button
            onClick={() => {
              if (selectedOrphan) setSelectedOrphan(undefined);
              if (selectedRequest) setSelectedRequest(undefined);
            }}
          >
            Close Form
          </button>
          <Form {...form} />
        </div>
      )}
      {sponsorshipRequests?.map((request) => (
        <div>
          <p>{request.title}</p>
          <p>{request.status}</p>
          <button
            onClick={() => approveSponsorshipRequest.mutateAsync(request.id)}
          >
            Approve
          </button>
          <button
            onClick={() => {
              if (selectedOrphan) {
                setSelectedOrphan(undefined);
              }
              setSelectedRequest(request);
            }}
          >
            Reject
          </button>
        </div>
      ))}
    </>
  );
};

export default Approvals;
