import { Box, CircularProgress } from "@mui/material";

export const Loader: React.FC = () => {

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", position: "fixed", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: "2" }}>
            <CircularProgress color="success" />
        </Box>
    );
}