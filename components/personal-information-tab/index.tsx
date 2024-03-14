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

const PersonalInformationTab: React.FC<{
  onNextClick: () => void;
}> = ({ onNextClick }) => {
  //Reset scroll on tab display
  window.scrollTo({
    top: 0,
  });
  const {
    image,
    setImage,
    gender,
    setGender,
    dateOfBirth,
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

  const sendDataToParent = () => {
    onNextClick();
  };

  const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage({ file, url: reader?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  if (image.url?.indexOf("data:image") != undefined) {
    if (image.url?.indexOf("data:image") > -1) {
      // TODO: Upload image to google bucket and store response
    }
  }

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
                    value={dateOfBirth}
                    onChange={(newDate) => {
                      setDateOfBirth(newDate ?? null);
                    }}
                    format="DD/MM/YYYY"
                    sx={{ width: "100%" }}
                  />
                </LocalizationProvider>
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
                  inputProps={{
                    sx: {
                      borderRadius: "10px",
                    },
                  }}
                  placeholder="Enter Phone Number"
                  value={phoneNumber}
                  onChange={(event: {
                    target: {
                      value: string;
                    };
                  }) => {
                    setPhoneNumber(event?.target.value);
                  }}
                />
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
                  placeholder={"Enter Alternate Phone Number"}
                  value={altPhoneNumber}
                  onChange={(event: {
                    target: {
                      value: string;
                    };
                  }) => {
                    setAltPhoneNumber(event?.target.value);
                    event.target.value;
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
            }}
            multiline
            rows={4}
          />
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
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ marginBottom: "100px" }}>
        <Grid container spacing={5}>
          <Grid item lg={6}>
            <Box>
              <Button
                variant="outlined"
                sx={{
                  boxShadow: "none",
                  width: "100%",
                  borderRadius: "6px",
                  textTransform: "none",
                  paddingY: "10px",
                  paddingX: "70px",
                }}
              >
                Save progress and continue later
              </Button>
            </Box>
          </Grid>
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
                    onClick={() => sendDataToParent()}
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
