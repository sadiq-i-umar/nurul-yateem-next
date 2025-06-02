"use client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAddOrphanStore } from "../../utils/zustand/addOrphanstore";
import LoaderBackdrop from "../common/loader";
import AddAnOrphanForm from "./add-an-orphan-form";
// import { AddOphanApi } from "../../service/update-account";
import { AddOphanApi } from "@/src/app/api/service/update-account";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import AddOrphanSuccessModal from "../modals/add-orphan-success";
import AddOrphanSuccess from "./success/page";

const AddAnOrphan: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.token;
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [openAddOrphanSuccessModal, setOpenAddOrphanSuccessModal] =
    useState(false);

  const { mutateAsync, status, data } = useMutation({
    mutationFn: (payload: any) => AddOphanApi(payload, token),
  });

  const handleYesClick = async () => {
    const {
      firstName,
      lastName,
      image,
      affidavit,
      gender,
      dateOfBirth,
      stateOfOrigin,
      localGovernmentArea,
      InSchool,
      schoolName,
      schoolAddress,
      schoolContact,
      phoneNumberOfSchool,
      class_,
    } = useAddOrphanStore.getState();

    if (!token) {
      return;
    }

    setShowDialog(false);
    setIsLoading(true);

    try {
      const payload = {
        first_name: firstName,
        last_name: lastName,
        profile_photo: "https://example.com/profile.jpg",
        gender: gender,
        date_of_birth: dateOfBirth,
        state_of_origin: stateOfOrigin,
        local_government: localGovernmentArea,
        in_school: InSchool,
        school_name: schoolName,
        school_address: schoolAddress,
        school_contact_person: schoolContact,
        phone_number_of_contact_person: phoneNumberOfSchool,
        class: class_,
      };

      // Make the API call with the payload
      await mutateAsync(payload);
    } catch (error) {
      toast.error("An error occurred. Please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (data?.status === true) {
      setShowSuccessMessage(true);
      mutateAsync(null);
    }
  }, [status]);

  return (
    <>
      {isLoading && <LoaderBackdrop />}
      <Box>
        <Box
          sx={{
            ...(showSuccessMessage
              ? { display: "block" }
              : { display: "none" }),
            paddingTop: "100px",
          }}
        >
          <AddOrphanSuccess />
        </Box>
        <Grid
          sx={{
            ...(showSuccessMessage
              ? { display: "none" }
              : { display: "block" }),
          }}
          container
        >
          <Grid container lg={12}>
            {pathname == "/dashboard/add-an-orphan" && (
              <Grid item xs={0} sm={5} md={4} lg={3}></Grid>
            )}

            <Grid
              sx={{
                paddingLeft: { xs: "40px", sm: "50px" },
                paddingRight: { xs: "40px", md: "200px" },
                paddingTop: "40px",
              }}
              item
              xs={12}
              sm={7}
              md={8}
              lg={9}
            >
              <AddAnOrphanForm
                onSuccess={() => {
                  pathname != "/dashboard/add-an-orphan"
                    ? setTimeout(
                        () => router.push("/dashboard/guardian/orphan-list"),
                        2000
                      )
                    : setOpenAddOrphanSuccessModal(true);
                }} // onClick={() => {
                //   setShowDialog(true);
                // }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Dialog open={showDialog}>
          <DialogTitle sx={{ marginTop: "10px" }}>
            <Typography
              sx={{ color: "#39353D", fontWeight: "bold", fontSize: "24px" }}
            >
              Application
            </Typography>
          </DialogTitle>
          <DialogContent>
            Before submitting your Application, Make sure to verify every data
            is correct, if not you might be denied an approval.
          </DialogContent>
          <DialogActions sx={{ marginBottom: "10px" }}>
            <Button
              sx={{ color: "#39353D", textTransform: "none" }}
              onClick={() => setShowDialog(false)}
            >
              No, Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ textTransform: "none" }}
              onClick={handleYesClick}
            >
              Yes, Continue
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <AddOrphanSuccessModal open={openAddOrphanSuccessModal} />
    </>
  );
};

export default AddAnOrphan;
