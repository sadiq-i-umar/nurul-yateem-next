//C:\Users\AHMED AHMAN\Desktop\nurul-yateem-next\components\orphan-list\page\index.tsx
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

const OrphanListPage: React.FC = () => {
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
        <Box sx={{ marginX: "-30px" }}>
          <OrphanListTable orphanData={data?.orphans} />
        </Box>
      )}
    </Box>
  );
};

export default OrphanListPage;
