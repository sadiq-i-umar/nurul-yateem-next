"use client";
import { SessionProvider, useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { baseUrl } from "../../../utils/constant";

const MainDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session) {
    const checkAuthorization = async () => {
      if (!session) {
        router.push("/login");
      } else {
        const accountType = session.user.account;

        if (accountType === "ADMIN" || accountType === "SPONSOR") {
          // Redirect admin and sponsor to dashboard home
          router.push("/dashboard/home");
        } else if (accountType === "GUARDIAN") {
          try {
            const profileRes = await axios.get(`${baseUrl}/user-profile`, {
              headers: {
                Authorization: `Bearer ${session.token}`,
              },
            });

            const { orphans } = profileRes.data;

            if (orphans.length === 0) {
              // If guardian profile is incomplete, redirect to add orphan page
              router.push("/dashboard/add-an-orphan");
            } else {
              // If guardian profile is complete, redirect to dashboard home
              router.push("/dashboard/home");
            }
          } catch (error) {
            console.error("Error during fetching user profile:", error);
            // If profile not found or other error, redirect to complete profile page
            router.push("/dashboard/complete-account");
          }
        }
      }
    };

    checkAuthorization();
  }

  if (!session ) {
    router.push("/login");
  }

  return <main>{children}</main>;
};

const WrappedMainDashboardLayout = (props: any) => (
  <SessionProvider>
    <MainDashboardLayout {...props} />
  </SessionProvider>
);

export default WrappedMainDashboardLayout;

