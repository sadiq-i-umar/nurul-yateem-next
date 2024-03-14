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
import Image from "next/image";
import { useState } from "react";
import { Identity } from "../../utils/interfaces";

const IdentityTab: React.FC<{
  onSubmitClick: (identity: Identity) => void;
}> = ({ onSubmitClick }) => {
  //Reset scroll on tab display
  window.scrollTo({
    top: 0,
  });

  //Clear items in local storage before page is unloaded
  window.onbeforeunload = function () {
    localStorage.setItem("meansOfIdentification", "-- Select --");
    localStorage.setItem("identificationNumber", "");
  };

  const storedMeansOfIdentification = localStorage.getItem(
    "meansOfIdentification"
  );
  const storedIdentificationNumber = localStorage.getItem(
    "identificationNumber"
  );

  const [meansOfIdentification, setMeansOfIdentification] = useState(
    storedMeansOfIdentification
  );
  const [identificationNumber, setIdentificationNumber] = useState(
    storedIdentificationNumber
  );

  const sendDataToParent = (data: Identity) => {
    onSubmitClick(data);
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
                  sx={{
                    borderRadius: "10px",
                    width: "100%",
                  }}
                  onChange={(e) => {
                    setMeansOfIdentification(e.target.value);
                    e.target.value
                      ? localStorage.setItem(
                          "meansOfIdentification",
                          e.target.value
                        )
                      : null;
                  }}
                >
                  {[
                    "-- Select --",
                    "NATIONAL_ID",
                    "DRIVER_LICENCE",
                    "VOTERS_CARD",
                    "INTERNATIONAL_PASSPORT",
                  ].map((item, index) => (
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
                  onChange={(event: {
                    target: {
                      value: string;
                    };
                  }) => {
                    setIdentificationNumber(event?.target.value);
                    event.target.value
                      ? localStorage.setItem(
                          "identificationNumber",
                          event.target.value
                        )
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
                        meansOfIdentification: meansOfIdentification,
                        identificationNumber: identificationNumber,
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
