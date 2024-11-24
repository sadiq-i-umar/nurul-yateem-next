"use client";
import { Box } from "@mui/material";
import SubHeader from "../../sub-header";
import OrphanListTable from "../../tables/orphan-list";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoaderBackdrop from "../../common/loader";
import NeedList from "../../../components/tables/need-list";
import { useEffect, useState } from "react";
import { OrphanProps } from "@/types";
import { getOrphans } from "@/src/app/api/service/orphan-list";


const OrphanListPage: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  // const token = session?.user?.token?.accessToken ?? " ";
  const [token, setToken] = useState("");
  const accountType = session?.user?.profile?.roles[0];

    const [appliedFilters, setAppliedFilters] = useState<any>({}); 


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


  // Effect to ensure the token is available before proceeding
  // useEffect(() => {
  //   if (!token) {
  //     // Redirect to login if no token is available
  //     console.warn("Token not found, redirecting to login...");
  //     router.push("/login");
  //   } else {
  //     // Update state to indicate token is ready
  //     setTokenAvailable(true);
  //   }
  // }, [token, router]);

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
  
  const handleFilterApply = (filters: any) => {
    setAppliedFilters(filters); 
  };

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
 

  return (
    <Box>
      {isLoading && <LoaderBackdrop />}
      <Box sx={{ marginY: "5px" , marginX: "-8px" , ml:'8px' }}>
        <h1>Orphan List</h1>
      </Box>
      <Box sx={{ marginY: "5px" , marginX: "-8px" }}>
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
        <Box sx={{ marginY: "5px" , marginX: "-8px" }}>
        <OrphanListTable orphanData={data || []} appliedFilters={appliedFilters} />
          {/* <OrphanListTable orphanData={[{}]} /> */}
          {/* <OrphanSponsorshipCard cardData={[]} /> */}
        </Box>
      )}
    </Box>
  );
};

export default OrphanListPage;
