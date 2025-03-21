export type AccountSetupPayload = {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  localGovernment: string;
  dateOfBirth: string;
  homeAddress: string;
  maritalStatus: "Single" | "Married" | "Divorced" | "Widowed";
  phoneNumber: string;
  picture: string;
  employementStatus: "Employed" | "Unemployed" | "Self-Employed";
  natureOfJob?: string;
  annualIncome?: string;
  employerName?: string;
  employerPhoneNumber?: string;
  employerAddress?: string;
  name: string;
  number: string;
};
