import { Close, MoreVert } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AlertDialog from "../../Reusable-Dialog";
import { useAddOrphanStore } from "../../../utils/zustand/addOrphanstore";
import { PhotoUploadFrame } from "../../common/image-frames";
import { VisuallyHiddenInput } from "../../common/input";
import { states_in_nigeria_dropdown } from "../../../utils";
import DragUpload from "../../drag-upload";
import dayjs from "dayjs";
import { TextOnlyPill } from "../../pills";
import EditPic from "../../../public/ediitProfile.svg";
import { useSession } from "next-auth/react";
import LoaderBackdrop from "../../common/loader";
import { EditOrphanApi } from "../../../service/update-account";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const EditOrphanSideModal: React.FC<{
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
            }}
          >
            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <Box>
                <PhotoUploadFrame image={image} />
              </Box>
              <Box>
                <Box
                  sx={{
                    marginLeft: "-20px",
                  }}
                >
                  <Button component="label" htmlFor="image-upload-button">
                    <VisuallyHiddenInput
                      id="image-upload-button"
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      onChange={handleImageSelection}
                    />
                    <img src={EditPic.src} alt="Hero Image" />
                  </Button>
                </Box>

                <Box>
                  <TextOnlyPill text={uniqueCode} bgColor={""} color={""} />
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: ".5rem" }}>
              <Box>
                <MoreVert />
              </Box>
              <Box onClick={handleCloseSideModal}>
                <Close />
              </Box>
            </Box>
          </Box>
          <Box sx={{ paddingY: "30px" }}>
            <Box>
              <Box sx={{}}>
                <Box sx={{ marginBottom: { xs: "18px", sm: "11.5px" } }}>
                  <Typography>Gender</Typography>
                </Box>
                <RadioGroup
                  value={gender}
                  sx={{ display: "flex", flexDirection: "row" }}
                >
                  <Box
                    onClick={() => setGender("MALE")}
                    sx={{
                      flexShrink: 1,
                      cursor: "pointer",
                      border: "2px solid",
                      paddingY: "10px",
                      paddingX: "15px",
                      borderRadius: "10px",
                      marginRight: "40px",
                      ...(gender == "MALE"
                        ? { borderColor: "#268500" }
                        : { borderColor: "#D2D2D2" }),
                      marginBottom: "30px",
                    }}
                  >
                    <FormControlLabel
                      onClick={() => setGender("MALE")}
                      value="MALE"
                      control={<Radio />}
                      label="Male"
                    />
                  </Box>
                  <Box
                    onClick={() => setGender("FEMALE")}
                    sx={{
                      cursor: "pointer",
                      border: "2px solid",
                      paddingY: "10px",
                      paddingX: "15px",
                      borderRadius: "10px",
                      ...(gender == "FEMALE"
                        ? { borderColor: "#268500" }
                        : { borderColor: "#D2D2D2" }),
                      marginBottom: "30px",
                    }}
                  >
                    <FormControlLabel
                      onClick={(e) => setGender("FEMALE")}
                      value="FEMALE"
                      control={<Radio />}
                      label="Female"
                    />
                  </Box>
                </RadioGroup>
              </Box>
              <Box sx={{ marginBottom: "30px" }}>
                <Grid container spacing={5}>
                  <Grid item lg={6}>
                    <Box sx={{ marginBottom: "21.5px" }}>
                      <Box sx={{ marginBottom: "11.5px" }}>
                        <Typography>First Name</Typography>
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
                          placeholder="Enter First Name"
                          value={firstName}
                          onChange={(event: {
                            target: {
                              value: string;
                            };
                          }) => {
                            setFirstName(event?.target.value);
                            setFirstNameError(false);
                          }}
                        />
                        {firstNameError && (
                          <Typography component="p" color="error">
                            First Name is required
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item lg={6}>
                    <Box sx={{ marginBottom: "21.5px" }}>
                      <Box sx={{ marginBottom: "11.5px" }}>
                        <Typography>Last Name</Typography>
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
                          placeholder="Enter Last Name"
                          value={lastName}
                          onChange={(event: {
                            target: {
                              value: string;
                            };
                          }) => {
                            setLastName(event?.target.value);
                            setLastNameError(false);
                          }}
                        />
                        {lastNameError && (
                          <Typography component="p" color="error">
                            Last Name is required
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ marginBottom: "60px", width: "100%" }}>
                <DragUpload
                  title={"Affidavit of Guardianship"}
                  subtitle={"Drag and Drop Document"}
                />
              </Box>
              <Box sx={{ marginBottom: "10px" }}>
                <Grid container spacing={5}>
                  <Grid item lg={6}>
                    <Box sx={{ marginBottom: "21.5px" }}>
                      <Box sx={{ marginBottom: "11.5px" }}>
                        <Typography>State of Origin</Typography>
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
                          {[...states_in_nigeria_dropdown].map(
                            (item, index) => (
                              <MenuItem key={index} value={item}>
                                {item}
                              </MenuItem>
                            )
                          )}
                        </Select>
                        {stateOfOriginError && (
                          <Typography component="p" color="error">
                            State of Origin is required
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item lg={6}>
                    <Box sx={{ marginBottom: "21.5px" }}>
                      <Box sx={{ marginBottom: "11.5px" }}>
                        <Typography>LGA</Typography>
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
                          placeholder={"Enter LGA"}
                          value={localGovernmentArea}
                          onChange={(event: {
                            target: {
                              value: string;
                            };
                          }) => {
                            setLocalGovernmentArea(event?.target.value);
                            setLocalGovernmentAreaError(false);
                          }}
                        />
                        {localGovernmentAreaError && (
                          <Typography component="p" color="error">
                            Local governmnet area is required
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ marginBottom: "50px" }}>
                <Grid container spacing={5}>
                  <Grid item lg={6}>
                    <Box sx={{ marginBottom: "11.5px" }}>
                      <Typography>Date of Birth</Typography>
                    </Box>
                    <Box sx={{ borderRadius: "10px" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={
                            dateOfBirth
                              ? dayjs(dateOfBirth, "DD-MM-YYYY").format(
                                  "DD/MM/YYYY"
                                )
                              : null
                          }
                          onChange={(newDate) => {
                            setDateOfBirth(
                              newDate
                                ? dayjs(newDate, "DD/MM/YYYY").format(
                                    "YYYY-MM-DD"
                                  )
                                : ""
                            );
                            setDateOfBirthError(false);
                          }}
                          format="DD/MM/YYYY"
                          sx={{ width: "100%" }}
                        />
                      </LocalizationProvider>
                      {dateOfBirthError && (
                        <Typography component="p" color="error">
                          Date of birth is required
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ marginBottom: "50px" }}>
                <Typography variant={"h1"} sx={{ fontWeight: 400 }}>
                  School Information
                </Typography>
              </Box>
              <Box sx={{ marginBottom: "10px" }}>
                <Grid container spacing={5}>
                  <Grid item lg={6}>
                    <Box sx={{}}>
                      <Box sx={{ marginBottom: { xs: "18px", sm: "11.5px" } }}>
                        <Typography>Is he/she in school?</Typography>
                      </Box>
                      <RadioGroup
                        value={InSchool}
                        sx={{ display: "flex", flexDirection: "row" }}
                      >
                        <Box
                          onClick={() => setInSchool("YES")}
                          sx={{
                            flexShrink: 1,
                            cursor: "pointer",
                            border: "2px solid",
                            paddingY: "10px",
                            paddingX: "15px",
                            borderRadius: "10px",
                            marginRight: "40px",
                            ...(InSchool == "YES"
                              ? { borderColor: "#268500" }
                              : { borderColor: "#D2D2D2" }),
                            marginBottom: "30px",
                          }}
                        >
                          <FormControlLabel
                            onClick={() => setInSchool("YES")}
                            value="YES"
                            control={<Radio />}
                            label="Yes"
                          />
                        </Box>
                        <Box
                          onClick={() => setInSchool("NO")}
                          sx={{
                            cursor: "pointer",
                            border: "2px solid",
                            paddingY: "10px",
                            paddingX: "15px",
                            borderRadius: "10px",
                            ...(InSchool == "NO"
                              ? { borderColor: "#268500" }
                              : { borderColor: "#D2D2D2" }),
                            marginBottom: "30px",
                          }}
                        >
                          <FormControlLabel
                            onClick={(e) => setInSchool("NO")}
                            value="NO"
                            control={<Radio />}
                            label="NO"
                          />
                        </Box>
                      </RadioGroup>
                    </Box>
                  </Grid>
                  <Grid item lg={6}>
                    <Box sx={{ marginBottom: "21.5px" }}>
                      <Box sx={{ marginBottom: "11.5px" }}>
                        <Typography>School Name</Typography>
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
                          placeholder={"Enter School Name"}
                          value={schoolName}
                          onChange={(event: {
                            target: {
                              value: string;
                            };
                          }) => {
                            setSchoolName(event?.target.value);
                            setSchoolNameError(false);
                          }}
                        />
                        {schoolNameError && (
                          <Typography component="p" color="error">
                            School Name is required
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <Grid item lg={6}>
                  <Box sx={{ marginBottom: "21.5px" }}>
                    <Box sx={{ marginBottom: "11.5px" }}>
                      <Typography>Class</Typography>
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
                        placeholder={"Enter Class Level"}
                        value={class_}
                        onChange={(event: {
                          target: {
                            value: string;
                          };
                        }) => {
                          setClass(event?.target.value);
                          setClassError(false);
                        }}
                      />
                      {classError && (
                        <Typography component="p" color="error">
                          Class is required
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Box>
              <Box sx={{ marginBottom: "40px" }}>
                <Box sx={{ marginBottom: "11.5px" }}>
                  <Typography>School Address</Typography>
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
                      School Address is required
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box sx={{ marginBottom: "30px" }}>
                <Grid container spacing={5}>
                  <Grid item lg={6}>
                    <Box sx={{ marginBottom: "21.5px" }}>
                      <Box sx={{ marginBottom: "11.5px" }}>
                        <Typography>School Contact Person</Typography>
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
                            School Contact Person is required
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item lg={6}>
                    <Box sx={{ marginBottom: "21.5px" }}>
                      <Box sx={{ marginBottom: "11.5px" }}>
                        <Typography>Phone Number of Contact Person</Typography>
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
                            Phone Number of Contact Person is required
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ marginBottom: "100px" }}>
                <Grid container spacing={5}>
                  <Grid item lg={6}>
                    <Grid container spacing={4}>
                      <Grid item lg={6}>
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
                      <Grid item lg={6}>
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

export default EditOrphanSideModal;
