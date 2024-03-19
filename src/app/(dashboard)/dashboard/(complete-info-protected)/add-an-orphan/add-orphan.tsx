"use client";

import {
  LogoImageFrame,
  ProfileImageFrame,
} from "../../../../../../components/common/image-frames";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Loader } from "../../../../../../components/common/loader";
import AddAnOrphanForm from "../../../../../../components/add-an-orphan-form";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useAddOrphanStore } from "../../../../../../utils/zustand/addOrphanstore";
import { AddOphanApi } from "../../../../../../service/update-account";
import { useMutation } from "@tanstack/react-query";
import AddOrphanSuccess from "./success/page";

const AddAnOrphan: React.FC = () => {
  const { data: session } = useSession();
  const token = session?.token;
  const firstName = session?.user?.firstName;
  const lastName = session?.user?.lastName;
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

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
      {isLoading && <Loader />}
      <Box>
        <Box
          sx={{
            display: "flex",
            paddingTop: "30px",
            paddingBottom: "20px",
            paddingX: { xs: "10px", sm: "40px", md: "80px" },
            alignItems: "center",
            borderBottom: "1px solid #DFDFDF",
            position: "sticky",
            top: 0,
            backgroundColor: "white",
            zIndex: 1,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box>
            <LogoImageFrame image={"/nurul_yateem_logo.png"} />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              ...(showSuccessMessage
                ? { display: "none" }
                : { display: "flex" }),
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginX: "30px",
              marginTop: { xs: "20px", sm: "0px" },
            }}
          >
            <Box sx={{ marginBottom: "20px", textAlign: "center" }}>
              <Typography
                variant="h1"
                sx={{ fontSize: "20px", display: { xs: "block", sm: "none" } }}
              >
                Add an Orphan Account
              </Typography>
              <Typography
                variant="h1"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Add an Orphan Account
              </Typography>
            </Box>
            <Box
              sx={{
                textAlign: "center",
                marginBottom: { xs: "10px", sm: "none" },
              }}
            >
              <Typography
                sx={{ color: "#8D8B90", display: { xs: "none", sm: "block" } }}
              >
                Orphans are vulnerable groups that needs an intervention
              </Typography>
              <Typography
                sx={{
                  color: "#8D8B90",
                  fontSize: "14px",
                  display: { xs: "block", sm: "none" },
                }}
              >
                Orphans are vulnerable groups that needs an intervention
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              ...(showSuccessMessage
                ? { display: "none" }
                : { display: "flex" }),
              alignItems: "center",
            }}
          >
            <Box sx={{ marginRight: "15px" }}>
              <Typography
                style={{ textTransform: "capitalize" }}
              >{`Welcome ${firstName} ${lastName}`}</Typography>
            </Box>
            <Box>
              <ProfileImageFrame
                initials={`${firstName?.charAt(0)}${lastName?.charAt(0)}`}
              />
            </Box>
          </Box>
        </Box>
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
          <Grid
            sx={{
              display: { xs: "none", sm: "block" },
              position: "fixed",
              height: "100vh",
              borderRight: "1px solid #DFDFDF",
              paddingRight: { xs: "250px", md: "330px" },
            }}
            item
            xs={0.5}
            sm={1}
            md={2}
            lg={3}
          >
            <Box
              sx={{
                paddingTop: "0px",
                paddingBottom: "25px",
                borderLeft: "3px solid #E9F3E6",
                marginLeft: { xs: "20px", md: "90px" },
                marginRight: "30px",
                marginY: "30px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "50px",
                  marginLeft: "-7.5px",
                }}
              >
                <Box sx={{ marginRight: "15px" }}>
                  <Box
                    sx={{
                      backgroundColor: "primary.main",
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                    }}
                  />
                </Box>
                <Box sx={{ marginRight: "20px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "15px",
                      borderRadius: "50%",
                      bgcolor: "#E9F3E6",
                      fill: "#268600",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1.5 18C1.5 18 0 18 0 16.5C0 15 1.5 10.5 9 10.5C16.5 10.5 18 15 18 16.5C18 18 16.5 18 16.5 18H1.5ZM9 9C10.1935 9 11.3381 8.52589 12.182 7.68198C13.0259 6.83807 13.5 5.69347 13.5 4.5C13.5 3.30653 13.0259 2.16193 12.182 1.31802C11.3381 0.474106 10.1935 0 9 0C7.80653 0 6.66193 0.474106 5.81802 1.31802C4.97411 2.16193 4.5 3.30653 4.5 4.5C4.5 5.69347 4.97411 6.83807 5.81802 7.68198C6.66193 8.52589 7.80653 9 9 9Z" />
                    </svg>
                  </Box>
                </Box>
                <Box>
                  <Box>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Orphan Details
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ color: "#8D8B90" }}>
                      Add an Orphan Profile
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid container lg={12}>
            <Grid item xs={0} sm={5} md={4} lg={3}></Grid>
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
                onClick={() => {
                  setShowDialog(true);
                }}
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
    </>
  );
};

export default AddAnOrphan;
