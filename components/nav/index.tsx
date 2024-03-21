import { Box, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { ImageFrame40 } from "../common/image-frames";
import { MoreVert } from "@mui/icons-material";

const Nav: React.FC = () => {

  const path = usePathname();
  const router = useRouter();

  return (
    <Box sx={{ paddingLeft: "5px", paddingTop: "50px", position: "relative", height: "80%" }}>
      {navConfig.map((item) => (
        <Box key={item.title} sx={{ mb: "40px", mr: "20px" }}>
          <Box onClick={() => router.replace(item.path)}><NavItem key={item.title} icon={item.icon} title={item.title} isActive={path === item.path ? (true) : (false)} /></Box>
        </Box>
      ))}
      <Box sx={{ display: 'flex', alignItems: 'center', position: "absolute", bottom: {xs: 20, md: 0}, width: {xs: "70%", sm: "90%"}, flexWrap: {xs: "wrap", sm: "no-wrap"} }}>
      <Box sx={{ marginRight: '12px' }}>
        <ImageFrame40 image={"image"} />
      </Box>
      <Box sx={{ flexGrow: 1, mr: '20px' }}>
        <Box>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 600,
              color: 'black',
              mb: { xs: '5px', sm: '0px' },
              wordBreak: "break-all"
            }}
          >
            {"Nazih Ajanah"}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: '12px', color: '#908E8F', fontWeight: 500, wordBreak: "break-all" }}
          >
            {"Guardian"}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ position: "absolute", right: {xs: -40, sm: 0} }}>
        <MoreVert />
      </Box>
    </Box>
    </Box>
  );
};

const NavItem: React.FC<{ icon: string; title: string, isActive: boolean }> = ({
  icon,
  title,
  isActive
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer", '&:hover': {color: "#237A00"}, ...(isActive == true && {backgroundColor: "#237A00", color: "#FFFFFF", "&:hover": {color: "#FFFFFF"}}), pt: "15px", pb: "10px", px: "10px", borderRadius: "10px" }}>
      <Box sx={{ mr: {xs: "20px", md: "30px"} }}>
        <NavIcon icon={icon}/>
      </Box>
      <Box sx={{ mt: "-6px" }}>{title}</Box>
    </Box>
  );
};

export const NavIcon: React.FC<{ icon: string }> = ({icon}) => {
  return (
    <Box
      component="span"
      className="svg-color"
      sx={{
        width: 24,
        height: 24,
        display: "inline-block",
        bgcolor: "currentcolor",
        mask: `url(${icon}) no-repeat center / contain`,
        WebkitMask: `url(${icon}) no-repeat center / contain`,
      }}
    />
  );
};

const navConfig = [
  {
    title: "Dashboard",
    icon: "/category.svg",
    path: "/dashboard/guardian"
  },
  {
    title: "Orphan List",
    icon: "/users.svg",
    path: "/dashboard/guardian/orphan-list"
  },
  {
    title: "Activity",
    icon: "/folder_open.svg",
    path: "/dashboard/guardian/activity"
  },
  {
    title: "Settings",
    icon: "/gear.svg",
    path: "/dashboard/guardian/settings"
  }
];

export default Nav;
