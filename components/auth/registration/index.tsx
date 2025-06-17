"use client";
import ReusableAuth from "../reusable";
import useRegistrationForm from "./form";

const Register = () => {
  const { form } = useRegistrationForm();
  return (
    <ReusableAuth
      title="Get Started"
      subtitle="Create your account now"
      form={form}
      centerImage="/hero_picture_reg.png"
      infoBottomText={{
        initial:
          "Be the change you want to see in the world – join us in transforming lives and making a lasting impact. ",
        middle: "Sign up now ",
        end: "to become a beacon of hope and support our mission for a brighter tomorrow.",
        highlight: "middle",
      }}
      formBottomText={{
        plainText: "You already have an account? ",
        link: "/login",
        linkText: "Login",
      }}
    />
  );
};

export default Register;
