"use client";
import { useRouter } from "next/navigation";
import Form from "../form";
import useAddOrphansForm from "./form";

const AddOrphans = () => {
  const router = useRouter();
  const { form } = useAddOrphansForm({
    onSuccess: () => {
      router.push("/dashboard/add-orphan-success");
    },
  });

  return <Form {...form} />;
};

export default AddOrphans;
