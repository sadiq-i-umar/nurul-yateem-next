import options from "@/constants/options";

const addOrphanFields = {
  picture: {
    label: "Avatar",
  },
  gender: {
    label: "Gender",
    options: options.gender,
  },
  firstName: {
    label: "First Name",
  },
  lastName: {
    label: "Last Name",
  },
  affidavit: {
    label: "Affidavit of Guardianship",
  },
  stateOfOrigin: {
    label: "State of Origin",
    options: options.state,
  },
  lga: {
    label: "LGA",
  },
  dob: {
    label: "Date of Birth",
  },
  schoolStatus: {
    label: "Is he/she in school?",
    options: options.schoolStatus,
  },
  schoolName: {
    label: "School Name",
  },
  schoolAddress: {
    label: "School Address",
  },
  schoolContactPerson: {
    label: "School Contact Person",
  },
  contactPersonPhone: {
    label: "Phone Number of Contact Person",
  },
};

export default addOrphanFields;
