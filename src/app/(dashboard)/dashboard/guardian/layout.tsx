'use client'

import { Box } from "@mui/material";
import { ImageFrameRectangular117By53 } from "../../../../../components/common/image-frames";
import Image from "next/image";
import { useState } from "react";

const Layout:React.FC = () => {

    const [ openNav, setOpenNav ] = useState(true);
    const [ openSmallNav, setOpenSmallNav ] = useState(false);

    return (
        <>
            {/* <Header />
            <Nav /> */}
            <Box sx={{ display: "flex" }}>
                {openNav && <Box sx={{ width: "280px", display: {xs: "none", md: "block"}, paddingLeft: "20px" }}>
                    <Box sx={{ display: "flex", alignItems: "center", height: "90px", paddingRight: "15px"}}>
                        <ImageFrameRectangular117By53 image="/nurul_yateem_logo.png"/>
                        <Box onClick={() => setOpenNav(!openNav)} sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end", cursor: "pointer" }}><Image src={"/menu.svg"} width={24} height={24} alt={"Menu Icon"}/></Box>
                    </Box>
                    <Box sx={{ height: "100vh" }}>
                        Nav Items
                    </Box>
                </Box>}
                {openSmallNav && <Box sx={{ position: "fixed", zIndex: 10000, backgroundColor: 'rgba(0, 0, 0, 0.3)', width: "100%" }}><Box sx={{ width: "200px", display: {xs: "block", md: "none"}, paddingLeft: "20px", backgroundColor: "white" }}>
                    <Box sx={{ display: "flex", alignItems: "center", height: "90px", paddingRight: "15px"}}>
                        <ImageFrameRectangular117By53 image="/nurul_yateem_logo.png"/>
                        <Box onClick={() => setOpenSmallNav(!openSmallNav)} sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end", cursor: "pointer" }}><Image src={"/menu.svg"} width={24} height={24} alt={"Menu Icon"}/></Box>
                    </Box>
                    <Box sx={{ height: "100vh" }}>
                        Nav Items
                    </Box>
                </Box></Box>}
                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ height: "90px", display: "flex", alignItems: "center" }}>
                        <Box onClick={() => setOpenNav(!openNav)} sx={{ flexGrow: 1, cursor: "pointer", ...(openNav == false ? {display: {xs: "none", md: "block"}} : {display: "none"}) }}>
                            <Image src={"/menu.svg"} width={24} height={24} alt={"Menu Icon"}/>
                        </Box>
                        <Box onClick={() => setOpenSmallNav(!openSmallNav)} sx={{ flexGrow: 1, cursor: "pointer", ...(openSmallNav == false ? {display: {xs: "block", md: "none"}} : {display: "none"}) }}>
                            <Image src={"/menu.svg"} width={24} height={24} alt={"Menu Icon"}/>
                        </Box>
                        <Box sx={{ flexGrow: 1, justifyContent: "flex-end", display: "flex" }}>
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
                    <Box sx={{ height: "100vh", backgroundColor: "#F5F5F5" }}>
                        Main Content
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Layout;