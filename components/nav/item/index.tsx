import { Box } from "@mui/material";
import { IconHolder } from "../../icon";

export const NavItem: React.FC<{
  icon: string;
  title: string;
  isActive: boolean;
}> = ({ icon, title, isActive }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        "&:hover": { color: "#3863FA" },
        ...(isActive == true && {
          backgroundColor: "#3863FA",
          color: "#FFFFFF",
          "&:hover": { color: "#FFFFFF" },
        }),
        pt: "15px",
        pb: "10px",
        px: "10px",
        borderRadius: "10px",
      }}
    >
      <Box sx={{ mr: { xs: "20px", md: "30px" } }}>
        <IconHolder icon={icon} />
      </Box>
      <Box sx={{ mt: "-6px" }}>{title}</Box>
    </Box>
  );
};
