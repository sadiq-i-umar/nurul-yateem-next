import { Box, Button, CircularProgress, Dialog, Typography } from "@mui/material";
import Image from "next/image";
import { LogoImageFrame } from "../../../../../../../components/common/image-frames";

const AddOrphanSuccess: React.FC = () => {

    return (
        <>
        <Box sx={{ display: "flex", paddingTop: "30px", paddingBottom: "20px", paddingX: {xs: "10px", sm: "40px", md: "80px"}, alignItems: "center", position: "sticky", top: 0, backgroundColor: "white", zIndex: 1, flexDirection: {xs: "column", sm: "row"} }}>
                <Box>
                    <LogoImageFrame image={"/nurul_yateem_logo.png"}/>
                </Box>
            </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "70px" }}>
            <Box>
                <Image src={"/reg_message.svg"} width={103} height={123} alt={'Registration Success'} />
            </Box>
            <Box sx={{ marginBottom: "15px", textAlign: "center" }}>
                <Typography sx={{ fontSize: "30px", fontWeight: "bold", color: "#007A27" }}>You orphan account creation was successful.</Typography>
            </Box>
            <Box sx={{ marginBottom: "25px" }}>
                <Box sx={{ marginBottom: {xs: "5px", sm: "0px"}, marginX: "25px" }}>
                    <Typography sx={{ fontSize: "16px", textAlign: "center" }}>
                        Kindly check your email for account approval, so you can log into your portal.
                    </Typography>
                </Box>
            </Box>
            <Box>
                <Button variant="contained" sx={{ boxShadow: "none", width: "100%", borderRadius: "6px", textTransform: "none", paddingY: "10px", paddingX: "70px" }}>
                    Go to Home
                </Button>
            </Box>
        </Box>
        </>
    );
}

export default AddOrphanSuccess;