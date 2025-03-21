export type RegisterPayload = {
  role: "guardian" | "sponsor";
  profile: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
};
