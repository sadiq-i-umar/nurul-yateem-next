import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { occupationOptions } from "../../utils";
import { useGuardianStore } from "../../utils/zustand/guardianstore";
import { Occupation } from "../../utils/interfaces";
import { useState } from "react";
import { setEnvironmentData } from "worker_threads";
import toast from "react-hot-toast";

const OccupationTab: React.FC<{
  onNextClick: (occupation: Occupation) => void;
}> = ({ onNextClick }) => {
  const {
    employmentStatus,
    setEmploymentStatus,
    natureOfOccupation,
    setNatureOfOccupation,
    annualIncome,
    setAnnualIncome,
    employerName,
    setEmployerName,
    employerPhone,
    setEmployerPhone,
    employerAddress,
    setEmployerAddress,
  } = useGuardianStore();

  const [employmentStatusError, setEmploymentStatusError] = useState(false);
  const [natureOfOccupationError, setNatureOfOccupationError] = useState(false);
  const [annualIncomeError, setAnnualIncomeError] = useState(false);
  const [employerNameError, setEmployerNameError] = useState(false);
  const [employerPhoneError, setEmployerPhoneError] = useState(false);
  const [employerAddressError, setEmployerAddressError] = useState(false);

  const sendDataToParent = () => {
    let isValid = true;
    if (!employmentStatus) {
      setEmploymentStatusError(true);
      isValid = false;
    }
    if (!natureOfOccupation) {
      setNatureOfOccupationError(true);
      isValid = false;
    }
    if (!annualIncome) {
      setAnnualIncomeError(true);
      isValid = false;
    }
    if (!employerName) {
      setEmployerNameError(true);
      isValid = false;
    }
    if (!employerPhone) {
      setEmployerPhoneError(true);
      isValid = false;
    }
    if (!employerAddress) {
      setEmployerAddressError(true);
      isValid = false;
    }
    if (!isValid) {
      toast.error("Please fill in all required fields");
    }

    if (isValid) {
      onNextClick({
        employmentStatus,
        natureOfOccupation,
        annualIncome,
        employerName,
        employerPhone,
        employerAddress,
      });
    }
  };

  return (
    <Box>
      <Box sx={{ marginBottom: "20px" }}>
        <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
          Step 2: Occupation
        </Typography>
      </Box>
      <Box sx={{ marginBottom: "10px" }}>
        <Grid container spacing={5}>
          <Grid item lg={6}>
            <Box sx={{ marginBottom: "21.5px" }}>
              <Box sx={{ marginBottom: "11.5px" }}>
                <Typography>Employment Status</Typography>
              </Box>
              <Box sx={{ borderRadius: "10px" }}>
                <Select
                  value={employmentStatus}
                  sx={{
                    borderRadius: "10px",
                    width: "100%",
                  }}
                  onChange={(e) => {
                    setEmploymentStatus(e.target.value);
                    setEmploymentStatusError(false);
                  }}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    -- Select --
                  </MenuItem>
                  {occupationOptions.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {employmentStatusError && (
                  <Typography component="p" color="error">
                    Employment Status is required
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item lg={6}>
            <Box sx={{ marginBottom: "21.5px" }}>
              <Box sx={{ marginBottom: "11.5px" }}>
                <Typography>Nature of Job</Typography>
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
                  placeholder="Enter Nature of Job"
                  value={natureOfOccupation}
                  onChange={(event: {
                    target: {
                      value: string;
                    };
                  }) => {
                    setNatureOfOccupation(event?.target.value);
                    setNatureOfOccupationError(false);
                  }}
                />
                {natureOfOccupationError && (
                  <Typography component="p" color="error">
                    Nature of Job is required
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
                <Typography>Annual Income</Typography>
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
                  placeholder="Enter Annual Income"
                  value={annualIncome}
                  onChange={(event: {
                    target: {
                      value: string;
                    };
                  }) => {
                    setAnnualIncome(event?.target.value);
                    setAnnualIncomeError(false);
                  }}
                />
                {annualIncomeError && (
                  <Typography component="p" color="error">
                    Annual Income is required
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item lg={6}>
            <Box sx={{ marginBottom: "21.5px" }}>
              <Box sx={{ marginBottom: "11.5px" }}>
                <Typography>Employer&apos;s Name</Typography>
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
                  placeholder="Employer's name"
                  value={employerName}
                  onChange={(event: {
                    target: {
                      value: string;
                    };
                  }) => {
                    setEmployerName(event?.target.value);
                    setEmployerNameError(false);
                  }}
                />
                {employerNameError && (
                  <Typography component="p" color="error">
                    Employer&apos;s Name is required
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ marginBottom: "15px" }}>
        <Grid container spacing={5}>
          <Grid item lg={6}>
            <Box sx={{ marginBottom: "21.5px" }}>
              <Box sx={{ marginBottom: "11.5px" }}>
                <Typography>Employer&apos;s Phone Number</Typography>
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
                  value={employerPhone}
                  onChange={(event: {
                    target: {
                      value: string;
                    };
                  }) => {
                    setEmployerPhone(event?.target.value);
                    setEmployerPhoneError(false);
                  }}
                />
                {employerPhoneError && (
                  <Typography component="p" color="error">
                    Employer&apos;s Phone Number is required
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item lg={6}></Grid>
        </Grid>
      </Box>
      <Box sx={{ marginBottom: "50px" }}>
        <Box sx={{ marginBottom: "11.5px" }}>
          <Typography>Employer&apos;s Address</Typography>
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
            value={employerAddress}
            onChange={(event: {
              target: {
                value: string;
              };
            }) => {
              setEmployerAddress(event?.target.value);
              setEmployerAddressError(false);
            }}
            multiline
            rows={4}
          />
          {employerAddressError && (
            <Typography component="p" color="error">
              Employer&apos;s Address is required
            </Typography>
          )}
        </Box>
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

export default OccupationTab;
