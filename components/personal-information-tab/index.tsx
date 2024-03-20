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
import { maritalStatusOptions, states_in_nigeria_dropdown } from "../../utils";
import { PhotoUploadFrame } from "../common/image-frames";
import { VisuallyHiddenInput } from "../common/input";
import { useGuardianStore } from "../../utils/zustand/guardianstore";
import { PersonalInformation } from "../../utils/interfaces";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import toast from "react-hot-toast";

const PersonalInformationTab: React.FC<{
  onNextClick: (personalInfo: PersonalInformation | undefined) => void;
}> = ({ onNextClick }) => {
  //Reset scroll on tab display

  const {
    image,
    setImage,
    gender,
    setGender,
    setDateOfBirth,
    maritalStatus,
    setMaritalStatus,
    phoneNumber,
    altPhoneNumber,
    setPhoneNumber,
    setAltPhoneNumber,
    homeAddress,
    setHomeAddress,
    stateOfOrigin,
    setStateOfOrigin,
    localGovernmentArea,
    setLocalGovernmentArea,
  } = useGuardianStore();

  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [maritalStatusError, setMaritalStatusError] = useState(false);
  const [stateOfOriginError, setStateOfOriginError] = useState(false);
  const [localGovernmentAreaError, setLocalGovernmentAreaError] =
    useState(false);
  const [dobError, setDobError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [homeAddressError, setHomeAddressError] = useState(false);

  const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage({ file, url: reader.result as string }); 
      };
      reader.readAsDataURL(file);
      setImageError(false);
    } else {
      setImageError(true);
    }
  };
  
  if (image.url && image.url.startsWith("data:image")) {
    // Conditionally upload image to Google bucket and store response
    // You can call your upload function here
  }
  

  const [dob, setDob] = useState<Dayjs | null | any>(null);

  const sendDataToParent = () => {
    let isValid = true;
    if (!phoneNumber) {
      setPhoneNumberError(true);
      isValid = false;
    }
    if (!maritalStatus) {
      setMaritalStatusError(true);
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

    if (!dob) {
      setDobError(true);
      isValid = false;
    }
    if (!gender) {
      setGenderError(true);
      isValid = false;
    }
    if (!image.url) {
      setImageError(true);
      isValid = false;
    }

    if (!homeAddress) {
      setHomeAddressError(true);
      isValid = false;
    }
    if (!isValid) {
      toast.error("Please fill in all required fields");
    }

    if (isValid) {
      setDateOfBirth(dob);
      onNextClick({
        image,
        gender,
        dob: dob?.format("DD/MM/YYYY"),
        maritalStatus,
        phone: phoneNumber,
        altPhone: altPhoneNumber,
        homeAddress,
        stateOfOrigin,
        lga: localGovernmentArea,
      });
    }
  };

  return (
    <Box>
      <Box sx={{ marginBottom: "20px" }}>
        <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
          Step 1: Personal Information
        </Typography>
      </Box>
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
                boxShadow: "none",
                width: "100%",
                borderRadius: "6px",
                textTransform: "none",
                paddingY: "10px",
                paddingX: "70px",
                position: "relative",
                textAlign: "center",
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
      <Box>
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
              onClick={() => {
                setGender("MALE");
              }}
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
              onClick={() => {
                setGender("FEMALE");
              }}
              value="FEMALE"
              control={<Radio />}
              label="Female"
            />
          </Box>
        </RadioGroup>
      </Box>
      <Box sx={{ marginBottom: "10px" }}>
        <Grid container spacing={5}>
          <Grid item lg={6}>
            <Box sx={{ marginBottom: "21.5px" }}>
              <Box sx={{ marginBottom: "11.5px" }}>
                <Typography>Date of Birth</Typography>
              </Box>
              <Box sx={{ borderRadius: "10px" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={dob}
                    onChange={(newDate) => {
                      setDob(newDate ?? null);
                      setDobError(false);
                    }}
                    format="DD/MM/YYYY"
                    sx={{ width: "100%" }}
                  />
                </LocalizationProvider>
                {dobError && (
                  <Typography component="p" color="error">
                    Date of birth is required
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item lg={6}>
            <Box sx={{ marginBottom: "21.5px" }}>
              <Box sx={{ marginBottom: "11.5px" }}>
                <Typography>Marital Status</Typography>
              </Box>
              <Box sx={{ borderRadius: "10px" }}>
                <Select
                  value={maritalStatus}
                  sx={{
                    borderRadius: "10px",
                    width: "100%",
                  }}
                  onChange={(e) => {
                    setMaritalStatus(e.target.value);
                    setMaritalStatusError(false);
                  }}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    -- Select --
                  </MenuItem>
                  {maritalStatusOptions?.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option?.label}
                    </MenuItem>
                  ))}
                </Select>
                {maritalStatusError && (
                  <Typography component="p" color="error">
                    Marital status is required
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ marginBottom: "10px" }}>
        <Grid container spacing={5}>
          <Grid item lg={6}>
            <Box sx={{ marginBottom: "21.5px" }}>
              <Box sx={{ marginBottom: "11.5px" }}>
                <Typography>Phone Number</Typography>
              </Box>
              <Box sx={{ borderRadius: "10px" }}>
                <TextField
                  sx={{
                    width: "100%",
                    borderRadius: "50px",
                  }}
                  placeholder="080********"
                  value={phoneNumber}
                  onChange={(event: {
                    target: {
                      value: string;
                    };
                  }) => {
                    setPhoneNumber(event.target.value);
                    setPhoneNumberError(false);
                  }}
                />
                {phoneNumberError && (
                  <Typography component="p" color="error">
                    Phone number is required
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item lg={6}>
            <Box sx={{ marginBottom: "21.5px" }}>
              <Box sx={{ marginBottom: "11.5px" }}>
                <Typography>Alternate Phone Number {`(Optional)`}</Typography>
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
                  placeholder={"080********"}
                  value={altPhoneNumber}
                  onChange={(event: {
                    target: {
                      value: string;
                    };
                  }) => {
                    setAltPhoneNumber(event?.target.value);
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ marginBottom: "21.5px" }}>
        <Box sx={{ marginBottom: "11.5px" }}>
          <Typography>Home Address</Typography>
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
            value={homeAddress}
            onChange={(event: {
              target: {
                value: string;
              };
            }) => {
              setHomeAddress(event?.target.value);
              setHomeAddressError(false);
            }}
            multiline
            rows={3}
          />
          {homeAddressError && (
            <Typography component="p" color="error">
              Home address is required
            </Typography>
          )}
        </Box>
      </Box>
      <Box sx={{ marginBottom: "30px" }}>
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
                    Image is required
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
                    local government area is required
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
                    Next
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

export default PersonalInformationTab;
