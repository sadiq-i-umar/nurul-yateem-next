"use client";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function HeaderSection() {
  const { data: session } = useSession();
  const firstName = session?.user?.firstName;
  const lastName = session?.user?.lastName;

  // Get current hour
  const currentHour = new Date().getHours();
  let greeting = "";
  if (currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  return (
    <Box
      sx={{
        display: "flex",
        marginTop: "40px",
        marginBottom: "30px",
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Box sx={{ flexGrow: 1, marginBottom: { xs: "20px", sm: "0px" } }}>
        <Box>
          <Typography sx={{ fontSize: "18px", textTransform: "capitalize" }}>
            {`${greeting},`}{" "}
            {firstName ? (
              <span>{`${firstName} ${lastName}`}</span>
            ) : (
              <Skeleton
                sx={{ display: "inline-block" }}
                variant="text"
                animation="pulse"
                width={140}
                height={24}
              />
            )}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: "14px" }}>
            Explore and build your foundation
          </Typography>
        </Box>
      </Box>
      <Box>
        <Button
          variant="contained"
          disableElevation
          sx={{
            textTransform: "none",
            borderRadius: "30px",
            paddingX: "20px",
            paddingY: "10px",
            zIndex: 0,
          }}
        >
          <Image src="/plus.svg" width={20} height={20} alt={"Plus Icon"} />
          <Typography>Add an Orphan</Typography>
        </Button>
      </Box>
    </Box>
  );
}
