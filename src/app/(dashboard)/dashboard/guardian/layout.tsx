"use client";

import { Box, Typography } from "@mui/material";
import { ImageFrameRectangular117By53 } from "../../../../../components/common/image-frames";
import Image from "next/image";
import { ReactNode, useState } from "react";
import Nav, { NavIcon } from "../../../../../components/nav";

const Layout: React.FC<{children: ReactNode}> = ({children}) => {
  const [openNav, setOpenNav] = useState(true);
  const [openSmallNav, setOpenSmallNav] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      {openNav && (
        <Box
          sx={{
            width: "280px",
            display: { xs: "none", md: "block" },
            paddingLeft: "20px",
            position: "fixed",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "90px",
              paddingRight: "5px",
            }}
          >
            <ImageFrameRectangular117By53 image="/nurul_yateem_logo.png" />
            <Box
              onClick={() => setOpenNav(!openNav)}
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex-end",
                cursor: "pointer"
              }}
            >
              <Image
                src={"/menu.svg"}
                width={24}
                height={24}
                alt={"Menu Icon"}
              />
            </Box>
          </Box>
          <Box sx={{ height: "100vh", overflow: "auto" }}>
            <Nav />
          </Box>
        </Box>
      )}
      {openSmallNav && (
        <Box
          sx={{
            position: "fixed",
            zIndex: 10000,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: {xs: "200px", sm: "250px"},
              display: { xs: "block", md: "none" },
              paddingLeft: "20px",
              backgroundColor: "white",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: "90px",
                paddingRight: "15px",
              }}
            >
              <ImageFrameRectangular117By53 image="/nurul_yateem_logo.png" />
              <Box
                onClick={() => setOpenSmallNav(!openSmallNav)}
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "flex-end",
                  cursor: "pointer",
                }}
              >
                <Image
                  src={"/menu.svg"}
                  width={24}
                  height={24}
                  alt={"Menu Icon"}
                />
              </Box>
            </Box>
            <Box sx={{ height: "100vh" }}>
                <Nav />
            </Box>
          </Box>
        </Box>
      )}
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ height: "90px", display: "flex", alignItems: "center", position: "sticky", top: 0, backgroundColor: "white", ...(openNav && {marginLeft: {xs: "0px", md: "300px"}}) }}>
          <Box
            onClick={() => setOpenNav(!openNav)}
            sx={{
              flexGrow: 1,
              cursor: "pointer",
              ...(openNav == false
                ? { display: { xs: "none", md: "block" } }
                : { display: "none" }),
                paddingLeft: "25px"
            }}
          >
            <Image src={"/menu.svg"} width={24} height={24} alt={"Menu Icon"} />
          </Box>
          <Box
            onClick={() => setOpenSmallNav(!openSmallNav)}
            sx={{
              flexGrow: 1,
              cursor: "pointer",
              ...(openSmallNav == false
                ? { display: { xs: "block", md: "none" } }
                : { display: "none" }),
                paddingLeft: "20px"
            }}
          >
            <Image src={"/menu.svg"} width={24} height={24} alt={"Menu Icon"} />
          </Box>
          <Box
            sx={{ flexGrow: 1, justifyContent: "flex-end", display: "flex" }}
          >
            <Box sx={{ display: "flex" }}>
            <Box sx={{ marginRight: "40px" }}>
              <Image
                alt={"Search Icon"}
                width={24}
                height={24}
                src={"/search_icon.svg"}
              />
            </Box>
            <Box sx={{ marginRight: "40px" }}>
              <Image
                alt={"Message Icon"}
                width={24}
                height={24}
                src={"/message.svg"}
              />
            </Box>
            <Box sx={{ marginRight: "40px" }}>
              <Image
                alt={"Bell Icon"}
                width={24}
                height={24}
                src={"/bell.svg"}
              />
            </Box>
            </Box>
          </Box>
          <Box sx={{ display: {xs: "none", sm: "flex"}, marginRight: "30px" }}>
            <Box sx={{ padding: "5px 20px 5px 20px", color: "#237A00", backgroundColor: "#E9F3E6", borderRadius: "10px", marginRight: "-15px", paddingRight: "40px" }}>
              <NavIcon icon={"/moon.svg"} />
            </Box>
            <Box sx={{ padding: "5px 20px 5px 20px", color: "#FFFFFF", backgroundColor: "#237A00", borderRadius: "10px" }}>
              <NavIcon icon={"/sun.svg"} />
            </Box>
          </Box>
        </Box>
        <Box>
        <Box>
        <Box sx={{ height: "100vh", backgroundColor: "#F5F5F5", ...(openNav && {marginLeft: {xs: "0px", md: "300px"}}), padding: "5px 30px 0px 25px" }}>
          {children}
        </Box>
        <Box sx={{ position: "sticky", bottom: 0, ...(openNav && {marginLeft: {xs: "0px", md: "300px"}}), backgroundColor: "white", display: "flex", justifyContent: "center", paddingY: "20px" }}>
          <Typography sx={{ textAlign: "center" }}>&copy; Copyright 2024 Nurul Yateem Foundation</Typography>
        </Box>
        </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
