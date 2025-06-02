import { Orphan } from "@/components/orphan-list/api/types";
import { ActionLog } from "../action";
import { Status } from "../status";

export type SponsorshipRequest = {
  id: string;
  createdAt: string;
  title: string;
  description: string;
  targetAmount: number;
  amountReceived: number;
  deadline: string;
  status: Status;
  orphans: Orphan[];
  supportingDocuments: SupportingDocument[];
  actionLogs: ActionLog[];
};

type SupportingDocument = {
  id: string;
  title: string;
  description: string;
  url: string;
  isArchived: boolean;
};
