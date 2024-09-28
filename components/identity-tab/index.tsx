import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  SelectChangeEvent, // Import SelectChangeEvent from @mui/material
} from "@mui/material";
import { identityOptions } from "../../utils";
import { useGuardianStore } from "../../utils/zustand/guardianstore";
import { Identity } from "../../utils/interfaces";
import toast from "react-hot-toast";

const IdentityTab: React.FC<{
  onSubmitClick: (identity: Identity) => void;
}> = ({ onSubmitClick }) => {
  const {
    meansOfIdentification,
    identificationNumber,
    setMeansOfIdentification,
    setIdentificationNumber,
  } = useGuardianStore();

  const [meansOfIdentificationError, setMeansOfIdentificationError] =
    useState(false);
  const [identificationNumberError, setIdentificationNumberError] =
    useState(false);

  const handleMeansOfIdentificationChange = (
    event: SelectChangeEvent<string>,
    child: React.ReactNode,
  ) => {
    const value = event.target.value;
    setMeansOfIdentification(value);
    setMeansOfIdentificationError(false);
  };

  const sendDataToParent = () => {
    let isValid = true;
    if (!meansOfIdentification) {
      setMeansOfIdentificationError(true);
      isValid = false;
    }
    if (!identificationNumber) {
      setIdentificationNumberError(true);
      isValid = false;
    }

    if (!isValid) {
      toast.error("Please fill in all required fields");
    }

    if (isValid) {
      onSubmitClick({
        meansOfIdentification: meansOfIdentification,
        identificationNumber: identificationNumber,
      });
    }
  };

  return (
    <Box>
      <Box sx={{ marginBottom: "20px" }}>
        <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
          Step 3: Identity
        </Typography>
      </Box>
      <Box sx={{ marginBottom: "10px" }}>
        <Grid container spacing={5}>
          <Grid item lg={6}>
            <Box sx={{ marginBottom: "21.5px" }}>
              <Box sx={{ marginBottom: "11.5px" }}>
                <Typography>Means of Identification</Typography>
              </Box>
              <Box sx={{ borderRadius: "10px" }}>
                <Select
                  value={meansOfIdentification}
                  onChange={handleMeansOfIdentificationChange}
                  sx={{
                    borderRadius: "10px",
                    width: "100%",
                  }}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    -- Select --
                  </MenuItem>
                  {identityOptions?.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option?.label}
                    </MenuItem>
                  ))}
                </Select>
                {meansOfIdentificationError && (
                  <Typography component="p" color="error">
                    Please select means of identification
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item lg={6}>
            <Box sx={{ marginBottom: "21.5px" }}>
              <Box sx={{ marginBottom: "11.5px" }}>
                <Typography>Identification Number</Typography>
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
                  placeholder="Enter ID Number"
                  value={identificationNumber}
                  onChange={(event: React.ChangeEvent<{ value: string }>) => {
                    setIdentificationNumber(event.target.value);
                    setIdentificationNumberError(false);
                  }}
                />
                {identificationNumberError && (
                  <Typography component="p" color="error">
                    Please enter identification number
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

export default IdentityTab;
