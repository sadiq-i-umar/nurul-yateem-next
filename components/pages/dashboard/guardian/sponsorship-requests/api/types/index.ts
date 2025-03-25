type SupportingDocumentDto = {
  title: string;
  description: string;
  url: string;
};

export type CreateSponsorshipRequestDto = {
  title: string;
  description: string;
  targetAmount: number;
  deadline: string;
  supportingDocuments?: SupportingDocumentDto[];
  orphans: string[];
};
