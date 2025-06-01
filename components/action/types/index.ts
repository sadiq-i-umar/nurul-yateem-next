import { CreateSponsorshipRequestDto } from "@/components/pages/dashboard/guardian/sponsorship-requests/api/types";
import { Orphan } from "@/types";
import { Action } from "@/types/action";
import { Entity } from "@/types/entity";
import { SponsorshipRequest } from "@/types/sponsorship-requests";

export type PerformActionMutationProps = {
  data?: { snapshot?: ActionSnapshot; change?: ActionChange; comment?: string };
  params?: { entityId?: string; action: Action; entity: Entity };
};

export type ActionSnapshot =
  | SponsorshipRequestSnapshot
  | Omit<Orphan, "actionLogs">;

export type SponsorshipRequestSnapshot = Omit<
  SponsorshipRequest,
  "actionLogs" | "supportingDocuments" | "orphans" | "createdAt"
> & { orphanIds: string[]; supportingDocumentIds: string[] };

export type ActionChange = CreateSponsorshipRequestDto;
