import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AlertDialog from "../../Reusable-Dialog";
import { useAddOrphanStore } from "../../../utils/zustand/addOrphanstore";
import { states_in_nigeria_dropdown } from "../../../utils";
import { useSession } from "next-auth/react";
import LoaderBackdrop from "../../common/loader";
import { EditOrphanApi } from "../../../service/update-account";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImageNameGenderIdCell } from "../../tables/cells";

const AddSponsorshipRequestSideModal: React.FC<{
  openSideModal: boolean;
  setOpenSideModal: React.Dispatch<React.SetStateAction<boolean>>;
  SelectedOrphan: any;
}> = ({ openSideModal, setOpenSideModal, SelectedOrphan }) => {
  const { data: session } = useSession();
  const token = session?.token;

  const {
    firstName,
    lastName,
    image,
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
    uniqueCode,
    setFirstName,
    setLastName,
    setImage,
    setGender,
    setDateOfBirth,
    setStateOfOrigin,
    setLocalGovernmentArea,
    setInSchool,
    setSchoolName,
    setSchoolAddress,
    setSchoolContact,
    setPhoneNumberOfSchool,
    setClass,
    setUniqueCode,
  } = useAddOrphanStore();

  useEffect(() => {
    if (openSideModal && SelectedOrphan) {
      setFirstName(SelectedOrphan?.first_name || "");
      setLastName(SelectedOrphan?.last_name || "");
      setImage(SelectedOrphan?.profile_photo || "");
      setGender(SelectedOrphan?.gender || "");
      setDateOfBirth(SelectedOrphan?.date_of_birth || "");
      setStateOfOrigin(SelectedOrphan?.state_of_origin || "");
      setLocalGovernmentArea(SelectedOrphan?.local_government || "");
      setInSchool(SelectedOrphan?.in_school || "");
      setSchoolName(SelectedOrphan?.school_name || "");
      setSchoolAddress(SelectedOrphan?.school_address || "");
      setSchoolContact(SelectedOrphan?.school_contact_person || "");
      setPhoneNumberOfSchool(
        SelectedOrphan?.phone_number_of_contact_person || ""
      );
      setClass(SelectedOrphan?.class || "");
      setUniqueCode(SelectedOrphan?.unique_code || "");
    }
  }, [openSideModal, SelectedOrphan]);

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [dateOfBirthError, setDateOfBirthError] = useState(false);
  const [stateOfOriginError, setStateOfOriginError] = useState(false);
  const [localGovernmentAreaError, setLocalGovernmentAreaError] =
    useState(false);
  const [schoolNameError, setSchoolNameError] = useState(false);
  const [schoolAddressError, setSchoolAddressError] = useState(false);
  const [schoolContactError, setSchoolContactError] = useState(false);
  const [phoneNumberOfSchoolError, setPhoneNumberOfSchoolError] =
    useState(false);
  const [classError, setClassError] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const orphanId = SelectedOrphan?.id;

  const mutation = useMutation({
    mutationFn: (payload: any) => EditOrphanApi(payload, token, orphanId),
    onSuccess: (data) => {
      setIsLoading(true);
      if (data.error) {
        toast.error(data.error);
        setIsLoading(false);
      } else {
        toast.success("Orphan details updated successfully");
        queryClient.invalidateQueries({ queryKey: ["orphans"] });
        setIsLoading(false);
      }
    },
    onError: () => {
      toast.error("Error occurred while creating the user");
      setIsLoading(false);
    },
  });

  const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage({ file, url: reader?.result as string });
      };
      reader.readAsDataURL(file);
    } else {
    }
  };

  if (image.url?.indexOf("data:image") != undefined) {
    if (image.url?.indexOf("data:image") > -1) {
      // TODO: Upload image to google bucket and store response
    }
  }

  const handleCloseSideModal = () => {
    setOpenSideModal(false);
  };

  const handleClickClose = () => {
    setOpenDialog(false);
  };

  const sendDataToParent = () => {
    let isValid = true;
    if (!firstName) {
      setFirstNameError(true);
      isValid = false;
    }
    if (!lastName) {
      setLastNameError(true);
      isValid = false;
    }
    if (!dateOfBirth) {
      setDateOfBirthError(true);
      isValid = false;
    }
    if (!stateOfOrigin) {
      setStateOfOriginError(true);
      isValid = false;
    }
    if (!localGovernmentArea) {
      setLocalGovernmentAreaError(true);
      isValid = false;
    }

    if (!schoolName) {
      setSchoolNameError(true);
      isValid = false;
    }
    if (!schoolAddress) {
      setSchoolAddressError(true);
      isValid = false;
    }
    if (!schoolContact) {
      setSchoolContactError(true);
      isValid = false;
    }
    if (!phoneNumberOfSchool) {
      setPhoneNumberOfSchoolError(true);
      isValid = false;
    }
    if (!class_) {
      setClassError(true);
      isValid = false;
    }

    if (!isValid) {
      toast.error("Please fill in all required fields");
    }

    if (isValid) {
      setOpenDialog(true);
    }
  };

  const handleYesClick = async () => {
    const {
      firstName,
      lastName,
      image,
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
      uniqueCode,
    } = useAddOrphanStore.getState();

    if (!token) {
      return;
    }
    setOpenDialog(false);
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
      await mutation.mutateAsync(payload);

      setOpenSideModal(false);
    } catch (error) {
      toast.error("An error occurred. Please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoaderBackdrop />}
      <Dialog open={openSideModal}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            padding: "20px",
            position: "fixed",
            top: 0,
            right: 0,
            zIndex: 1102,
            overflow: "scroll",
            height: "100vh",
            width: { sm: "621px" },
          }}
        >
          <Box
            sx={{
              backgroundColor: "#F5F5F5",
              display: "flex",
              mx: "-20px",
              mt: "-20px",
              px: "20px",
              pt: "20px",
              pb: "20px",
              mb: "20px",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Box>
              <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>Add Sponsorship Request</Typography>
            </Box>
            <Box
              sx={{ position: "absolute", right: 0, top: 15 }}
              onClick={handleCloseSideModal}
            >
              <Close />
            </Box>
          </Box>
          <Box sx={{ paddingY: "30px" }}>
            <Box>
              <Box sx={{ marginBottom: "30px" }}>
                <ImageNameGenderIdCell image="" name="Bashir Salisu" gender="Male" id="2098132" />
              </Box>
              <Box sx={{ marginBottom: "40px" }}>
                <Box sx={{ marginBottom: "11.5px" }}>
                  <Typography>Your needs?</Typography>
                </Box>
                <Box sx={{ borderRadius: "10px" }}>
                  <Select
                    value={stateOfOrigin}
                    sx={{
                      borderRadius: "10px",
                      width: "100%",
                    }}
                    onChange={(e) => {
                      setStateOfOrigin(e.target.value);
                      setStateOfOriginError(false);
                    }}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      -- Select --
                    </MenuItem>
                    {[...states_in_nigeria_dropdown].map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                  {stateOfOriginError && (
                    <Typography component="p" color="error">
                      Your needs is a required field
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box sx={{ marginBottom: "40px" }}>
                <Box sx={{ marginBottom: "11.5px" }}>
                  <Typography>Description of Sponsorship Request</Typography>
                </Box>
                <Box sx={{ borderRadius: "10px" }}>
                  <TextField
                    placeholder="Write in here..."
                    sx={{
                      width: "100%",
                      borderRadius: "50px",
                    }}
                    inputProps={{
                      sx: {
                        borderRadius: "10px",
                      },
                    }}
                    value={schoolAddress}
                    onChange={(event: {
                      target: {
                        value: string;
                      };
                    }) => {
                      setSchoolAddress(event?.target.value);
                      setSchoolAddressError(false);
                    }}
                    multiline
                    rows={4}
                  />
                  {schoolAddressError && (
                    <Typography component="p" color="error">
                      Request description is required
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box sx={{ marginBottom: "30px" }}>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6} lg={6}>
                    <Box sx={{ marginBottom: "21.5px" }}>
                      <Box sx={{ marginBottom: "11.5px" }}>
                        <Typography>Amount Needed</Typography>
                      </Box>
                      <Box sx={{ borderRadius: "10px" }}>
                        <TextField
                          sx={{
                            width: "100%",
                            borderRadius: "50px",
                          }}
                          inputProps={{
                            sx: {
                              borderRadius: "10px",
                            },
                          }}
                          placeholder="Enter full name"
                          value={schoolContact}
                          onChange={(event: {
                            target: {
                              value: string;
                            };
                          }) => {
                            setSchoolContact(event?.target.value);
                            setSchoolContactError(false);
                          }}
                        />
                        {schoolContactError && (
                          <Typography component="p" color="error">
                            Amount needed is required
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={6}>
                    <Box sx={{ marginBottom: "21.5px" }}>
                      <Box sx={{ marginBottom: "11.5px" }}>
                        <Typography>Current Amount Gotten</Typography>
                      </Box>
                      <Box sx={{ borderRadius: "10px" }}>
                        <TextField
                          sx={{
                            width: "100%",
                            borderRadius: "50px",
                          }}
                          inputProps={{
                            sx: {
                              borderRadius: "10px",
                            },
                          }}
                          placeholder="Enter phone number"
                          value={phoneNumberOfSchool}
                          onChange={(event: {
                            target: {
                              value: string;
                            };
                          }) => {
                            setPhoneNumberOfSchool(event?.target.value);
                            setPhoneNumberOfSchoolError(false);
                          }}
                        />
                        {phoneNumberOfSchoolError && (
                          <Typography component="p" color="error">
                            Current Amount Gotten is required
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ marginBottom: "100px" }}>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <Box>
                          <Button
                            variant="contained"
                            sx={{
                              boxShadow: "none",
                              width: "100%",
                              borderRadius: "2rem",
                              textTransform: "none",
                              paddingY: "10px",
                              paddingX: "70px",
                              background: "#000",
                              ":hover": { backgroundColor: "#000" },
                            }}
                            onClick={handleCloseSideModal}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box>
                          <Button
                            onClick={sendDataToParent}
                            variant="contained"
                            sx={{
                              boxShadow: "none",
                              width: "100%",
                              borderRadius: "2rem",
                              textTransform: "none",
                              paddingY: "10px",
                              paddingX: "70px",
                              backgroundColor: "#3863FA",
                              ":hover": { backgroundColor: "#3863FA" },
                            }}
                          >
                            Submit
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              <AlertDialog
                open={openDialog}
                onClose={handleClickClose}
                onAgree={handleYesClick}
                title={"Edit Orphan Details"}
                content={
                  "Before submitting your Application, Make sure to verify every data is correct."
                }
                disagreeText={" No, Cancel"}
                agreeText={"Yes, continue"}
              />
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default AddSponsorshipRequestSideModal;
