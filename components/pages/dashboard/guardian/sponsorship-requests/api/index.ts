import { HookFormProps } from "@/components/form";
import { queryKey } from "@/constants/query-key";
import { deleteRequest, get, post, put } from "@/src/app/api/http-requests";
import { Response } from "@/types/api";
import {
  SponsorshipRequest,
  SponsorshipRequestEditRequest,
  SponsorshipRequestPublishRequest,
} from "@/types/sponsorship-requests";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateSponsorshipRequestDto } from "./types";

const useSponsorshipRequestApi = ({
  onSuccess,
  selectedRequestId,
  hookForm,
}: {
  onSuccess?: () => void;
  selectedRequestId?: string;
  hookForm?: HookFormProps;
}) => {
  const queryClient = useQueryClient();
  const createEditSponsorshipRequest = useMutation({
    mutationFn: (payload: CreateSponsorshipRequestDto): Response =>
      (selectedRequestId ? put : post)(
        `sponsorship-requests/${
          selectedRequestId ? `${selectedRequestId}` : "request"
        }`,
        payload
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.mySponsorshipRequests],
      });
      alert(
        `Sponsorship request ${
          selectedRequestId ? "edited" : "created"
        } successfully`
      );
      onSuccess?.();
    },
    onError: () => alert("An error occurred"),
  });

  const requestEdit = useMutation({
    mutationFn: (payload: {
      edit: CreateSponsorshipRequestDto;
      reason: string;
    }): Response =>
      post(`sponsorship-requests/${selectedRequestId}/request-edit`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.mySponsorshipRequests],
      });
      alert("Edit requested successfully");
      onSuccess?.();
    },
    onError: () => alert("An error occurred"),
  });

  const getAllSponsorshipRequests = useQuery({
    queryKey: [queryKey.sponsorshipRequests],
    queryFn: (): Response<SponsorshipRequest[]> => get("sponsorship-requests"),
  });

  const getMySponsorshipRequests = useQuery({
    queryKey: [queryKey.mySponsorshipRequests],
    queryFn: (): Response<SponsorshipRequest[]> =>
      get("sponsorship-requests/mine"),
  });

  const deleteSponsorshipRequest = useMutation({
    mutationFn: (id: string): Response =>
      deleteRequest(`sponsorship-requests/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.mySponsorshipRequests],
      });
      alert("Sponsorship request deleted successfully");
      hookForm?.reset();
    },
    onError: () => {
      alert("An error occured");
    },
  });

  const deleteSupportingDocument = useMutation({
    mutationFn: (payload: { id?: string; attachmentId?: string }) =>
      deleteRequest(
        `sponsorship-requests/${payload.id}/attachments/${payload.attachmentId}`
      ),
    onSuccess: () => {
      queryClient.resetQueries({
        queryKey: [queryKey.mySponsorshipRequests],
      });
      alert("Supporting document deleted successfully");
      onSuccess?.();
    },
    onError: () => {
      alert("An error occured");
    },
  });

  const submitSponsorshipRequest = useMutation({
    mutationFn: (id: string): Response =>
      post(`sponsorship-requests/${id}/submit`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.mySponsorshipRequests],
      });
      alert("Sponsorship request submitted successfully");
    },
    onError: () => alert("An  error occured"),
  });

  const rejectSponsorshipRequest = useMutation({
    mutationFn: (payload: { id?: string; reason: string }): Response =>
      post(`sponsorship-requests/${payload.id}/reject`, {
        reason: payload.reason,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.sponsorshipRequests],
      });
      alert("Sponsorship request rejected");
      hookForm?.reset();
      onSuccess?.();
    },
    onError: () => {
      alert("An error occured");
    },
  });

  const approveSponsorshipRequest = useMutation({
    mutationFn: (id: string): Response =>
      post(`sponsorship-requests/${id}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.sponsorshipRequests],
      });
      alert("Sponsorship request approved successfully");
    },
    onError: () => {
      alert("An error occured");
    },
  });

  const getEditRequests = useQuery({
    queryKey: [queryKey.editRequestsSponsorship],
    queryFn: (): Response<SponsorshipRequestEditRequest[]> =>
      get("sponsorship-requests/edit-requests"),
  });

  const approveEditRequest = useMutation({
    mutationFn: (id: string): Response =>
      post(`sponsorship-requests/${id}/approve-edit`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.editRequestsSponsorship],
      });
      alert("Edit request approved successfully");
    },
    onError: () => alert("An error occured"),
  });

  const rejectEditRequest = useMutation({
    mutationFn: (payload: { id?: string; reason: string }): Response =>
      post(`sponsorship-requests/${payload.id}/reject-edit`, {
        reason: payload.reason,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.editRequestsSponsorship],
      });
      alert("Edit request rejected successfully");
      hookForm?.reset();
      onSuccess?.();
    },
    onError: () => alert("An error occured"),
  });

  const resubmitEditRequest = useMutation({
    mutationFn: (payload: { id: string; reason: string }): Response =>
      post(`sponsorship-requests/${payload.id}/resubmit-edit-request`, {
        reason: payload.reason,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.mySponsorshipRequests],
      });
      alert("Edit request resubmitted successfully");
      hookForm?.reset();
      onSuccess?.();
    },
    onError: () => alert("An error occured"),
  });

  const publishSponsorshipRequest = useMutation({
    mutationFn: (id: string): Response =>
      post(`sponsorship-requests/${id}/publish`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.mySponsorshipRequests],
      });
      alert("Sponsorship request published successfully");
    },
    onError: () => alert("An error occured"),
  });

  const requestPublish = useMutation({
    mutationFn: (payload: { id: string; reason: string }): Response =>
      post(`sponsorship-requests/${payload.id}/request-publish`, {
        reason: payload.reason,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.mySponsorshipRequests],
      });
      alert("Publish request submitted successfully");
      hookForm?.reset();
      onSuccess?.();
    },
    onError: () => alert("An error occured"),
  });

  const getPublishRequests = useQuery({
    queryKey: [queryKey.publishRequests],
    queryFn: (): Response<SponsorshipRequestPublishRequest[]> =>
      get("sponsorship-requests/publish-requests"),
  });

  const rejectPublishRequest = useMutation({
    mutationFn: (payload: { id: string; reason: string }): Response =>
      post(`sponsorship-requests/${payload.id}/reject-publish-request`, {
        reason: payload.reason,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.publishRequests] });
      alert("Publish request rejected successfully");
      hookForm?.reset();
      onSuccess?.();
    },
    onError: () => alert("An error occured"),
  });

  const approvePublishRequest = useMutation({
    mutationFn: (id: string): Response =>
      post(`sponsorship-requests/${id}/approve-publish-request`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.publishRequests] }),
        alert("Publish request approved successfully");
    },
    onError: () => alert("An error occured"),
  });

  return {
    createEditSponsorshipRequest,
    getAllSponsorshipRequests,
    getMySponsorshipRequests,
    deleteSponsorshipRequest,
    deleteSupportingDocument,
    submitSponsorshipRequest,
    rejectSponsorshipRequest,
    approveSponsorshipRequest,
    publishSponsorshipRequest,
    requestEdit,
    getEditRequests,
    approveEditRequest,
    rejectEditRequest,
    resubmitEditRequest,
    requestPublish,
    getPublishRequests,
    rejectPublishRequest,
    approvePublishRequest,
  };
};

export default useSponsorshipRequestApi;
