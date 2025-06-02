"use client";
import { post } from "@/src/app/api/http-requests";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getApiErrorMessage } from "../../../../utils/api";
import { RegisterPayload } from "./types";

const useRegistrationApi = () => {
  const router = useRouter();
  const createUser = useMutation({
    mutationFn: (payload: RegisterPayload) => post("v1/user", payload),
    onSuccess: () => {
      alert("Registration Successful");
      router.push("/login");
    },
    onError: (error) => {
      alert(getApiErrorMessage(error));
    },
  });

  return { createUser };
};

export default useRegistrationApi;
