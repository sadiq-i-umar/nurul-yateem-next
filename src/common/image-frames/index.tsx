import { Box } from "@mui/material";

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

export const HeroImageFrame: React.FC = () => {

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