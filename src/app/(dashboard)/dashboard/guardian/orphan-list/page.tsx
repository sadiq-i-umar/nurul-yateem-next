import { Box } from "@mui/material";
import OrphanListTable from "../../../../../../components/tables/orphan-list";
import SubHeader from "../../../../../../components/sub-header";

export default function OrphanList() {
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
                <OrphanListTable />
            </Box>
        </Box>
    );
}