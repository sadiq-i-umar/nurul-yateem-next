import { Box, Typography } from "@mui/material";
import React from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const Details = ({ des, size }: { des: string; size: number }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        fontSize: "10px",
        gap: "5px",
        color: "#98A2B3",
      }}
    >
      <Typography>{des}</Typography>
      <FiberManualRecordIcon
        sx={{
          fontSize: "10px",
          color: "#98A2B3",
        }}
      />
      <Typography>{size}</Typography>
    </Box>
  );
};

export default Details;
