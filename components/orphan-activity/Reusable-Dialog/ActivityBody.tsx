import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ActivityData } from "../../../utils";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
  transition: "transform 0.3s ease",
  ":hover": {
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#f9f9f9",
    cursor: "pointer",
    transform: "scale(1.05)",
  },
}));

const ActivityBody = () => {
  const router = useRouter();
  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        container
        rowSpacing={5}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        justifyContent="center"
      >
        {ActivityData?.map((activity, index) => (
          <Grid key={index} item xs={12} sm={6}>
            <Item onClick={() => router.push(activity.link)}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "start",
                  gap: 2,
                  py: 2,
                  width: "100%", 
                }}
              >
                <Box>
                  <Image
                    src={activity?.image}
                    alt="Education"
                    width={100}
                    height={50}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "start",
                    gap: 2,
                    maxWidth: "calc(100% - 100px)",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h1"
                      sx={{
                        fontSize: "20px",
                        fontWeight: 900,
                        color: "black",
                        mb: { xs: "5px", sm: "0px" },
                      }}
                    >
                      {activity?.title}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: "16px",
                        fontWeight: 200,
                        mb: { xs: "5px", sm: "0px" },
                        textAlign: "start",
                      }}
                    >
                      {activity?.content}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ActivityBody;
