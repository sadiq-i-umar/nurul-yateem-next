"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SessionProvider, useSession } from "next-auth/react";
import { baseUrl } from "../../../utils/constant";
import toast from "react-hot-toast";
import axios from "axios";
import LoaderBackdrop from "../../../components/common/loader";

const MainDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const accountType = session?.user?.account;

  useEffect(() => {
    setIsLoading(true);
    const isLogin = localStorage.getItem("isLogin");

    const fetchData = async () => {
      if (
        (isLogin === "true" && pathname === "/login") ||
        pathname === "/register"
      ) {
        if (accountType) {
          // Only proceed if accountType is defined
          // Redirect based on account type
          if (accountType === "GUARDIAN") {
            try {
              // Fetch user profile data
              const profileRes = await axios.get(`${baseUrl}/user-profile`, {
                headers: {
                  Authorization: `Bearer ${session?.token}`,
                },
              });

              const { orphans } = profileRes?.data;

              // Check if the user has added any orphans
              if (orphans?.length === 0) {
                handleLoginSuccess();
                toast.success(
                  "Please complete your profile first. You have no orphans."
                );
                router.push("/dashboard/add-an-orphan");
                router.refresh();
              } else {
                handleLoginSuccess();
                router.push("/dashboard/guardian/home");
                router.refresh();
              }
            } catch (error: any) {
              if (
                error.response &&
                error.response.data &&
                error.response.data.error ===
                  "Guardian profile not found for this user."
              ) {
                toast.success("Please complete your profile first.");
                router.push("/dashboard/complete-account");
                router.refresh();
              } else {
                console.error("Error during fetching user profile:", error);
                toast.error("An unexpected error occurred. Please try again.");
              }
            }
          } else if (accountType === "ADMIN") {
            router.push("/dashboard/admin/home");
          } else if (accountType === "SPONSOR") {
            router.push("/dashboard/sponsor/home");
          } else {
            router.push("/");
          }
        } else {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pathname, accountType, router, session]);

  useEffect(() => {
    return () => {
      clearTimeout(loginSuccessTimeout);
    };
  });

  let loginSuccessTimeout: string | number | NodeJS.Timeout | undefined;

  const handleLoginSuccess = () => {
    clearTimeout(loginSuccessTimeout);
    loginSuccessTimeout = setTimeout(() => {
      localStorage.setItem("isLogin", "true");
    }, 5000);
  };

  return <main>{isLoading ? <LoaderBackdrop /> : children}</main>;
};

const WrappedMainDashboardLayout = (props: any) => (
  <SessionProvider>
    <MainDashboardLayout {...props} />
  </SessionProvider>
);

export default WrappedMainDashboardLayout;
