// This line tells Next.js that this page should be rendered on the client-side
"use client";

// Import necessary components from Material-UI
import { Box, Button, Divider, Link } from "@mui/material";

// Import custom components from other files
import Profile from "./components/Profile";
import TwoFA from "./components/2FA";
import { useState } from "react";
import PasswordTab from "./components/PasswordTab";

// Define the default function for the Settings page
export default function Settings() {
  // Initialize a state variable `activeTab` with an initial value of 1
  // This state variable will be used to track which tab is currently active
  const [activeTab, setActiveTab] = useState(1);

  // Define an array of objects, each representing a tab
  // Each object has a `text` property for the tab label and a `value` property for the tab ID
  const tabs = [
    { text: "My profile", value: 1 },
    { text: "Account Details", value: 2 },
    { text: "Password", value: 3 },
    { text: "Notification", value: 4 },
    { text: "2-Factor Authentication", value: 5 },
  ];

  // Return the JSX for the Settings page
  return (
    // Outer Box component with padding
    <Box sx={{ p: 2 }}>
      {/* // Page title */}
      <h1>Settings Page</h1>

      {/* // Inner Box component with padding */}
      <Box sx={{ p: 2 }}>
        {/* // Map over the `tabs` array and render a Button component for each tab */}
        {tabs.map((tab, index) => (
          // Button component with key, onClick handler, and variant (contained or not)
          <Button
            key={index}
            onClick={
              tab.value !== undefined
                ? () => setActiveTab(tab.value)
                : undefined
            }
            variant={activeTab === tab.value ? "contained" : undefined}
            sx={{ marginLeft: index > 0 ? 4 : 0 }}
          >
            {/* // Display the tab label */}
            {tab.text}
          </Button>
        ))}
      </Box>

      {/* Divider component to separate the tabs from the content*/}
      <Divider />

      {/* // Conditional rendering of the content based on the active tab
      // If the active tab is 1, render the Profile component */}
      {activeTab === 1 && <Profile />}
      {/* // If the active tab is 2, render the Profile component */}
      {activeTab === 2 && <></>}
      {/* // If the active tab is 3, render the PasswordTab component (should be PasswordTab?) */}
      {activeTab === 3 && <PasswordTab />}
      {/* // If the active tab is 4, render the Notification component */}
      {activeTab === 4 && <></>}
      {/* // If the active tab is 5, render the TwoFA component */}
      {activeTab === 5 && <TwoFA />}
    </Box>
  );
}
