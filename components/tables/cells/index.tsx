import { Box, Typography } from "@mui/material";
import { ImageFrame40, ImageFrameCircular80 } from "../../common/image-frames";
import { TextOnlyPill } from "../../pills";

export const ImageNameEmailCell: React.FC<{
  image: string;
  name: string;
  gender: string;
}> = ({ image, name, gender }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ marginRight: "12px" }}>
        <ImageFrame40 image={image} />
      </Box>
      <Box sx={{ mr: "20px" }}>
        <Box>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              color: "black",
              mb: { xs: "5px", sm: "0px" },
              textTransform: "capitalize",
            }}
          >
            {name}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: "12px", color: "#908E8F", fontWeight: 500 }}
          >
            {gender}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export const ImageNameGenderIdCell: React.FC<{
  image: string;
  name: string;
  gender: string;
  id: string;
}> = ({ image, name, gender, id }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ marginRight: "12px", mb: "5px" }}>
        <ImageFrameCircular80 image={image} />
      </Box>
      <Box sx={{ mr: "20px" }}>
        <Box>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              color: "black",
              mb: { xs: "5px", sm: "0px" },
              textTransform: "capitalize",
            }}
          >
            {name}
          </Typography>
        </Box>
        <Box sx={{ mb: "5px" }}>
          <TextOnlyPill text={gender} bgColor="#FDF2FA" color="#C11574" />
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: "15px", color: "black", fontWeight: 500 }}
          >
            {`${id}`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export const ImageAndNameCell: React.FC<{ image: string; role: string }> = ({
  image,
  role,
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ marginRight: "12px" }}>
        <ImageFrame40 image={image} />
      </Box>
      <Box>
        <Typography sx={{ fontWeight: "600", color: "#101828" }}>
          {role}
        </Typography>
      </Box>
    </Box>
  );
};
