import { create } from "zustand";
import { GuardianState } from "../interfaces";
import dayjs from "dayjs";

export const useGuardianStore = create<GuardianState>((set) => ({
  meansOfIdentification: "",
  identificationNumber: "",
  gender: "MALE",
  image: "",
  dateOfBirth: "",
  maritalStatus: "",
  phoneNumber: "",
  altPhoneNumber: "",
  homeAddress: "",
  stateOfOrigin: "",
  localGovernmentArea: "",
  employmentStatus: "",
  natureOfOccupation: "",
  annualIncome: "",
  employerName: "",
  employerPhone: "",
  employerAddress: "",
  setImage: (image) => set((state) => ({ ...state, image })),
  setMeansOfIdentification: (meansOfIdentification) =>
    set((state) => ({ ...state, meansOfIdentification })),
  setIdentificationNumber: (identificationNumber) =>
    set((state) => ({ ...state, identificationNumber })),
  setGender: (gender) => set((state) => ({ ...state, gender })),
  setDateOfBirth: (dateOfBirth) =>
    set((state) => ({
      ...state,
      dateOfBirth: dayjs(dateOfBirth).format("YYYY-MM-DD"),
    })),
  setMaritalStatus: (maritalStatus) =>
    set((state) => ({ ...state, maritalStatus })),
  setPhoneNumber: (phoneNumber) => set((state) => ({ ...state, phoneNumber })),
  setAltPhoneNumber: (altPhoneNumber) =>
    set((state) => ({ ...state, altPhoneNumber })),
  setHomeAddress: (homeAddress) => set((state) => ({ ...state, homeAddress })),
  setStateOfOrigin: (stateOfOrigin) =>
    set((state) => ({ ...state, stateOfOrigin })),
  setLocalGovernmentArea: (localGovernmentArea) =>
    set((state) => ({ ...state, localGovernmentArea })),
  setEmploymentStatus: (employmentStatus) =>
    set((state) => ({ ...state, employmentStatus })),
  setNatureOfOccupation: (natureOfOccupation) =>
    set((state) => ({ ...state, natureOfOccupation })),
  setAnnualIncome: (annualIncome) =>
    set((state) => ({ ...state, annualIncome })),
  setEmployerName: (employerName) =>
    set((state) => ({ ...state, employerName })),
  setEmployerPhone: (employerPhone) =>
    set((state) => ({ ...state, employerPhone })),
  setEmployerAddress: (employerAddress) =>
    set((state) => ({ ...state, employerAddress })),
}));
