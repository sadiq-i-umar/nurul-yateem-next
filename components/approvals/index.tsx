"use client";

import {
  SponsorshipRequest,
  SponsorshipRequestEditRequest,
} from "@/types/sponsorship-requests";
import { useState } from "react";
import Form from "../form";
import useOrphanListApi from "../orphan-list/api";
import { Orphan } from "../orphan-list/api/types";
import useSponsorshipRequestApi from "../pages/dashboard/guardian/sponsorship-requests/api";
import useCommentForm from "./forms/rejection";

const Approvals = () => {
  const { getAllOrphans, approveOrphan } = useOrphanListApi();
  const {
    getAllSponsorshipRequests,
    getEditRequests,
    approveSponsorshipRequest,
    approveEditRequest,
  } = useSponsorshipRequestApi({});
  const [selectedOrphan, setSelectedOrphan] = useState<Orphan>();
  const [selectedSponsorshipRequest, setSelectedSponsorshipRequest] =
    useState<SponsorshipRequest>();
  const [selectedEditRequest, setSelectedEditRequest] =
    useState<SponsorshipRequestEditRequest>();

  const { form } = useCommentForm({
    orphanId: selectedOrphan?.id,
    onSuccess: () => {
      setSelectedOrphan(undefined);
      setSelectedSponsorshipRequest(undefined);
      setSelectedEditRequest(undefined);
    },
    sponsorshipRequestId: selectedSponsorshipRequest?.id,
    editRequestId: selectedEditRequest?.id,
  });

  const sponsorshipRequests = getAllSponsorshipRequests.data?.data.filter(
    (request) => request.status === "pending"
  );

  const editRequests = getEditRequests.data?.data.filter(
    (editRequest) => editRequest.status === "pending"
  );

  return (
    <>
      <div>
        <p className="font-bold">Orphans</p>
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
                    if (selectedSponsorshipRequest) {
                      setSelectedSponsorshipRequest(undefined);
                    }
                    setSelectedOrphan(orphan);
                  }}
                >
                  Reject
                </button>
              </div>
            )
        )}
      </div>
      {(selectedSponsorshipRequest ||
        selectedOrphan ||
        selectedEditRequest) && (
        <div>
          <button
            onClick={() => {
              if (selectedOrphan) setSelectedOrphan(undefined);
              if (selectedSponsorshipRequest)
                setSelectedSponsorshipRequest(undefined);
              if (selectedEditRequest) setSelectedEditRequest(undefined);
            }}
          >
            Close Form
          </button>
          <Form {...form} />
        </div>
      )}
      <div>
        <p className="font-bold">Sponsorship Requests</p>
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
                setSelectedSponsorshipRequest(request);
              }}
            >
              Reject
            </button>
          </div>
        ))}
      </div>
      <div>
        <p className="font-bold">Edit Requests</p>
        {editRequests?.map((request) => (
          <div>
            <p>{request.reason}</p>
            <button onClick={() => approveEditRequest?.mutateAsync(request.id)}>
              Approve
            </button>
            <button
              onClick={() => {
                setSelectedEditRequest(request);
              }}
            >
              Reject
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Approvals;
