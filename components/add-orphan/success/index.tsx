"use client";

import { useRouter } from "next/navigation";

const AddOrphanSuccess = () => {
  const router = useRouter();
  return (
    <div>
      <p onClick={() => router.push("/dashboard/guardian/home")}>Dashboard</p>
      <p onClick={() => router.push("/dashboard/add-orphan")}>Add Orphan</p>
    </div>
  );
};

export default AddOrphanSuccess;
