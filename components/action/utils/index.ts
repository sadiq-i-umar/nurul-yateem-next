import { SponsorshipRequest } from "@/types/sponsorship-requests";
import { SponsorshipRequestSnapshot } from "../types";

export function getSnapshot(request?: SponsorshipRequest) {
  if (request) {
    const snapshot: SponsorshipRequestSnapshot = {
      id: request.id,
      title: request.title,
      description: request.description,
      targetAmount: request.targetAmount,
      amountReceived: request.amountReceived,
      deadline: request.deadline,
      status: request.status,
      orphanIds: request.orphans?.map((orphan) => orphan.id),
      supportingDocumentIds: request.supportingDocuments?.map((doc) => doc.id),
    };

    return snapshot;
  }
}
