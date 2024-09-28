import {
  Box,
  Button,
  Divider,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { ImageFrameCircular60 } from "../../common/image-frames";
import { PillWithDot, TextOnlyPill } from "../../pills";

const OrphanSponsorshipCard: React.FC = () => {
  return (
    <Paper elevation={10} sx={{ backgroundColor: "white", padding: "20px" }}>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Box sx={{ mr: "20px" }}>
          <ImageFrameCircular60 image="" />
        </Box>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            <Box>
              <Typography sx={{ fontSize: "16px", wordWrap: "break-word" }}>
                Ajanah Nazih
              </Typography>
            </Box>
            <Box>
              <PillWithDot
                text="22 Jan 2022"
                bgColor="transparent"
                dotColor="#908E8F"
                textColor="#908E8F"
              />
            </Box>
          </Box>
          <Box sx={{ ml: "-12px" }}>
            <PillWithDot
              text="In School"
              bgColor="transparent"
              dotColor="#2846B2"
              textColor="#2846B2"
            />
          </Box>
          <Box sx={{ mb: "5px" }}>
            <Typography sx={{ fontSize: "12px", color: "#237A00" }}>
              Needs
            </Typography>
          </Box>
          <Box sx={{ display: "flex", mb: "20px" }}>
            <Box>
              <TextOnlyPill text="School" bgColor="#EFF8FF" color="#175CD3" />
            </Box>
            <Box>
              <TextOnlyPill text="Health" bgColor="#FDF2FA" color="#C11574" />
            </Box>
          </Box>
          <Box sx={{ mb: "20px" }}>
            <Box sx={{ mb: "2px" }}>
              <LinearProgress
                variant="determinate"
                value={70}
                sx={{
                  borderRadius: "100px",
                  backgroundColor: "#F0F2F5",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#A3B7FD",
                  },
                  height: "8px",
                  color: "#A3B7FD",
                }}
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", mb: "-10px" }}
                >
                  <Box>
                    <Typography sx={{ color: "#475367", fontSize: "10px" }}>
                      Amount gotten
                    </Typography>
                  </Box>
                  <Box>
                    <PillWithDot
                      text="N80,000"
                      bgColor="transparent"
                      dotColor="#98A2B3"
                      textColor="#475367"
                    />
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box>
                    <Typography sx={{ color: "#475367", fontSize: "10px" }}>
                      Amount to go
                    </Typography>
                  </Box>
                  <Box>
                    <PillWithDot
                      text="N150,000"
                      bgColor="transparent"
                      dotColor="#98A2B3"
                      textColor="#475367"
                    />
                  </Box>
                </Box>
              </Box>
              <Box>40%</Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", justifyContent: "flex-end", pt: "20px" }}>
        <Box sx={{ mr: "20px" }}>
          <Button
            sx={{
              color: "#344054",
              backgroundColor: "#F2F4F7",
              borderRadius: "100px",
              textTransform: "none",
              px: "20px",
            }}
          >
            View
          </Button>
        </Box>
        <Box>
          <Button
            sx={{
              color: "white",
              backgroundColor: "#3863FA",
              borderRadius: "100px",
              textTransform: "none",
              px: "20px",
            }}
          >
            Donate
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default OrphanSponsorshipCard;
