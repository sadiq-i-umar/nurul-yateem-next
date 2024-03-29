import { Box, Typography } from "@mui/material";
import { ImageFrame40 } from "../../common/image-frames";
import { MoreVert } from "@mui/icons-material";

const UserAccount: React.FC<{ image: string; name: string; role: any }> = ({
  image,
  name,
  role,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        position: "absolute",
        bottom: { xs: 20, md: 0 },
        width: { xs: "70%", sm: "90%" },
        flexWrap: { xs: "wrap", sm: "no-wrap" },
      }}
    >
      <Box sx={{ marginRight: "12px" }}>
        <ImageFrame40 image={image} />
      </Box>
      <Box sx={{ flexGrow: 1, mr: "20px" }}>
        <Box>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              color: "black",
              mb: { xs: "5px", sm: "0px" },
              wordBreak: "break-all",
              textTransform: "capitalize",
            }}
          >
            {name}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              textTransform: "capitalize",
              fontSize: "12px",
              color: "#908E8F",
              fontWeight: 500,
              wordBreak: "break-all",
            }}
          >
            {role}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{ position: "absolute", right: { xs: -40, sm: 0 }, top: { md: 0 } }}
      >
        <MoreVert />
      </Box>
    </Box>
  );
};

export default UserAccount;
