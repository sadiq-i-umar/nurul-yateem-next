import { post } from "@/src/app/api/http-requests";
import { useMutation } from "@tanstack/react-query";
import {
  InitializeTransactionDto,
  InitializeTransactionResponse,
} from "./types";

const useSponsorshipRequestSponsorApi = () => {
  const initializeTransaction = useMutation({
    mutationFn: (payload: InitializeTransactionDto) =>
      post("transactions/initialize", payload),
    onSuccess: (res: InitializeTransactionResponse) => {
      window.location.assign(res.paymentLink);
    },
  });

  return { initializeTransaction };
};

export default useSponsorshipRequestSponsorApi;
