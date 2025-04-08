import { Orphan, Status } from "@/components/orphan-list/api/types";
import { CreateSponsorshipRequestDto } from "@/components/pages/dashboard/guardian/sponsorship-requests/api/types";
import { ActionLog } from "../action-log";

export type SponsorshipRequest = {
  id: string;
  createdAt: string;
  title: string;
  description: string;
  targetAmount: number;
  amountReceived: number;
  deadline: string;
  editRequested: boolean;
  status:
    | "draft"
    | "pending"
    | "approved"
    | "rejected"
    | "published"
    | "closed";
  orphans: Orphan[];
  SupportingDocument: SupportingDocument[];
  ActionLog: ActionLog[];
  EditRequest: SponsorshipRequestEditRequest[];
};

type SupportingDocument = {
  id: string;
  title: string;
  description: string;
  url: string;
  isArchived: boolean;
};

export type SponsorshipRequestEditRequest = {
  id: string;
  createdAt: string;
  updatedAt: string;
  current: SponsorshipRequest;
  edit: CreateSponsorshipRequestDto;
  status: Status;
  reason: string;
  sponsorshipRequestId: string;
  createdByUserId: string;
  actionLog: ActionLog;
};
