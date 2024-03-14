// Ensure that your layout component is wrapped with SessionProvider
"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { useScrollToTop } from "../hooks/use-scroll-to-top";
import { redirect } from "next/navigation";

const MainDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  useScrollToTop();

  const { data: session, status } = useSession();
  const isCheckingAuthStatus = !session && status === "loading";

  if (isCheckingAuthStatus) {
    return null;
  }

  if (!session) {
    redirect("/login");
    return null;
  }

  return (
    <main>
      {children}
    </main>
  );
};

const WrappedMainDashboardLayout = (props: any) => (
  <SessionProvider>
    <MainDashboardLayout {...props} />
  </SessionProvider>
);

export default WrappedMainDashboardLayout;
