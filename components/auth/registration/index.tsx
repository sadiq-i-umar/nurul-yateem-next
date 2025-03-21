"use client";
import Form from "../../form";
import useRegistrationForm from "./form";

const Register = () => {
  const { form } = useRegistrationForm();
  return <Form {...form} />;
};

export default Register;
