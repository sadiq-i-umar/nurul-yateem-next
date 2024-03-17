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

const OccupationTab: React.FC<{
  onNextClick: (occupation: Occupation) => void;
}> = ({ onNextClick }) => {
  //Reset scroll on tab display
  window.scrollTo({
    top: 0,
  });

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

  const sendDataToParent = (data: Occupation) => {
    onNextClick(data);
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
                  }}
                />
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
                  }}
                />
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
                  }}
                />
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
                  }}
                />
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
            }}
            multiline
            rows={4}
          />
        </Box>
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
                        employmentStatus: employmentStatus,
                        natureOfJob: natureOfOccupation,
                        annualIncome: annualIncome,
                        employerName: employerName,
                        employerPhone: employerPhone,
                        employerAddress: employerAddress,
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

export default OccupationTab;
