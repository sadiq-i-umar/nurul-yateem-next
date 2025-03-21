import { Box } from "@mui/material";
import Image from "next/image";

const Header: React.FC<{
  small: boolean;
  large: boolean;
  openSmallClick: () => void;
  openLargeClick: () => void;
}> = ({ small, large, openSmallClick, openLargeClick }) => {
  return (
    <Box
      sx={{
        height: "90px",
        display: "flex",
        alignItems: "center",
        position: "sticky",
        top: 0,
        backgroundColor: "white",
        ...(large && { marginLeft: { xs: "0px", md: "300px" } }),
        zIndex: 1000,
      }}
    >
      <Box
        onClick={openLargeClick}
        sx={{
          flexGrow: 1,
          cursor: "pointer",
          ...(large == false
            ? { display: { xs: "none", md: "block" } }
            : { display: "none" }),
          paddingLeft: "25px",
        }}
      >
        <Image src={"/menu.svg"} width={24} height={24} alt={"Menu Icon"} />
      </Box>
      <Box
        onClick={openSmallClick}
        sx={{
          flexGrow: 1,
          cursor: "pointer",
          ...(small == false
            ? { display: { xs: "block", md: "none" } }
            : { display: "none" }),
          paddingLeft: "20px",
        }}
      >
        <Image src={"/menu.svg"} width={24} height={24} alt={"Menu Icon"} />
      </Box>
      <Box sx={{ flexGrow: 1, justifyContent: "flex-end", display: "flex" }}>
        <Box sx={{ display: "flex" }}>
          {[].map((item) => (
            <Box key={item.src} sx={{ marginRight: "40px" }}>
              <Image alt={item.alt} width={24} height={24} src={item.src} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
