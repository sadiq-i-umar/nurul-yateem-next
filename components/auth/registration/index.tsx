"use client";
import Form from "../../form";
import useRegistrationForm from "./form";

const Register = () => {
  const { form } = useRegistrationForm();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 ">
      <div></div>
      <div>
        <div className="mb-10">
          <h1>Get Started</h1>
          <p>Create your account now</p>
        </div>
        <Form {...form} />
        <p className="text-center mt-2">You already have an account? Login</p>
      </div>
    </div>
  );
};

export default Register;
