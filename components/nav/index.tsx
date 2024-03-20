import { Box } from "@mui/material";

const Nav: React.FC = () => {
  return (
    <Box>
      {navConfig.map((item) => (
        <NavItem key={item.title} icon={item.icon} title={item.title} />
      ))}
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

const NavItem: React.FC<{ icon: string; title: string }> = ({
  icon,
  title,
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ mr: "10px" }}>
        <NavIcon icon={icon}/>
      </Box>
      <Box>{title}</Box>
    </Box>
  );
};

const navConfig = [
  {
    title: "Dashboard",
    icon: "/category.svg",
  },
];

export default Nav;
