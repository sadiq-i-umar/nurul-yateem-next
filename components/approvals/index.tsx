"use client";

import { Action } from "@/types/action";
import { Entity } from "@/types/entity";
import { Status } from "@/types/status";
import { useState } from "react";
import useActionApi from "../action/api";
import { PerformActionMutationProps } from "../action/types";
import { getSnapshot } from "../action/utils";
import Form from "../form";
import useOrphanListApi from "../orphan-list/api";
import { Orphan } from "../orphan-list/api/types";
import useSponsorshipRequestApi from "../pages/dashboard/guardian/sponsorship-requests/api";
import useCommentForm from "./forms/comment";

const Approvals = () => {
  const { getAllOrphans, approveOrphan } = useOrphanListApi();
  const {
    getApprovalRequests,
    getEditRequests,
    getPublishRequests,
    getReopenPublishRequests,
    getReopenRequests,
  } = useSponsorshipRequestApi({});
  const { performActionMutation } = useActionApi({});
  const [selectedOrphan, setSelectedOrphan] = useState<Orphan>();
  const [actionMutationProps, setActionMutationProps] =
    useState<PerformActionMutationProps>();

  const { form } = useCommentForm({
    onSuccess: () => {
      setSelectedOrphan(undefined);
      setActionMutationProps(undefined);
    },
    performActionMutationProps: actionMutationProps,
  });

  const approvalRequests = getApprovalRequests.data?.data;
  const editRequests = getEditRequests.data?.data;
  const publishRequests = getPublishRequests.data?.data;
  const reopenPublishRequests = getReopenPublishRequests.data?.data;
  const reopenRequests = getReopenRequests.data?.data;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="font-bold">Orphans</p>
        {getAllOrphans.data?.data.map(
          (orphan) =>
            orphan.status === Status.pending && (
              <div key={orphan.id}>
                <p>{`${orphan.user.profile.firstName} ${orphan.user.profile.lastName}`}</p>
                <p>{`${orphan.status}`}</p>
                <button onClick={() => approveOrphan.mutateAsync(orphan.id)}>
                  Approve
                </button>
                <button
                  onClick={() => {
                    setSelectedOrphan(orphan);
                  }}
                >
                  Reject
                </button>
              </div>
            )
        )}
      </div>
      {(actionMutationProps || selectedOrphan) && (
        <div>
          <button
            onClick={() => {
              if (selectedOrphan) setSelectedOrphan(undefined);
              setActionMutationProps(undefined);
            }}
          >
            Close Form
          </button>
          <Form {...form} />
        </div>
      )}
      <div>
        <p className="font-bold">Sponsorship Requests Approval</p>
        {approvalRequests?.map((request) => (
          <div key={request.id}>
            <p>{request.title}</p>
            <p>{request.status}</p>
            <button
              onClick={() =>
                performActionMutation.mutateAsync({
                  data: {
                    snapshot: getSnapshot(request),
                  },
                  params: {
                    entity: Entity.sponsorshipRequest,
                    entityId: request.id,
                    action: Action.approve,
                  },
                })
              }
            >
              Approve
            </button>
            <button
              onClick={() =>
                setActionMutationProps({
                  data: {
                    snapshot: getSnapshot(request),
                  },
                  params: {
                    entity: Entity.sponsorshipRequest,
                    entityId: request.id,
                    action: Action.reject,
                  },
                })
              }
            >
              Reject
            </button>
          </div>
        ))}
      </div>
      <div>
        <p className="font-bold">Edit Requests</p>
        {editRequests?.map((request) => (
          <div key={request.id}>
            <p>{request.title}</p>
            <p>{request.status}</p>
            <button
              onClick={() =>
                performActionMutation.mutateAsync({
                  data: {
                    snapshot: getSnapshot(request),
                    change: request.actionLogs.at(0)?.change,
                  },
                  params: {
                    entity: Entity.sponsorshipRequest,
                    entityId: request.id,
                    action: Action.approve_edit,
                  },
                })
              }
            >
              Approve
            </button>
            <button
              onClick={() =>
                setActionMutationProps({
                  data: {
                    snapshot: getSnapshot(request),
                    change: request.actionLogs.at(0)?.change,
                  },
                  params: {
                    entity: Entity.sponsorshipRequest,
                    entityId: request.id,
                    action: Action.reject_edit,
                  },
                })
              }
            >
              Reject
            </button>
          </div>
        ))}
      </div>
      <div>
        <p className="font-bold">Publish Requests</p>
        {publishRequests?.map((request) => (
          <div key={request.id}>
            <p>{request.title}</p>
            <p>{request.status}</p>
            <button
              onClick={() =>
                performActionMutation.mutateAsync({
                  data: {
                    snapshot: getSnapshot(request),
                  },
                  params: {
                    entity: Entity.sponsorshipRequest,
                    entityId: request.id,
                    action: Action.approve_publish,
                  },
                })
              }
            >
              Approve
            </button>
            <button
              onClick={() =>
                setActionMutationProps({
                  data: {
                    snapshot: getSnapshot(request),
                  },
                  params: {
                    entity: Entity.sponsorshipRequest,
                    entityId: request.id,
                    action: Action.reject_publish,
                  },
                })
              }
            >
              Reject
            </button>
          </div>
        ))}
      </div>
      <div>
        <p className="font-bold">Reopen (Publish) Requests</p>
        {reopenPublishRequests?.map((request) => (
          <div key={request.id}>
            <p>{request.title}</p>
            <p>{request.status}</p>
            <button
              onClick={() =>
                performActionMutation.mutateAsync({
                  data: {
                    snapshot: getSnapshot(request),
                  },
                  params: {
                    entity: Entity.sponsorshipRequest,
                    entityId: request.id,
                    action: Action.approve_reopen_publish,
                  },
                })
              }
            >
              Approve
            </button>
            <button
              onClick={() =>
                setActionMutationProps({
                  data: {
                    snapshot: getSnapshot(request),
                  },
                  params: {
                    entity: Entity.sponsorshipRequest,
                    entityId: request.id,
                    action: Action.reject_reopen_publish,
                  },
                })
              }
            >
              Reject
            </button>
          </div>
        ))}
      </div>
      <div>
        <p className="font-bold">Reopen Requests</p>
        {reopenRequests?.map((request) => (
          <div key={request.id}>
            <p>{request.title}</p>
            <p>{request.status}</p>
            <button
              onClick={() =>
                performActionMutation.mutateAsync({
                  data: {
                    snapshot: getSnapshot(request),
                  },
                  params: {
                    entity: Entity.sponsorshipRequest,
                    entityId: request.id,
                    action: Action.approve_reopen,
                  },
                })
              }
            >
              Approve
            </button>
            <button
              onClick={() =>
                setActionMutationProps({
                  data: {
                    snapshot: getSnapshot(request),
                  },
                  params: {
                    entity: Entity.sponsorshipRequest,
                    entityId: request.id,
                    action: Action.reject_reopen,
                  },
                })
              }
            >
              Reject
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Approvals;
