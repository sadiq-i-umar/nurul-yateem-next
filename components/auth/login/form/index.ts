import { ButtonVariant } from "@/components/button";
import { FormProps } from "@/components/form";
import { useForm } from "react-hook-form";
import useLoginApi from "../api";
import loginField from "./fields";

const useLoginForm = () => {
  const { ...hookForm } = useForm();

  const { login } = useLoginApi();

  const form: FormProps = {
    hookForm: hookForm,
    submit: {
      onValid: (values) => {
        login({
          email: values[loginField.email.label],
          password: values[loginField.password.label],
        });
      },
    },
    inputFields: [
      {
        label: loginField.email.label,
        textField: {
          type: "email",
          required: true,
          placeholder: "Enter your email address",
        },
      },
      {
        label: loginField.password.label,
        textField: {
          type: "password",
          required: true,
          placeholder: "Password",
        },
      },
    ],
    buttonGroup: {
      buttons: [
        {
          type: "submit",
          variant: ButtonVariant.CONTAINED,
          fullWidth: true,
          text: "Login",
        },
      ],
      position: "center",
    },
  };

  return { form };
};

export default useLoginForm;
