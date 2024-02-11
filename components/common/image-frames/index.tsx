import { Box } from "@mui/material";
import React from "react";

export const LogoImageFrame: React.FC<{image:string}> = ({image}) => {

    return (
        <Box 
            sx={{ 
                backgroundImage: `url(${image})`,
                backgroundSize: "100% 100%",
                width: "154px",
                height: "70px"
             }}
        />
    );
}

export const HeroImageFrame: React.FC<{image:string}> = ({image}) => {

    return (
        <Box 
            sx={{ 
                backgroundImage: `url(${image})`,
                backgroundSize: "100% 100%",
                width: "421px",
                height: "492.49px"
             }}
        />
    );
}

export const HeroImageFramePlaceHolder: React.FC = () => {

    return (
        <Box 
            sx={{ 
                backgroundColor: "#519E33",
                width: "300px",
                height: "300px"
             }}
        />
    );
}

export const ProfileImageFrame: React.FC<{initials: string}> = ({initials}) => {

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
                fontSize: "21px"
             }}
        >
        {initials}
        </Box>
    );
}