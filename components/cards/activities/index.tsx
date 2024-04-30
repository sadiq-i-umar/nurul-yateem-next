"use client";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Link,
  Skeleton,
} from "@mui/material";
import React from "react";
import ActivityBar from "./activity-bar";
import IndustriesSort from "./industry-sort";
import Details from "./activity-bar/details";

function Activities({
  title,
  subheader,
  industries,
  ...other
}: {
  title: string;
  subheader: string;
  industries: {
    sector: string;
    total: number;
    progress: number;
    size: number;
    des: string;
  }[];
}) {
  return (
    <Card {...other} sx={{ borderRadius: "10px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pr: 3,
          pl: 1,
        }}
      >
        <CardHeader title={title} subheader={subheader} />
        {<IndustriesSort />}
      </Box>

      <Box sx={{ p: 3, py: 1 }}>
        {industries.map((industry) => (
          <ActivityBar
            sector={industry.sector}
            total={industry.total}
            progress={industry.progress}
            key={industry.sector}
            size={industry.size}
            des={industry.des}
          />
        ))}
      </Box>
    </Card>
  );
}

export default Activities;
