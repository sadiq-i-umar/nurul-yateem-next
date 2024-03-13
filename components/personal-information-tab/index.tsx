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
import dayjs, { Dayjs } from "dayjs";
import { states_in_nigeria_dropdown } from "../../utils";
import { PhotoUploadFrame } from "../common/image-frames";
import { PersonalInformation } from "../../utils/interfaces";
import { VisuallyHiddenInput } from "../common/input";

const PersonalInformationTab: React.FC<{
  onNextClick: (personalInfo: PersonalInformation | undefined) => void;
}> = ({ onNextClick }) => {
  //Reset scroll on tab display
  window.scrollTo({
    top: 0,
  });

  //Clear items in local storage before page is unloaded
  window.onbeforeunload = function () {
    localStorage.setItem("image", "");
    localStorage.setItem("gender", "");
    localStorage.setItem("dob", "");
    localStorage.setItem("maritalStatus", "-- Select --");
    localStorage.setItem("phone", "");
    localStorage.setItem("altPhone", "");
    localStorage.setItem("homeAddress", "");
    localStorage.setItem("stateOfOrigin", "-- Select --");
    localStorage.setItem("lga", "");
  };

  const storedImage = localStorage.getItem("image");
  const storedGender = localStorage.getItem("gender");
  let storedDob: Dayjs | null;
  if (localStorage.getItem("dob") == "") {
    storedDob = null;
  } else {
    storedDob = dayjs(localStorage.getItem("dob"));
  }
  const storedMaritalStatus = localStorage.getItem("maritalStatus");
  const storedPhone = localStorage.getItem("phone");
  const storedAltPhone = localStorage.getItem("altPhone");
  const storedHomeAddress = localStorage.getItem("homeAddress");
  const storedStateOfOrigin = localStorage.getItem("stateOfOrigin");
  const storedLga = localStorage.getItem("lga");

  const [image, setImage] = useState<{ url: string | null; file?: any }>({
    url: storedImage,
  });
  const [checkedGender, setCheckedGender] = useState(storedGender);
  const [dob, setDob] = useState<Dayjs | null>(storedDob);
  const [maritalStatus, setMaritalStatus] = useState(storedMaritalStatus);
  const [phone, setPhone] = useState(storedPhone);
  const [altPhone, setAltPhone] = useState(storedAltPhone);
  const [homeAddress, setHomeAddress] = useState(storedHomeAddress);
  const [stateOfOrigin, setStateOfOrigin] = useState(storedStateOfOrigin);
  const [lga, setLga] = useState(storedLga);

  const [logoError, setLogoError] = useState(false);
  const [dobError, setDobError] = useState(false);
  const [maritalStatusError, setMaritalStatusError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [altPhoneError, setAltPhoneError] = useState(false);
  const [homeAddressError, setHomeAddressError] = useState(false);
  const [stateOfOriginError, setStateOfOriginError] = useState(false);
  const [lgaError, setLgaError] = useState(false);

  const sendDataToParent = (data: PersonalInformation) => {
    onNextClick(data);
  };

  const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage({ file, url: reader?.result as string });
        localStorage.setItem("image", reader?.result as string);
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
      <Box sx={{}}>
        <Box sx={{ marginBottom: { xs: "18px", sm: "11.5px" } }}>
          <Typography>Gender</Typography>
        </Box>
        <RadioGroup
          value={checkedGender}
          sx={{ display: "flex", flexDirection: "row" }}
        >
          <Box
            onClick={() => setCheckedGender("Male")}
            sx={{
              flexShrink: 1,
              cursor: "pointer",
              border: "2px solid",
              paddingY: "10px",
              paddingX: "15px",
              borderRadius: "10px",
              marginRight: "40px",
              ...(checkedGender == "Male"
                ? { borderColor: "#268500" }
                : { borderColor: "#D2D2D2" }),
              marginBottom: "30px",
            }}
          >
            <FormControlLabel
              onClick={() => {
                setCheckedGender("Male"),
                  localStorage.setItem("gender", "Male");
              }}
              value="Male"
              control={<Radio />}
              label="Male"
            />
          </Box>
          <Box
            onClick={() => setCheckedGender("Female")}
            sx={{
              cursor: "pointer",
              border: "2px solid",
              paddingY: "10px",
              paddingX: "15px",
              borderRadius: "10px",
              ...(checkedGender == "Female"
                ? { borderColor: "#268500" }
                : { borderColor: "#D2D2D2" }),
              marginBottom: "30px",
            }}
          >
            <FormControlLabel
              onClick={(e) => {
                setCheckedGender("Female"),
                  localStorage.setItem("gender", "Female");
              }}
              value="Female"
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
                      newDate
                        ? localStorage.setItem(
                            "dob",
                            newDate.add(1, "day").toISOString().substring(0, 10)
                          )
                        : null;
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
                    e.target.value
                      ? localStorage.setItem("maritalStatus", e.target.value)
                      : null;
                  }}
                >
                  {["-- Select --", "Single", "Married"].map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
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
                  value={phone}
                  onChange={(event: {
                    target: {
                      value: string;
                    };
                  }) => {
                    setPhone(event?.target.value);
                    event.target.value
                      ? localStorage.setItem("phone", event.target.value)
                      : null;
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
                  value={altPhone}
                  onChange={(event: {
                    target: {
                      value: string;
                    };
                  }) => {
                    setAltPhone(event?.target.value);
                    event.target.value
                      ? localStorage.setItem("altPhone", event.target.value)
                      : null;
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
              event.target.value
                ? localStorage.setItem("homeAddress", event.target.value)
                : null;
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
                    e.target.value
                      ? localStorage.setItem("stateOfOrigin", e.target.value)
                      : null;
                  }}
                >
                  {["-- Select --", ...states_in_nigeria_dropdown].map(
                    (item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    )
                  )}
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
                  value={lga}
                  onChange={(event: {
                    target: {
                      value: string;
                    };
                  }) => {
                    setLga(event?.target.value);
                    event.target.value
                      ? localStorage.setItem("lga", event.target.value)
                      : null;
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
                    onClick={() =>
                      sendDataToParent({
                        image: image,
                        gender: checkedGender,
                        dob: dob?.format("DD/MM/YYYY"),
                        maritalStatus: maritalStatus,
                        phone: phone,
                        altPhone: altPhone,
                        homeAddress: homeAddress,
                        stateOfOrigin: stateOfOrigin,
                        lga: lga,
                      })
                    }
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
