import { Box } from "@mui/material";
import { usePathname } from "next/navigation";

const Nav: React.FC = () => {

  const path = usePathname();

  return (
    <Box sx={{ paddingLeft: "5px", paddingTop: "50px" }}>
      {navConfig.map((item) => (
        <Box sx={{ mb: "40px", mr: "20px" }}>
        <NavItem key={item.title} icon={item.icon} title={item.title} isActive={path === item.path ? (true) : (false)} />
        </Box>
      ))}
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

const NavIcon: React.FC<{ icon: string }> = ({icon}) => {
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
