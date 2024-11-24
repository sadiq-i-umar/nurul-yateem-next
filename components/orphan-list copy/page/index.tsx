"use client";
import { Box } from "@mui/material";
import SubHeader from "../../sub-header";
import OrphanListTable from "../../tables/orphan-list";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoaderBackdrop from "../../common/loader";
import NeedList from "../../tables/need-list";
import { getOrphans } from "@/src/app/api/service/orphan-list";
import { useState } from "react";

const OrphanListPage: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user.token.accessToken ??  "";
  const accountType = session?.user?.profile.roles;

      const [appliedFilters, setAppliedFilters] = useState<any>({}); 


  const { data, isLoading, status } = useQuery({
    queryKey: ["orphans"],
    queryFn: () => getOrphans(token),
    enabled: !!token,
  });

   
  const handleFilterApply = (filters: any) => {
    setAppliedFilters(filters); 
  };

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
                    onFilterApply={handleFilterApply}

        />
      </Box>
      {accountType === "SPONSOR" ? (
        <Box sx={{ marginX: "-30px" }}>
          <NeedList />
        </Box>
      ) : (
        <Box sx={{ marginY: "5px" }}>
        <OrphanListTable orphanData={data || []} appliedFilters={appliedFilters} />
          {/* <OrphanListTable orphanData={[{}]} /> */}
          {/* <OrphanSponsorshipCard /> */}
        </Box>
      )}
    </Box>
  );
};

export default OrphanListPage;
