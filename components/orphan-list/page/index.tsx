'use client'

import { Box } from "@mui/material";
import SubHeader from "../../sub-header";
import OrphanListTable from "../../tables/orphan-list";
import { useQuery } from "@tanstack/react-query";
import { getOrphans } from "../../../service/orphan-list";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const OrphanListPage: React.FC = () => {

    const {data: session} = useSession()

    const { data } = useQuery({
        queryKey: ["orphans"],
        queryFn: () => getOrphans(session?.token)
    })

    useEffect(() => {
        if (data) {
            console.log(JSON.stringify(data.orphans))
        }
    }, [data])

    return (
        <Box>
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
                    pageHasTable={true} />
            </Box>
            <Box sx={{ marginX: "-30px" }}>
                <OrphanListTable orphanData={data?.orphans}/>
            </Box>
        </Box>
    );
}

export default OrphanListPage;