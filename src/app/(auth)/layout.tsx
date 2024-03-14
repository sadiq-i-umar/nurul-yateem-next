// Ensure that your layout component is wrapped with SessionProvider
"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useScrollToTop } from "../(dashboard)/hooks/use-scroll-to-top";

const MainDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  useScrollToTop();

  const { data: session, status } = useSession();
  const isCheckingAuthStatus = !session && status === "loading";

  if (isCheckingAuthStatus) {
    return null;
  }

  // if (session) {
    // redirect("/dashboard/home");
  //   return null;
  // }

  return <main>{children}</main>;
};

const WrappedMainDashboardLayout = (props: any) => (
  <SessionProvider>
    <MainDashboardLayout {...props} />
  </SessionProvider>
);

export default WrappedMainDashboardLayout;
