"use client";

import { Box } from "@mui/material";
import SubHeader from "../../sub-header";
import OrphanListTable from "../../tables/orphan-list";
import { useQuery } from "@tanstack/react-query";
import { getOrphans } from "../../../service/orphan-list";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoaderBackdrop from "../../common/loader";

const OrphanListPage: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.token;

  const { data, isLoading } = useQuery({
    queryKey: ["orphans"],
    queryFn: () => getOrphans(token),
    enabled: !!token,
  });
  const handleButtonTwoClick = () => {
    router.push("/dashboard/guardian/orphan-list/add-an-orphan");
  };

  return (
    <Box>
      {isLoading && <LoaderBackdrop />}
      <Box>
        <h1>Orphan List</h1>
      </Box>
      <Box>
        <SubHeader
          title={""}
          subtitle={""}
          itemCount={undefined}
          buttonTwoText={"Add Orphans"}
          buttonTwoIcon="/plus.svg"
          itemCountLabel={""}
          buttonTwoClick={handleButtonTwoClick}
          pageHasTable={true}
        />
      </Box>
      <Box sx={{ marginX: "-30px" }}>
        <OrphanListTable orphanData={data?.orphans} />
      </Box>
    </Box>
  );
};

export default OrphanListPage;
