import { Box } from "@mui/material";
import OrphanListTable from "../../../../../../components/tables/orphan-list";

export default function OrphanList() {
    return (
        <Box>
            <Box>
                <h1>Orphan List</h1>
            </Box>
            <Box sx={{ marginX: "-30px" }}>
                <OrphanListTable />
            </Box>
        </Box>
    );
}