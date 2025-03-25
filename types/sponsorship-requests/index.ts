import { Orphan } from "@/components/orphan-list/api/types";

export type SponsorshipRequest = {
  id: string;
  createdAt: string;
  title: string;
  description: string;
  targetAmount: number;
  amountReceived: number;
  deadline: string;
  status: "draft" | "active" | "approved" | "completed";
  orphans: Orphan[];
  SupportingDocument: SupportingDocument[];
};

type SupportingDocument = {
  title: string;
  description: string;
  url: string;
};
