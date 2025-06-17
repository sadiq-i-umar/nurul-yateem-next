"use client";
import ReusableAuth from "../reusable";
import useLoginForm from "./form";

const Login: React.FC = () => {
  const { form } = useLoginForm();
  return (
    <ReusableAuth
      title="Login"
      subtitle="Please provide your login credentials"
      form={form}
      centerImage="/login-hero.png"
      infoBottomText={{
        initial:
          "Be the change you want to see in the world – join us in transforming lives and making a lasting impact. ",
        middle: "Donate Now!",
        end: "",
        highlight: "middle",
      }}
      formBottomText={{
        plainText: "You don't have an account? ",
        link: "/register",
        linkText: "Create an account",
      }}
    />
  );
};

export default Login;
