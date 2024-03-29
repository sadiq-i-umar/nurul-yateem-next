import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";

export const LogoImageFrame: React.FC<{ image: string }> = ({ image }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${image})`,
        backgroundSize: "100% 100%",
        width: "154px",
        height: "70px",
      }}
    />
  );
};

export const ImageFrameRectangular117By53: React.FC<{image:string}> = ({image}) => {

    return (
        <Box
            sx={{ 
            backgroundImage: `url(${image})`,
            backgroundSize: "100% 100%",
            width: "117px",
            height: "53px"
            }}
        />
    )
}

export const ImageFrame40: React.FC<{ image: string }> = ({ image }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${image})`,
        backgroundSize: '100% 100%',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        backgroundColor: '#E7E7E7',
      }}
    />
  );
};

export const HeroImageFrame: React.FC<{ image: string }> = ({ image }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${image})`,
        backgroundSize: "100% 100%",
        width: "421px",
        height: "492.49px",
      }}
    />
  );
};

export const HeroImageFramePlaceHolder: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#519E33",
        width: "300px",
        height: "300px",
      }}
    />
  );
};

export const ProfileImageFrame: React.FC<{ initials: string }> = ({
  initials,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: "#519E33",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "21px",
        textTransform: "uppercase",
      }}
    >
      {initials}
    </Box>
  );
};

export const PhotoUploadFrame: React.FC<{ image: string }> = ({ image }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${image})`,
        backgroundSize: "100% 100%",
        marginBottom: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5F5F5",
        borderRadius: "50%",
        width: "110px",
        height: "110px",
      }}
    >
      {image == "" && (
        <Image
          src={"/camera.svg"}
          width={30}
          height={30}
          alt={"Upload Camera Icon"}
        />
      )}
    </Box>
  );
};
