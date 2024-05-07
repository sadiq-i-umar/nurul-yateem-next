import { Box, LinearProgress, Skeleton, Typography } from "@mui/material";
import React from "react";
import Details from "./details";

function ActivityBar({
  sector,
  total,
  progress,
  des,
  size,
}: {
  sector: string;
  total: number;
  des: string;
  size: number;
  progress: number;
}) {
  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" gutterBottom>
          {sector}
        </Typography>
      </Box>
      {
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            width: "100%",
            height: 10,
            borderRadius: "5px",
            bgcolor: "#F0F2F5",
            "& .MuiLinearProgress-bar": {
              bgcolor: "#A3B7FD",
            },
          }}
        />
      }
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Details des={des} size={size} />
        <Typography variant="h6" gutterBottom>
          {total}
        </Typography>
      </Box>
    </Box>
  );
}

export default ActivityBar;
