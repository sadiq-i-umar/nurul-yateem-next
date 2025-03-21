import { HookFormValidate } from "../../input-field";

export const validatePassword: HookFormValidate = {
  "Password must contain a lowercase letter": (value) => /[a-z]/.test(value),
  "Password must contain an uppercase letter": (value) => /[A-Z]/.test(value),
  "Password must contain a number": (value) => /[0-9]/.test(value),
  "Password must contain at least 8 characters": (value) => value.length > 7,
};
