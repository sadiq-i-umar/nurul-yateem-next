import { Box } from "@mui/material";
import Image from "next/image";
import { IconHolder } from "../icon";

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
          {[
            { src: "/search_icon.svg", alt: "Search Icon" },
            { src: "/message.svg", alt: "Message Icon" },
            { src: "/bell.svg", alt: "Bell Icon" },
          ].map((item) => (
            <Box key={item.src} sx={{ marginRight: "40px" }}>
              <Image alt={item.alt} width={24} height={24} src={item.src} />
            </Box>
          ))}
        </Box>
      </Box>
      {/* <Box sx={{ display: { xs: "none", sm: "flex" }, marginRight: "30px" }}>
        <Box
          sx={{
            padding: "5px 20px 5px 20px",
            color: "#237A00",
            backgroundColor: "#E9F3E6",
            borderRadius: "10px",
            marginRight: "-15px",
            paddingRight: "40px",
          }}
        >
          <IconHolder icon={"/moon.svg"} />
        </Box>
        <Box
          sx={{
            padding: "5px 20px 5px 20px",
            color: "#FFFFFF",
            backgroundColor: "#237A00",
            borderRadius: "10px",
          }}
        >
          <IconHolder icon={"/sun.svg"} />
        </Box>
      </Box> */}
    </Box>
  );
};

export default Header;
