const registrationField = {
  accountType: {
    name: "Account Type",
  },
  firstName: {
    label: "First Name",
  },
  lastName: {
    label: "Last Name",
  },
  email: {
    label: "Email Address",
  },
  password: {
    label: "Password",
  },
  confirmPassword: {
    label: "Confirm Password",
    error: {
      matchingError: {
        message: "Passwords do not match",
      },
    },
  },
};

export default registrationField;
