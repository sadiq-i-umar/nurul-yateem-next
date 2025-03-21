import { ButtonType } from "@/components/button";
import { ButtonGroupProps } from "@/components/button/group";
import { FormProps, OnValidSubmit } from "@/components/form";
import { InputFieldProps } from "@/components/form/input-field";
import { validatePassword } from "@/components/form/validation/password";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useRegistrationApi from "../api";
import { RegisterPayload } from "../api/types";
import field from "./data/fields";

const useRegistrationForm = () => {
  const { ...hookForm } = useForm({ mode: "onChange" });

  const inputFields: InputFieldProps[] = [
    {
      label: "What account are you creating?",
      name: "Account Type",
      radioGroupField: {
        options: [
          { label: "Guardian", value: "guardian" },
          { label: "Sponsor", value: "sponsor" },
        ],
        required: true,
      },
    },
    {
      label: "First Name",
      textField: {
        type: "text",
        required: true,
      },
    },
    {
      label: "Last Name",
      textField: {
        type: "text",
        required: true,
      },
    },
    {
      label: "Email Address",
      textField: {
        type: "email",
        required: true,
      },
    },
    {
      label: field.password.label,
      textField: {
        type: "password",
        required: true,
        validate: validatePassword,
      },
    },
    {
      label: field.confirmPassword.label,
      textField: {
        type: "password",
        required: true,
        validate: {
          [field.confirmPassword.error.matchingError.message]: (value) =>
            value === hookForm.watch(field.password.label),
        },
      },
    },
  ];

  const watch = hookForm.watch;

  const password = watch(field.password.label);
  const confirmPassword = watch(field.confirmPassword.label);

  useEffect(() => {
    if (password !== confirmPassword) {
      hookForm.setError(field.confirmPassword.label, {
        type: field.confirmPassword.error.matchingError.message,
      });
    } else {
      hookForm.clearErrors(field.confirmPassword.label);
    }
  }, [password, confirmPassword]);

  const buttonGroup: ButtonGroupProps = {
    buttons: [
      {
        type: "submit",
        variant: ButtonType.CONTAINED,
        text: "Sign Up",
      },
    ],
    position: "center",
  };

  const { createUser } = useRegistrationApi();

  const onValidSubmit: OnValidSubmit = (values) => {
    const payload: RegisterPayload = {
      role: values[field.accountType.name],
      profile: {
        firstName: values[field.firstName.label],
        lastName: values[field.lastName.label],
      },
      email: values[field.email.label],
      password: values[field.password.label],
    };
    createUser.mutateAsync(payload);
  };

  const form: FormProps = {
    hookForm: hookForm,
    inputFields: inputFields,
    buttonGroup: buttonGroup,
    submit: {
      onValid: onValidSubmit,
    },
  };

  return { form };
};

export default useRegistrationForm;
