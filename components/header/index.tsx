import { Box, Typography } from "@mui/material";
import Image from "next/image";

const Header:React.FC = () => {
    return (
        <Box sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: 1, display: "flex" }}>
                <Box>
                    Logo
                </Box>
                <Box>
                    Hamburger
                </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
                <Box sx={{ display: "flex" }}>
                    <Box>
                        <Image alt={"Search Icon"} width={24} height={24} src={"/search_icon.svg"}/>
                    </Box>
                    <Box>
                        <Image alt={"Message Icon"} width={24} height={24} src={"/message.svg"}/>
                    </Box>
                    <Box>
                        <Image alt={"Bell Icon"} width={24} height={24} src={"/bell.svg"}/>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
                <Box>
                    Dark Theme
                </Box>
                <Box>
                    Light Theme
                </Box>
            </Box>
        </Box>
    );  
}

export default Header;