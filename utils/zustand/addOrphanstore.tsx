import { create } from "zustand";
import { AddOrphanState } from "../interfaces";
import dayjs from "dayjs";

export const useAddOrphanStore = create<AddOrphanState>((set) => ({
  firstName: "",
  lastName: "",
  image: null,
  gender: "",
  dateOfBirth: "",
  stateOfOrigin: "",
  localGovernmentArea: "",
  InSchool: "",
  schoolName: "",
  schoolAddress: "",
  schoolContact: "",
  phoneNumberOfSchool: "",
  class: "",
  setFirstName: (firstName) => set((state) => ({ ...state, firstName })),
  setLastName: (lastName) => set((state) => ({ ...state, lastName })),
  setImage: (image) => set((state) => ({ ...state, image })), // Added setImage
  setGender: (gender) => set((state) => ({ ...state, gender })),
  setDateOfBirth: (dateOfBirth) =>
    set((state) => ({
      ...state,
      dateOfBirth: dayjs(dateOfBirth).format("YYYY-MM-DD"),
    })),
  setStateOfOrigin: (stateOfOrigin) =>
    set((state) => ({ ...state, stateOfOrigin })),
  setLocalGovernmentArea: (localGovernmentArea) =>
    set((state) => ({ ...state, localGovernmentArea })),
  setInSchool: (InSchool) => set((state) => ({ ...state, InSchool })),
  setSchoolName: (schoolName) => set((state) => ({ ...state, schoolName })),
  setSchoolAddress: (schoolAddress) =>
    set((state) => ({ ...state, schoolAddress })),
  setSchoolContact: (schoolContact) =>
    set((state) => ({ ...state, schoolContact })),
  setPhoneNumberOfSchool: (phoneNumberOfSchool) =>
    set((state) => ({ ...state, phoneNumberOfSchool })),
  setClass: (class_) => set((state) => ({ ...state, class_ })),
}));
