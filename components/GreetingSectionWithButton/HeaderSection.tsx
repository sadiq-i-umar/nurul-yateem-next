"use client";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeaderSection() {
  const router = useRouter();
  const { data: session } = useSession();
  const firstName = session?.user?.firstName;
  const lastName = session?.user?.lastName;
  const accountType = session?.user?.accountType;

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
            backgroundColor: "#3863FA",
            zIndex: 0,
            "&:hover": {
              backgroundColor: "#3863FA",
            },
          }}
          onClick={() => {
            if (accountType === "SPONSOR") {
              router.push("/dashboard");
            } else {
              router.push("/dashboard/guardian/orphan-list/add-an-orphan");
            }
          }}
        >
          {accountType == "SPONSOR" ? (
            <Typography>Donate to an orphan</Typography>
          ) : (
            <>
              <Image src="/plus.svg" width={20} height={20} alt={"Plus Icon"} />
              <Typography>Add an Orphan</Typography>
            </>
          )}
        </Button>
      </Box>
    </Box>
  );
}
