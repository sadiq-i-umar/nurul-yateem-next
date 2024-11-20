"use client";

import { Box, Button, Typography } from "@mui/material";
import SubHeader from "../../sub-header";
import OrphanActivityTable from "../../tables/orphan-activity";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoaderBackdrop from "../../common/loader";
import ActivityDialog from "../Reusable-Dialog";
import { useEffect, useState } from "react";
import ActivityHeader from "../Reusable-Dialog/ActivityHeader";
import ActivityBody from "../Reusable-Dialog/ActivityBody";
import Image from "next/image";
import EmptyImag from "../../../public/nocontentbackup.svg";
import AddIcon from "@mui/icons-material/Add";
import { getOrphans } from "@/src/app/api/service/orphan-list";
import { OrphanProps } from "@/types";

const OrphanActivityPage: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [openDialog, setOpenDoalog] = useState(false);
  const [token , setToken] = useState("")

   useEffect(() => {
    if (session)
    {
      setToken(session.user.token.accessToken);
    }
     
  },[session ])

  // Query to fetch orphans data, only enabled when token is available
  const { data, isLoading, status, error } = useQuery<OrphanProps[]>({
    queryKey: ["orphans",token],
    queryFn: () => getOrphans(token), // Provide fallback to an empty string
  });

  // Logging for data-fetching states
  useEffect(() => {
    if (status === "pending") {
      console.log("Loading orphan data...");
    } else if (status === "error") {
      console.error("Error fetching orphan data:", error);
    } else if (status === "success") {
      console.log("Fetched orphan data:", data);
    }
  }, [status, data, error]);
 

  const handleButtonTwoClick = () => {
    setOpenDoalog(true);
  };

  const handleClickClose = () => {
    setOpenDoalog(false);
  };
  return (
    <Box>
      {isLoading && <LoaderBackdrop />}
      <Box>
        <h1>Orphan Activities</h1>
      </Box>
      {1 == 1 ? (
        <Box>
          <Box>
            <SubHeader
              title={""}
              subtitle={""}
              itemCount={undefined}
              buttonTwoText={"Add an Activity"}
              buttonTwoIcon="/plus.svg"
              itemCountLabel={""}
              buttonTwoClick={handleButtonTwoClick}
              pageHasTable={true}
            />
          </Box>
          <Box sx={{ marginX: "-30px" }}>
            {/* <OrphanActivityTable orphanData={data?.orphans} /> */}
            <OrphanActivityTable orphanData={[{}]} />
          </Box>
        </Box>
      ) : (
        // JSX comment should be inside curly braces
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
              gap: "20px",
            }}
          >
            <Box>
              <Image src={EmptyImag} alt="Empty" width={600} height={300} />
            </Box>
            <Box>
              <Typography
                variant="h2"
                sx={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "black",
                  mb: { xs: "5px", sm: "0px" },
                  wordBreak: "break-all",
                }}
              >
                You haven’t created an activity yet for an orphan!
              </Typography>
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
                startIcon={<AddIcon />}
                onClick={handleButtonTwoClick}
              >
                Create an Activity
              </Button>
            </Box>
          </Box>
        </>
      )}
      <ActivityDialog
        open={openDialog}
        onClose={handleClickClose}
        title={<ActivityHeader />}
        content={<ActivityBody />}
      />
    </Box>
  );
};

export default OrphanActivityPage;
