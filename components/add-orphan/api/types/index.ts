export type AddEditOrphanPayload = {
  picture?: string;
  gender?: "Male" | "Female";
  firstName?: string;
  middleName?: string;
  lastName?: string;
  affidavitOfGuardianship?: string;
  localGovernment?: string;
  dateOfBirth?: string;
  isEnrolled?: boolean;
  schoolName?: string;
  schoolAddress?: string;
  schoolContactPerson?: string;
  schoolContactPhone?: string;
};
