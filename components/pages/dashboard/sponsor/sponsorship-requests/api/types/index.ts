export type InitializeTransactionDto = {
  sponsorshipRequestId: string;
  amount: number;
};

export type InitializeTransactionResponse = {
  id: string;
  transactionReference: string;
  paymentLink: string;
  transactionStatus: string | null;
  status: string;
  sponsorshipRequestId: string;
  userId: string;
};
