"use client";
import { Box } from "@mui/material";
import SubHeader from "../../sub-header";
import OrphanListTable from "../../tables/orphan-list";
import { useQuery } from "@tanstack/react-query";
import { getOrphans } from "../../../service/orphan-list";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoaderBackdrop from "../../common/loader";
import OrphanRequestListTable from "../../tables/orphan-request-list";

const OrphanListRequest: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.token;
  const accountType = session?.user?.accountType;

  const { data, isLoading, status } = useQuery({
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

  return (
    <Box>
      {isLoading && <LoaderBackdrop />}

      <Box>
        <SubHeader
          itemCount={undefined}
          exportButton={handleExportClick}
          printButton={handlePrintClick}
          filterButton={handleFilterButtonClick}
          pageHasTable={true}
          searchQuery={(data) => console.log(data)}
        />
      </Box>

      <Box sx={{ marginY: "5px" }}>
        <OrphanRequestListTable orphanData={data?.orphans} />
        {/* <OrphanListTable orphanData={[{}]} /> */}
        {/* <OrphanSponsorshipCard /> */}
      </Box>
    </Box>
  );
};

export default OrphanListRequest;