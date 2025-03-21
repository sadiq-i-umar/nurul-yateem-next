import options from "@/constants/options";

const completeAccountField = {
  picture: {
    label: "Avatar",
  },
  gender: {
    label: "Gender",
    options: options.gender,
  },
  dateOfBirth: {
    label: "Date of Birth",
  },
  martialStatus: {
    label: "Marital Status",
    options: options.maritalStatus,
  },
  phoneNumber: {
    label: "Phone Number",
  },
  alternatePhoneNumber: {
    label: "Alternate Phone Number",
  },
  homeAddress: {
    label: "Home Address",
  },
  stateOfOrigin: {
    label: "State of Origin",
    options: options.state,
  },
  lga: {
    label: "LGA",
  },
  employmentStatus: {
    label: "Employment Status",
    options: options.employmentStatus,
  },
  natureOfJob: {
    label: "Nature of Job",
  },
  annualIncome: {
    label: "Annual Income",
  },
  employerName: {
    label: "Employers Name",
  },
  employerPhoneNumber: {
    label: "Employers Phone Number",
  },
  employerAddress: {
    label: "Employers Address",
  },
  meansOfIdentification: {
    label: "Means of Identification",
    options: options.meansOfIdentification,
  },
  identificationNumber: {
    label: "Identification Number",
  },
  identificationUpload: {
    label: "Identification Upload",
  },
};

export default completeAccountField;
