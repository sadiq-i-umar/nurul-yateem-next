"use client";

import { Box, Button, Typography } from "@mui/material";
import SubHeader from "../../sub-header";
import { useQuery } from "@tanstack/react-query";
import { getOrphans } from "../../../service/orphan-list";
import { useSession } from "next-auth/react";
import LoaderBackdrop from "../../common/loader";
import ActivityDialog from "../Reusable-Dialog";
import { useState } from "react";
import ActivityHeader from "../Reusable-Dialog/ActivityHeader";
import ActivityBody from "../Reusable-Dialog/ActivityBody";
import Image from "next/image";
import EmptyImag from "../../../public/nocontentbackup.svg";
import AddIcon from "@mui/icons-material/Add";
import UsersTable from "../../tables/users";

const sampleUserData = [
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    profile_photo: "/profile1.jpg",
    user_type: "Sponsor",
    privilege_level: "High",
    status: "Active",
  },
  {
    id: 2,
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    profile_photo: "/profile2.jpg",
    user_type: "Admin",
    privilege_level: "Medium",
    status: "Inactive",
  },
];

const UsersPage: React.FC = () => {
  const { data: session } = useSession();
  const token = session?.token;
  const [openDialog, setOpenDoalog] = useState(false);

  const { data, isLoading, status } = useQuery({
    queryKey: ["orphans"],
    queryFn: () => getOrphans(token),
    enabled: !!token,
  });

  const handleButtonTwoClick = () => {
    setOpenDoalog(true);
  };

  const handleClickClose = () => {
    setOpenDoalog(false);
  };

  const handleExportClick = () => {
    console.log("Exporting");
  };
  const handlePrintClick = () => {
    console.log("Printing");
  };

  const handleFilterButtonClick = () => {
    console.log("Filtering");
  };

  return (
    <Box>
      {isLoading && <LoaderBackdrop />}
      <Box>
        <h1>Users</h1>
      </Box>
      {1 == 1 ? (
        <Box>
          <Box>
            <SubHeader
              title={""}
              subtitle={""}
              itemCount={undefined}
              buttonTwoText={"Add new user"}
              buttonTwoIcon="/plus.svg"
              exportButton={handleExportClick}
              printButton={handlePrintClick}
              filterButton={handleFilterButtonClick}
              itemCountLabel={""}
              buttonTwoClick={handleButtonTwoClick}
              pageHasTable={true}
            />
          </Box>
          <Box sx={{ marginX: "-30px" }}>
            {/* <OrphanActivityTable orphanData={data?.orphans} /> */}
            <UsersTable userData={sampleUserData} />
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

export default UsersPage;
