"use client";
import { SessionProvider } from "next-auth/react";
import { useScrollToTop } from "../hooks/use-scroll-to-top";

const MainDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  useScrollToTop();

  return <main>{children}</main>;
};

const WrappedMainDashboardLayout = (props: any) => (
  <SessionProvider>
    <MainDashboardLayout {...props} />
  </SessionProvider>
);

export default WrappedMainDashboardLayout;
