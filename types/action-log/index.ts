import { Status } from "@/components/orphan-list/api/types";

export type ActionLog = {
  id: string;
  actionType: string;
  reason?: string;
  toStatus?: Status;
};
