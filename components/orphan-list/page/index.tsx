"use client";
import { Box } from "@mui/material";
import SubHeader from "../../sub-header";
import OrphanListTable from "../../tables/orphan-list";
import { useQuery } from "@tanstack/react-query";
import { getOrphans } from "../../../service/orphan-list";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoaderBackdrop from "../../common/loader";
import NeedList from "../../../components/tables/need-list";
import { useEffect } from "react";
import { OrphanProps } from "@/types";

const OrphanListPage: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.token?.accessToken ?? " ";
  const accountType = session?.user?.profile?.roles[0];

const { data, isLoading, status, error } = useQuery<OrphanProps[]>({
    queryKey: ["orphans"],
    queryFn: () => getOrphans(token),
  enabled: !!token,
  });
  const handleButtonTwoClick = () => {
    router.push("/dashboard/guardian/orphan-list/add-an-orphan");
  };

  const handleFilterButtonClick = () => {
    console.log("Filtering");
  };

  const handleExportClick = () => {
    console.log("Exporting");
  };
  const handlePrintClick = () => {
    console.log("Printing");
  };

  useEffect(() => {

   
    if (!token) {
      // Optionally, you can redirect to a login page or show a warning if token is not available
      router.push("/login");
    }
    // Logging different parts of data fetching process
    if (status === "pending") {
      console.log("Loading orphan data...");
    } else if (status === "error") {
      console.error("Error fetching orphan data:", error);
    } else if (status === "success" && data) {
      console.log("Fetched orphan data:", data);
    }
  }, [data, status, error, token, router]);

  return (
    <Box>
      {isLoading && <LoaderBackdrop />}
      <Box>
        <h1>Orphan List</h1>
      </Box>
      <Box>
        <SubHeader
          itemCount={undefined}
          buttonTwoText={"Add Orphans"}
          buttonTwoIcon="/plus.svg"
          buttonTwoClick={handleButtonTwoClick}
          exportButton={handleExportClick}
          printButton={handlePrintClick}
          filterButton={handleFilterButtonClick}
          pageHasTable={true}
          searchQuery={(data) => console.log(data)}
        />
      </Box>
      {accountType === "SPONSOR" ? (
        <Box sx={{ marginX: "-30px" }}>
          <NeedList />
        </Box>
      ) : (
        <Box sx={{ marginY: "5px" }}>
        <OrphanListTable orphanData={data || []} />
          {/* <OrphanListTable orphanData={[{}]} /> */}
          {/* <OrphanSponsorshipCard cardData={[]} /> */}
        </Box>
      )}
    </Box>
  );
};

export default OrphanListPage;
