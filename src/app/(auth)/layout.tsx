"use client";
import { SessionProvider } from "next-auth/react";


const MainDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  

  return <main>{children}</main>;
};

const WrappedMainDashboardLayout = (props: any) => (
  <SessionProvider>
    <MainDashboardLayout {...props} />
  </SessionProvider>
);

export default WrappedMainDashboardLayout;

