"use client";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
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
import { getOrphans } from "../../../service/orphan-list";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const Health = () => {
  const { data: session } = useSession();
  const token = session?.token;
  const {
    data: SelectedOrphan,
    isLoading,
    status,
  } = useQuery({
    queryKey: ["orphans"],
    queryFn: () => getOrphans(token),
    enabled: !!token,
  });

  const [healthFacility, setHealthFacility] = useState("");
  const [cardID, setCardID] = useState("");
  const [diseaseType, setDiseaseType] = useState("");
  const [insertLink, setInsertLink] = useState([""]);

  const {
    firstName,
    lastName,
    image,
    gender,
    dateOfBirth,
    uniqueCode,
    setFirstName,
    setLastName,
    setImage,
    setGender,
    setDateOfBirth,

    setUniqueCode,
  } = useAddOrphanStore();

  useEffect(() => {
    if (SelectedOrphan) {
      setFirstName(SelectedOrphan?.first_name || "");
      setLastName(SelectedOrphan?.last_name || "");
      setImage(SelectedOrphan?.profile_photo || "");
      setGender(SelectedOrphan?.gender || "");
      setDateOfBirth(SelectedOrphan?.date_of_birth || "");
      setUniqueCode(SelectedOrphan?.unique_code || "");
    }
  }, [SelectedOrphan]);

  const [Loading, setIsLoading] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [dateOfBirthError, setDateOfBirthError] = useState(false);
  const [linkError, setLinkError] = useState(false);
  const [FacilityError, setFacilityError] = useState(false);
  const [cardIDError, setCardIDError] = useState(false);
  const [DiseaseTypeError, setDiseaseTypeError] = useState(false);
  const [uniqueCodeError, setUniqueCodeError] = useState(false);

  const addMoreLink = () => {
    setInsertLink((prevLinks) => [...prevLinks, ""]);
  };

  // Function to handle deletion of a link input field
  const deleteLink = (index: any) => {
    setInsertLink((prevLinks) => {
      const newLinks = [...prevLinks];
      newLinks.splice(index, 1);
      return newLinks;
    });
  };

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

  if (image.url?.indexOf("data:image") != undefined) {
    if (image.url?.indexOf("data:image") > -1) {
      // TODO: Upload image to google bucket and store response
    }
  }

  const sendDataToParent = () => {
    let isValid = true;
    if (!uniqueCode) {
      setUniqueCodeError(true);
      isValid = false;
    }
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
    if (!healthFacility) {
      setFacilityError(true);
      isValid = false;
    }
    if (!cardID) {
      setCardIDError(true);
      isValid = false;
    }
    if (!diseaseType) {
      setDiseaseTypeError(true);
      isValid = false;
    }
    if (insertLink.some((link) => link === "")) {
      setLinkError(true);
      isValid = false;
    }

    if (!isValid) {
      toast.error("Please fill in all required fields");
    }

    if (isValid) {
      handleYesClick();
    }
  };

  const handleYesClick = async () => {
    const {
      firstName,
      lastName,
      image,
      gender,
      dateOfBirth,
      phoneNumberOfSchool,
      uniqueCode,
    } = useAddOrphanStore.getState();

    if (!token) {
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        first_name: firstName,
        last_name: lastName,
        profile_photo: "https://example.com/profile.jpg",
        gender: gender,
        date_of_birth: dateOfBirth,
        unique_code: uniqueCode,
        phone_number_of_contact_person: phoneNumberOfSchool,
      };

      // Make the API call with the payload
      await mutation.mutateAsync(payload);
    } catch (error) {
      toast.error("An error occurred. Please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {Loading || isLoading ? <LoaderBackdrop /> : null}

      <Box>
        <Box sx={{ py: 2 }}>
          <Grid container spacing={5}>
            <Grid item lg={6}>
              <Typography variant="h1">Health</Typography>
            </Grid>
            <Grid item lg={6}>
              <Box
                sx={{ display: "flex", justifyContent: "center", pr: "2rem" }}
              >
                <PhotoUploadFrame image={image} />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid container spacing={5}>
            <Grid item lg={6}>
              <Box sx={{ marginBottom: "21.5px" }}>
                <Box sx={{ marginBottom: "11.5px" }}>
                  <Typography>Orphan ID</Typography>
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
                    placeholder="#234565"
                    value={uniqueCode}
                    onChange={(event: {
                      target: {
                        value: string;
                      };
                    }) => {
                      setUniqueCode(event?.target.value);
                      setUniqueCodeError(false);
                    }}
                  />
                  {uniqueCodeError && (
                    <Typography component="p" color="error">
                      First Name is required
                    </Typography>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ paddingY: "30px" }}>
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
          <Box>
            <Box sx={{ marginBottom: "30px" }}>
              <Grid container spacing={5}>
                <Grid item lg={6}>
                  <Box sx={{ marginBottom: "11.5px" }}>
                    <Typography>Date of Birth</Typography>
                  </Box>
                  <Box sx={{ borderRadius: "10px" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={dayjs(dateOfBirth)}
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
                <Grid item lg={6}>
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
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ marginBottom: "30px" }}>
              <Grid container spacing={5}>
                <Grid item lg={6}>
                  <Box sx={{ marginBottom: "21.5px" }}>
                    <Box sx={{ marginBottom: "11.5px" }}>
                      <Typography>Name of Health Facility</Typography>
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
                        placeholder="Wuse General Hospital"
                        value={healthFacility}
                        onChange={(event: {
                          target: {
                            value: string;
                          };
                        }) => {
                          setHealthFacility(event?.target.value);
                          setFacilityError(false);
                        }}
                      />
                      {FacilityError && (
                        <Typography component="p" color="error">
                          Health Facility is required
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Grid>
                <Grid item lg={6}>
                  <Box sx={{ marginBottom: "21.5px" }}>
                    <Box sx={{ marginBottom: "11.5px" }}>
                      <Typography>Card ID Number</Typography>
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
                        placeholder="0989453"
                        value={cardID}
                        onChange={(event: {
                          target: {
                            value: string;
                          };
                        }) => {
                          setCardID(event?.target.value);
                          setCardIDError(false);
                        }}
                      />
                      {cardIDError && (
                        <Typography component="p" color="error">
                          Card ID is required
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ marginBottom: "30px" }}>
              <Grid container spacing={5}>
                <Grid item lg={6}>
                  <Box sx={{ marginBottom: "21.5px" }}>
                    <Box sx={{ marginBottom: "11.5px" }}>
                      <Typography>Type of Disease</Typography>
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
                        placeholder="Maleria"
                        value={diseaseType}
                        onChange={(event: {
                          target: {
                            value: string;
                          };
                        }) => {
                          setDiseaseType(event?.target.value);
                          setDiseaseTypeError(false);
                        }}
                      />
                      {DiseaseTypeError && (
                        <Typography component="p" color="error">
                          Disease Type is required
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ marginBottom: "60px", width: "100%" }}>
              <Box sx={{ marginBottom: "50px" }}>
                <Typography variant={"h1"} sx={{ fontWeight: 400 }}>
                  Additional Information
                </Typography>
              </Box>
              <DragUpload
                title={"Upload Document here"}
                subtitle={"Drag and Drop Document"}
              />
            </Box>
            <Box sx={{ marginBottom: "30px" }}>
              <Grid container spacing={5}>
                <Grid item lg={12} xs={12}>
                  {/* Render link input fields based on items in insertLink state */}
                  {insertLink.map((link, index) => (
                    <Box
                      key={index}
                      sx={{ marginBottom: "21.5px", position: "relative" }}
                    >
                      <Box sx={{ marginBottom: "11.5px" }}>
                        <Typography>or insert drive link</Typography>
                      </Box>
                      <Box sx={{ borderRadius: "10px", position: "relative" }}>
                        <TextField
                          sx={{
                            width: "calc(100% - 40px)",
                            borderRadius: "50px",
                          }}
                          inputProps={{
                            sx: {
                              borderRadius: "10px",
                            },
                          }}
                          placeholder="https://www.googledrive.org/wjrobvwjosbvojsdkb?sharing"
                          value={link}
                          onChange={(event) => {
                            const newLinks = [...insertLink];
                            newLinks[index] = event.target.value;
                            setInsertLink(newLinks);
                          }}
                        />
                        {/* Error message if needed */}
                        {/* Add an error message logic here if needed */}
                        {linkError && (
                          <Typography component="p" color="error">
                            Link is required
                          </Typography>
                        )}

                        {/* Delete button */}
                        {insertLink.length > 1 && ( // Conditionally render delete button
                          <IconButton
                            aria-label="delete"
                            size="small"
                            sx={{
                              position: "absolute",
                              top: "50%",
                              right: 0,
                              transform: "translateY(-50%)",
                            }}
                            onClick={() => deleteLink(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Grid>
              </Grid>
              <Button
                variant="outlined"
                disableElevation
                sx={{
                  textTransform: "none",
                  borderRadius: "30px",
                  paddingX: "20px",
                  paddingY: "10px",
                  color: "#3863FA",
                  borderColor: "#3863FA",
                  zIndex: 0,
                  "&:hover": {
                    color: "#3863FA",
                    borderColor: "#3863FA",
                  },
                }}
                startIcon={<AddIcon />}
                onClick={addMoreLink}
              >
                Add
              </Button>
            </Box>

            <Box sx={{ marginBottom: "100px" }}>
              <Grid container spacing={5}>
                <Grid item lg={6} xs={12}></Grid>
                <Grid item lg={6} xs={12}>
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
                          //   onClick={handleCloseSideModal}
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
                          Save
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Health;