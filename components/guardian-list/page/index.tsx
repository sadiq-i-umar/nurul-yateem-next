"use client";
import { Box } from "@mui/material";
import SubHeader from "../../sub-header";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoaderBackdrop from "../../common/loader";
import NeedList from "../../../components/tables/need-list";
import GuardianListTable from "../../tables/guardian-list";
import { getOrphans } from "@/src/app/api/service/orphan-list";

const GuardianListPage: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user.token.accessToken ?? "";
  const accountType = session?.user?.profile.roles;

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
        <h1>Guardian List</h1>
      </Box>
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
      {accountType === "SPONSOR" ? (
        <Box sx={{ marginX: "-30px" }}>
          <NeedList />
        </Box>
      ) : (
        <Box sx={{ marginY: "5px" }}>
          <GuardianListTable orphanData={data || []} />
          {/* <OrphanListTable orphanData={[{}]} /> */}
          {/* <OrphanSponsorshipCard /> */}
        </Box>
      )}
    </Box>
  );
};

export default GuardianListPage;
