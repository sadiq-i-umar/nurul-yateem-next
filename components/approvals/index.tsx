"use client";

import { useState } from "react";
import Form from "../form";
import useOrphanListApi from "../orphan-list/api";
import { Orphan } from "../orphan-list/api/types";
import useRejectOrphanForm from "./forms/reject-orphan";

const Approvals = () => {
  const { getAllOrphans, approveOrphan } = useOrphanListApi();
  const [selectedOrphan, setSelectedOrphan] = useState<Orphan>();
  const { form } = useRejectOrphanForm(selectedOrphan?.id, () =>
    setSelectedOrphan(undefined)
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
              <button onClick={() => setSelectedOrphan(orphan)}>Reject</button>
            </div>
          )
      )}
      {selectedOrphan && (
        <div>
          <button onClick={() => setSelectedOrphan(undefined)}>
            Close Form
          </button>
          <Form {...form} />
        </div>
      )}
    </>
  );
};

export default Approvals;
