"use client";
import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import LoaderBackdrop from "../common/loader";
import AddAnOrphanForm from "./add-an-orphan-form";
import { useSession } from "next-auth/react";
import AddOrphanSuccess from "./success/page";
import { usePathname } from "next/navigation";

const AddAnOrphan: React.FC = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleFormSuccess = () => {
    setShowSuccessMessage(true); // Trigger success message/page
  };

  return (
    <>
      {isLoading && <LoaderBackdrop />}
      <Box>
        {/* Show success message/page conditionally */}
        {showSuccessMessage ? (
          <AddOrphanSuccess />
        ) : (
          <Grid container>
            <Grid item lg={12}>
              {pathname == "/dashboard/add-an-orphan" && (
                <Grid item xs={0} sm={5} md={4} lg={3}></Grid>
              )}

              <Grid
                sx={{
                  marginBottom: "50px",
                  padding: "40px",
                }}
                item
                xs={12}
                sm={7}
                md={8}
                lg={11}
                >
                  {pathname == "/dashboard/guardian/orphan-list/add-an-orphan" && (
<Box sx={{ my: 2 }}>
                  <Typography variant="h1">Create an Orphan Account</Typography>
                  <Typography sx={{}}>
                    Simply fill in the detail below
                  </Typography>
                </Box>
)}
                
                {/* Pass the success handler to form */}
                <AddAnOrphanForm onSuccess={handleFormSuccess} />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default AddAnOrphan;
