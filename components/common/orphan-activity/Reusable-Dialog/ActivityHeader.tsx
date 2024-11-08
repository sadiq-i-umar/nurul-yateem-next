import { Box, Typography } from "@mui/material";
import React from "react";

const ActivityHeader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: 2,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: "25px",
          fontWeight: 700,
          color: "black",
          mb: { xs: "5px", sm: "0px" },
          wordBreak: "break-all",
        }}
      >
        What type of activity ?
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontSize: "16px",
          fontWeight: 200,
          mb: { xs: "5px", sm: "0px" },
          wordBreak: "break-all",
        }}
      >
        This helps to track orphans progress and performance
      </Typography>
    </Box>
  );
};

export default ActivityHeader;
