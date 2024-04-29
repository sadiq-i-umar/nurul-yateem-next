export interface PersonalInformation {
  image: { url: string | null; file?: any };
  gender: string | null;
  dob?: string | undefined;
  maritalStatus: string | null;
  phone: string | null;
  altPhone: string | null;
  homeAddress: string | null;
  stateOfOrigin: string | null;
  lga: string | null;
}

export interface Occupation {
  employmentStatus: string | null;
  natureOfJob?: string | null; 
  annualIncome: string | null;
  natureOfOccupation?: string | null;
  employerName: string | null;
  employerPhone: string | null;
  employerAddress: string | null;
}


export interface Identity {
  meansOfIdentification: string | null;
  identificationNumber: string | null;
}

export interface AddOrphanState {
  firstName: string;
  lastName: string;
  image: any;
  affidavit: any;
  gender: string;
  dateOfBirth: string | null | any;
  dateOfEnrollment: string | null | any;
  stateOfOrigin: string;
  localGovernmentArea: string;
  InSchool: string;
  schoolName: string;
  schoolAddress: string;
  schoolContact: string;
  phoneNumberOfSchool: string;
  class_: string;
  uniqueCode: any
  
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setImage: (image: any) => void;
  setAffidavit: (affidavit: any) => void;
  setGender: (gender: string) => void;
  setDateOfBirth: (dateOfBirth: string) => void;
  setDateOfEnrollment: (dateOfEnrollment: string) => void;
  setStateOfOrigin: (stateOfOrigin: string) => void;
  setLocalGovernmentArea: (localGovernmentArea: string) => void;
  setInSchool: (InSchool: string) => void;
  setSchoolName: (schoolName: string) => void;
  setSchoolAddress: (schoolAddress: string) => void;
  setSchoolContact: (schoolContact: string) => void;
  setPhoneNumberOfSchool: (phoneNumberOfSchool: string) => void;
  setClass: (class_: string) => void;
  setUniqueCode: (uniqueCode: any) => void;
}

export interface GuardianState {
  meansOfIdentification: string;
  identificationNumber: string;
  gender: string;
  dateOfBirth: string | null | any;
  maritalStatus: string;
  phoneNumber: string;
  altPhoneNumber: string;
  homeAddress: string;
  stateOfOrigin: string;
  localGovernmentArea: string;
  employmentStatus: string;
  natureOfOccupation: string;
  annualIncome: string;
  employerName: string;
  employerPhone: string;
  employerAddress: string;
  image: any;
  setImage: (image: any) => void;
  setMeansOfIdentification: (meansOfIdentification: string) => void;
  setIdentificationNumber: (identificationNumber: string) => void;
  setGender: (gender: string) => void;
  setDateOfBirth: (dateOfBirth: string) => void;
  setMaritalStatus: (maritalStatus: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setAltPhoneNumber: (altPhoneNumber: string) => void;
  setHomeAddress: (homeAddress: string) => void;
  setStateOfOrigin: (stateOfOrigin: string) => void;
  setLocalGovernmentArea: (localGovernmentArea: string) => void;
  setEmploymentStatus: (employmentStatus: string) => void;
  setNatureOfOccupation: (natureOfOccupation: string) => void;
  setAnnualIncome: (annualIncome: string) => void;
  setEmployerName: (employerName: string) => void;
  setEmployerPhone: (employerPhone: string) => void;
  setEmployerAddress: (employerAddress: string) => void;
}
