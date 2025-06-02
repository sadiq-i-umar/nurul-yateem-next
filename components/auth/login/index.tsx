"use client";

import Form from "@/components/form";
import useLoginForm from "./form";

const Login: React.FC = () => {
  const { form } = useLoginForm();
  return <Form {...form} />;
};

export default Login;
