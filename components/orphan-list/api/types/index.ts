import { Gender } from "@/types";
import { ActionLog } from "@/types/action-log";

type UserProfile = {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  gender: Gender;
  localGovernmentId: string;
  dateOfBirth: string;
  homeAddress: string | null;
  maritalStatus: string | null;
  phoneNumber: string;
  picture: string;
  userId: string;
  createdByUserId: string | null;
  updatedByUserId: string | null;
  localGovernment: {
    id: string;
    name: string;
    stateId: string;
    createdAt: string;
    updatedAt: string;
    state: {
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

type User = {
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

type CreatedBy = {
  id: string;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  isDeleted: boolean;
  isAchieved: boolean;
  phoneNumber: string | null;
  email: string;
  password: string;
  isActive: boolean;
  authStrategy: string | null;
};

export type Status = "draft" | "pending" | "approved" | "rejected";

export type Orphan = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletionReason: string | null;
  picture: string;
  status: Status;
  schoolName: string;
  schoolStatus: boolean;
  schoolAddress: string;
  schoolContactPerson: string;
  schoolContactPhone: string;
  affidavitOfGuardianship: string;
  createdByUserId: string;
  ActionLog: ActionLog[];
  user: User;
};
