"use client";
import Form from "../form";
import useAddOrphansForm from "./form";

const AddOrphans = () => {
  const { form } = useAddOrphansForm();

  return <Form {...form} />;
};

export default AddOrphans;
