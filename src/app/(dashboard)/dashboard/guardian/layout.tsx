"use client";

import { Box } from "@mui/material";
import { ReactNode, useState } from "react";
import Header from "../../../../../components/header";
import MainContent from "../../../../../components/main-content";
import DashboardFooter from "../../../../../components/footer/dashboard";
import Nav from "../../../../../components/nav";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [openLargeNav, setOpenLargeNav] = useState(true);
  const [openSmallNav, setOpenSmallNav] = useState(false);

  return (
    <Box>
      <Nav
        large={openLargeNav}
        small={openSmallNav}
        closeLargeNav={() => setOpenLargeNav(false)}
        closeSmallNav={() => setOpenSmallNav(false)}
      />
      <Box>
        <Header
          small={openSmallNav}
          large={openLargeNav}
          openSmallClick={() => setOpenSmallNav(!openSmallNav)}
          openLargeClick={() => setOpenLargeNav(!openLargeNav)}
        />
        <Box>
          <MainContent
            isSmallNavOpen={openSmallNav}
            isLargeNavOpen={openLargeNav}
          >
            {children}
          </MainContent>
          <DashboardFooter
            isLargeNavOpen={openLargeNav}
            text="&copy; Copyright 2024 Nurul Yateem Foundation"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
