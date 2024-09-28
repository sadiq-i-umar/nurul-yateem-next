"use client";
import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import OrphanListRequest from "./orphan-list-request";
import RemovalRequest from "./removal-request";
import GuardianRequest from "./guardian-request";

// Components for each request tab content
function OrphanListRequestTab() {
  return <OrphanListRequest />;
}

function RemovalRequestTab() {
  return <RemovalRequest />;
}

function GuardianRequestTab() {
  return <GuardianRequest />;
}

function SponsorshipRequestTab() {
  return (
    <Box>
      <Typography variant="h6">Sponsorship Request</Typography>
      {/* Add your Sponsorship Request content here */}
    </Box>
  );
}

export default function ApplicationPage() {
  const [activeTab, setActiveTab] = useState(0);

  // Handle tab change
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Tabs Container with responsive design */}
      <Box
        sx={{
          width: "100%",
          padding: { xs: "5px", sm: "15px" },
          backgroundColor: "white",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            // Make tabs smaller and scrollable on smaller screens
            "& .MuiTab-root": {
              minWidth: { xs: 100, sm: 150 }, // Smaller width on small screens
              fontSize: { xs: "0.8rem", sm: "1rem" }, // Adjust font size for mobile
            },
          }}
        >
          <Tab label="Orphan List Request" />
          <Tab label="Removal Request" />
          <Tab label="Guardian Request" />
          <Tab label="Sponsorship Request" />
        </Tabs>
      </Box>

      {/* Conditional Rendering of Tab Content */}
      <Box sx={{ padding: 3 }}>
        {activeTab === 0 && <OrphanListRequestTab />}
        {activeTab === 1 && <RemovalRequestTab />}
        {activeTab === 2 && <GuardianRequestTab />}
        {activeTab === 3 && <SponsorshipRequestTab />}
      </Box>
    </Box>
  );
}
