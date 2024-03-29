import { Box } from "@mui/material";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ImageFrameRectangular117By53 } from "../common/image-frames";
import { navConfig } from "./config";
import { NavItem } from "./item";
import UserAccount from "./user-account";

const Nav: React.FC<{
  large: boolean;
  small: boolean;
  closeLargeNav: () => void;
  closeSmallNav: () => void;
}> = ({ large, small, closeLargeNav, closeSmallNav }) => {
  const path = usePathname();
  const router = useRouter();

  return (
    <Box
      sx={{
        ...(large
          ? {
              ...(small
                ? {//Styles applied when both the large and small navs are open
                    position: { xs: "fixed", md: "static" },
                    zIndex: { xs: 10000, md: 0 },
                    backgroundColor: {
                      xs: "rgba(0, 0, 0, 0.3)",
                      md: "transparent",
                    },
                    width: { xs: "100%", md: "auto" },
                    minHeight: { xs: "100vh", md: 0 },
                    display: { xs: "block", md: "block" },
                  }
                : {/**No style applied when large nav is open but small nav is closed */}),
            }
          : {
              ...(small
                ? {//Styles applied when small nav is opened but large nav is closed
                    position: "fixed",
                    zIndex: 10000,
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    width: "100%",
                    minHeight: "100vh",
                    display: { xs: "block", md: "none" },
                  }
                : {/**No style applied when both navs are closed */}),
            }),
      }}
    >
      <Box
        sx={{
          ...(large
            ? {
                ...(small
                  ? {//Styles applied when both the large and small navs are open
                      width: { xs: "200px", sm: "250px", md: "280px" },
                      display: "block",
                      paddingLeft: "20px",
                      position: { xs: "static", md: "fixed" },
                      backgroundColor: { xs: "white", md: "transparent" },
                      minHeight: { xs: "100vh", md: 0 },
                    }
                  : {/**Styles applied when large nav is open but small nav is closed */
                      width: "280px",
                      display: { xs: "none", md: "block" },
                      paddingLeft: "20px",
                      position: "fixed",
                    }),
              }
            : {
                ...(small
                  ? {//Styles applied when small nav is open but large nav is closed
                      width: { xs: "200px", sm: "250px" },
                      display: { xs: "block", md: "none" },
                      paddingLeft: "20px",
                      backgroundColor: "white",
                      minHeight: "100vh",
                    }
                  : {/**Style applied when both navs are closed */
                      display: "none",
                    }),
              }),
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "90px",
            ...(large && { paddingRight: "5px" }),
            ...(small && { paddingRight: "15px" }),
          }}
        >
          <ImageFrameRectangular117By53 image="/nurul_yateem_logo.png" />
          <Box
            {...(large && { onClick: closeLargeNav })}
            {...(small && { onClick: closeSmallNav })}
            sx={{
              flexGrow: 1,
              justifyContent: "flex-end",
              cursor: "pointer",
              display: "flex",
            }}
          >
            <Image src={"/menu.svg"} width={24} height={24} alt={"Menu Icon"} />
          </Box>
        </Box>
        <Box sx={{ height: "100vh", overflow: "auto" }}>
          <Box
            sx={{
              paddingLeft: "5px",
              paddingTop: "50px",
              position: "relative",
              height: "80%",
            }}
          >
            {navConfig.map((item: any) => (
              <Box key={item.title} sx={{ mb: "40px", mr: "20px" }}>
                <Box onClick={() => router.replace(item.path)}>
                  <NavItem
                    key={item.title}
                    icon={item.icon}
                    title={item.title}
                    isActive={path === item.path ? true : false}
                  />
                </Box>
              </Box>
            ))}
            <UserAccount image="" name="Nazih Ajanah" role="Guardian" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Nav