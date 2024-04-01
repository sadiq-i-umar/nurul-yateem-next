"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";

const MainDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin === "true") {
      router.back();
    }
  });

  return <main>{children}</main>;
};

const WrappedMainDashboardLayout = (props: any) => (
  <SessionProvider>
    <MainDashboardLayout {...props} />
  </SessionProvider>
);

export default WrappedMainDashboardLayout;
