import { Orphan } from "@/components/orphan-list/api/types";

export type SponsorshipRequest = {
  id: string;
  createdAt: string;
  title: string;
  description: string;
  targetAmount: number;
  amountReceived: number;
  deadline: string;
  editRequested: boolean;
  status: "draft" | "pending" | "approved" | "rejected" | "closed";
  orphans: Orphan[];
  SupportingDocument: SupportingDocument[];
};

type SupportingDocument = {
  id: string;
  title: string;
  description: string;
  url: string;
  isArchived: boolean;
};
