import { Orphan } from "@/components/orphan-list/api/types";
import { CreateSponsorshipRequestDto } from "@/components/pages/dashboard/guardian/sponsorship-requests/api/types";
import { SponsorshipRequest } from "../sponsorship-requests";
import { Status } from "../status";

export type PerformedAction = {
  id: string;
  action: Action;
  current?: SponsorshipRequest | Orphan;
  edit?: CreateSponsorshipRequestDto;
  status: Status;
  orphanId?: String;
  sponsorshipRequestId?: String;
  actionLogs: ActionLog[];
};

export enum Action {
  create = "create",
  edit = "edit",
  delete = "delete",
  approve = "approve",
  reject = "reject",
  publish = "publish",
  request_approval = "request_approval",
  request_edit = "request_edit",
  request_publish = "request_publish",
  reject_edit = "reject_edit",
  reject_publish = "reject_publish",
  approve_edit = "approve_edit",
  approve_publish = "approve_publish",
  close = "close",
  request_reopen = "request_reopen",
  approve_reopen = "approve_reopen",
  reject_reopen = "reject_reopen",
  request_reopen_publish = "request_reopen_publish",
  approve_reopen_publish = "approve_reopen_publish",
  reject_reopen_publish = "reject_reopen_publish",
}

export type ActionLog = {
  id: string;

  createdAt: Date;
  updatedAt: Date;

  action?: Action;

  fromStatus?: Status;
  toStatus?: Status;

  snapshot?: any;
  change?: any;

  comment?: string;
};
