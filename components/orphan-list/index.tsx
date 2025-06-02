"use client";

import { useState } from "react";
import useAddOrphansForm from "../add-orphan/form";
import Form from "../form";
import useOrphanListApi from "./api";
import { Orphan } from "./api/types";

const OrphanList: React.FC = () => {
  const { getMyOrphans, deleteOrphan, submitOrphan } = useOrphanListApi();
  const [selectedOrphan, setSelectedOrphan] = useState<Orphan>();

  const { form, reset } = useAddOrphansForm({});

  const { form: editForm, reset: editReset } = useAddOrphansForm({
    orphan: selectedOrphan,
    onSuccess: () => closeEdit(),
  });

  const openEdit = (orphan: Orphan) => {
    setSelectedOrphan(orphan);
    reset();
  };

  const closeEdit = () => {
    setSelectedOrphan(undefined);
    editReset();
  };

  return (
    <div>
      {getMyOrphans.data?.data.map((orphan) => {
        const profile = orphan.user.profile;
        return (
          <div key={orphan.id}>
            <p>{`${profile.firstName} ${profile.lastName}`}</p>
            <p>{`${orphan.status}`}</p>
            {["draft", "rejected"].includes(orphan.status) && (
              <>
                <button onClick={() => submitOrphan.mutateAsync(orphan.id)}>
                  Submit for approval
                </button>
                <button onClick={() => openEdit(orphan)}>Edit</button>
                {orphan.status === "draft" && (
                  <button onClick={() => deleteOrphan.mutateAsync(orphan.id)}>
                    Delete
                  </button>
                )}
              </>
            )}
            {orphan.status === "rejected" && (
              <p>
                {
                  orphan.ActionLog?.findLast((log) => log.action === "reject")
                    ?.comment
                }
              </p>
            )}
          </div>
        );
      })}
      {!selectedOrphan && <Form {...form} />}
      {selectedOrphan && (
        <div>
          <button onClick={closeEdit}>Close Edit</button>
          <Form {...editForm} />
        </div>
      )}
    </div>
  );
};

export default OrphanList;
