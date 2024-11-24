"use client";
import { Box } from "@mui/material";
import SubHeader from "../../sub-header";
import OrphanListTable from "../../tables/orphan-list";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoaderBackdrop from "../../common/loader";
import { getOrphans } from "@/src/app/api/service/orphan-list";
import { useState } from "react";

const RemovalRequest: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.token?.accessToken || "";
  const accountType = session?.user?.profile.roles;

      const [appliedFilters, setAppliedFilters] = useState<any>({}); 


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

  const handleFilterApply = (filters: any) => {
    setAppliedFilters(filters); 
  };

  return (
    <Box>
      {isLoading && <LoaderBackdrop />}

      <Box>
        <SubHeader
          itemCount={undefined}
          printButton={handlePrintClick}
          filterButton={handleFilterButtonClick}
          pageHasTable={true}
          searchQuery={(data) => console.log(data)}
        />
      </Box>

      <Box sx={{ marginY: "5px" }}>
        <OrphanListTable orphanData={data || []} appliedFilters={appliedFilters} />
        {/* <OrphanListTable orphanData={[{}]} /> */}
        {/* <OrphanSponsorshipCard /> */}
      </Box>
    </Box>
  );
};

export default RemovalRequest;
