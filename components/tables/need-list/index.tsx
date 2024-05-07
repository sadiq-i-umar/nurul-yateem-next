import React from "react";
import List from "./list";
import { Box, Grid } from "@mui/material";

const Index = () => {
  return (
    <Box sx={{ mb: "20px" }}>
      <Grid container spacing={2}>
        <Grid sx={{ minHeight: "100%" }} item xs={12} lg={4}>
          <Box sx={{ height: "100%", overflow: "hidden" }}>
            <List />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Index;
