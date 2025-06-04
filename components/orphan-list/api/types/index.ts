import { Gender } from "@/types";
import { ActionLog } from "@/types/action";
import { Status } from "@/types/status";

type UserProfile = {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  gender: Gender;
  stateOfOrigin: string;
  localGovernment: string;
  dateOfBirth: string;
  homeAddress: string | null;
  maritalStatus: string | null;
  phoneNumber: string;
  picture: string;
  userId: string;
  createdByUserId: string | null;
  updatedByUserId: string | null;
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
