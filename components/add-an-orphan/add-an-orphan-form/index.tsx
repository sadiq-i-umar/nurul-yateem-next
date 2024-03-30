"use client";

import {
  Box,
  Button,
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
import { useState } from "react";
import { states_in_nigeria_dropdown } from "../../../utils";
import { PhotoUploadFrame } from "../../common/image-frames";
import { VisuallyHiddenInput } from "../../common/input";
import DragUpload from "../../drag-upload";
import { useAddOrphanStore } from "../../../utils/zustand/addOrphanstore";
import toast from "react-hot-toast";

const AddAnOrphanForm = ({ onClick }: { onClick: () => void }) => {
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
  } = useAddOrphanStore();
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
  const [imageError, setImageError] = useState(false);

  const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage({ file, url: reader?.result as string });
      };
      reader.readAsDataURL(file);
      setImageError(false);
    } else {
      setImageError(true);
    }
  };

  if (image.url?.indexOf("data:image") != undefined) {
    if (image.url?.indexOf("data:image") > -1) {
      // TODO: Upload image to google bucket and store response
    }
  }
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
    if (!image.url) {
      setImageError(true);
      isValid = false;
    }

    if (!isValid) {
      toast.error("Please fill in all required fields");
    }

    if (isValid) {
      onClick();
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          marginBottom: "20px",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
       
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid #DFDFDF",
            borderStyle: "dashed",
            paddingX: "15px",
            paddingY: "10px",
            marginRight: "30px",
          }}
        >
          
          <Box sx={{ marginBottom: "10px" }}>
            <Typography>Avatar</Typography>
          </Box>
          <PhotoUploadFrame image={image.url || ""} />
          <Box sx={{ marginBottom: "10px" }}>
            <Button
              component="label"
              variant="contained"
              sx={{
                backgroundColor: "#3863FA",
                boxShadow: "none",
                width: "100%",
                borderRadius: "6px",
                textTransform: "none",
                paddingY: "10px",
                paddingX: "70px",
                position: "relative",
                textAlign: "center",
                "&:hover": { backgroundColor: "#3863FA" },
              }}
            >
              Choose file
              <VisuallyHiddenInput
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleImageSelection}
              />
            </Button>
          </Box>
          {imageError && (
            <Typography component="p" color="error">
              Image is required
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            marginTop: { xs: "20px", md: "-100px" },
            width: { xs: "100%", sm: "320px" },
          }}
        >
          <Typography sx={{ color: "#676767" }}>
            Svg, Png, Jpg are all allowed, and must not be more that 5MB
          </Typography>
        </Box>
      </Box>
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
                  {[...states_in_nigeria_dropdown].map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
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
                  value={dateOfBirth}
                  onChange={(newDate) => {
                    setDateOfBirth(newDate ?? null);
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
                      borderRadius: "6px",
                      textTransform: "none",
                      paddingY: "10px",
                      paddingX: "70px",
                      background: "#000",
                      ":hover": { backgroundColor: "#000" },
                    }}
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
                      borderRadius: "6px",
                      textTransform: "none",
                      paddingY: "10px",
                      paddingX: "70px",
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
    </Box>
  );
};

export default AddAnOrphanForm;
