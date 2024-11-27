import { SxProps, Theme } from "@mui/material";

export type Dict = Record<string, string>;
export type DictOf<T> = Record<string, T>;

export enum UserRole {
  Guardian = "guardian",
  Sponsor = "sponsor",
  Admin = "admin",
}

export const rolesMap: Record<string, string> = {
  [UserRole.Guardian]: "/dashboard/guardian/home",
  [UserRole.Sponsor]: "/dashboard/sponsor/home",
  [UserRole.Admin]: "/dashboard/admin/home",
};
export type SxPropsType = {
  sx?: SxProps<Theme>;
};

// export type Orphan = {
//   id: number;
//   guardians_id: number;
//   profile_photo: string;
//   gender: string;
//   first_name: string;
//   last_name: string;
//   state_of_origin: string;
//   local_government: string;
//   date_of_birth: string;
//   in_school: string;
//   school_name: string;
//   school_address: string;
//   school_contact_person: string;
//   phone_number_of_contact_person: string;
//   account_status: string;
//   unique_code: string;
//   class: string;
//   created_at: string;
//   updated_at: string;
// };

// Define the Profile interface
export interface Profile {
  phoneNumber: string;
  sub: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  roles: string[];
}

// Define the Token interface
export interface Token {
  accessToken: string;
  refreshToken: string;
}

// Define the UserWithToken interface
export interface UserWithToken {
  id: string; // Unique user ID (from profile.sub)
  email: string;
  account: string; // Account type (from API response)
  token: Token; // Token object
  profile: Profile; // Profile object
}


export interface FetchedResponse<T> extends Array<T> {}


export type User = {
  id: string;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  isDeleted: boolean;
  isAchieved: boolean;
  phoneNumber: string | null;
  email: string | null;
  password: string | null;
  isActive: boolean;
  authStrategy: string | null;
  profile: UserProfile;
};

export type CreatedByOrUpdatedBy = {
  id: string;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  isDeleted: boolean;
  isAchieved: boolean;
  phoneNumber: string;
  email: string;
  password: string;
  isActive: boolean;
  authStrategy: string | null;
};

export type Orphan = {
  id: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: "deleted" | "active";
  deletionReason: string | null;
  trackingNumber: string;
  picture: string;
  isAccepted: boolean;
  schoolName: string;
  schoolStatus: boolean;
  schoolAddress: string;
  schoolContactPerson: string;
  schoolContactPhone: string;
  affidavitOfGuardianship: string;
  createdByUserId: string;
  userId: string;
  updatedByUserId: string;
  requests: any[];  
  createdBy: CreatedByOrUpdatedBy;
  updatedBy: CreatedByOrUpdatedBy;
  user: User;
};

export type Orphans = Orphan[];




/*

Admin - Get All Orphans Props

*/




type State = {
  id: string;
  name: string;
  createdAt: string;  // ISO date string
  updatedAt: string;  // ISO date string
  createdByUserId: string;
  updatedByUserId: string;
};

type LocalGovernment = {
  id: string;
  name: string;
  stateId: string;
  createdAt: string;  // ISO date string
  updatedAt: string;  // ISO date string
  createdByUserId: string;
  updatedByUserId: string;
  state: State;
};

export interface OrphanProps {
  id: string;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  isDeleted: boolean;
  isAchieved: boolean;
  phoneNumber: string | null;
  email: string | null;
  isActive: boolean;
  Orphan: AllOrphan;
  profile: UserProfile;
}

export type AllOrphan =  {
  affidavitOfGuardianship: string;
  createdAt: string;
  createdBy: {
    id: string;
    createdAt: string;
    updatedAt: string;
    isVerified: boolean;
    isDeleted: boolean;
    phoneNumber: string;
    email: string;
  };
  createdByUserId: string;
  deletionReason: string | null;
  id: string;
  isAccepted: boolean;
  isDeleted: boolean;
  picture: string;
  requests: Array<any>; 
  schoolAddress: string;
  schoolContactPerson: string;
  schoolContactPhone: string;
  schoolName: string;
  schoolStatus: string | null;
  trackingNumber: string;
  updatedAt: string;
  updatedBy: string | null;
  updatedByUserId: string | null;
  userId: string;
  authStrategy: string | null;
};


export type UserProfile = {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  gender: "male" | "female" | string; 
  localGovernment: LocalGovernment;
  dateOfBirth: string;
  homeAddress: string | null;
  maritalStatus: string | null;
  phoneNumber: string;
  picture: string;
  userId: string;
  createdByUserId: string | null;
  updatedByUserId: string | null;
};



