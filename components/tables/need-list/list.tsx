import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

const List = () => {
  return (
    <>
      <Box>
        <Box
          sx={{
            px: { xs: 2, sm: 2, md: 2 },
            py: { xs: 2, sm: 2, md: 2 },
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "start",
            gap: 2,
            border: "1px solid #E5E5E5",
          }}
        >
          <Box>
            <Avatar
              alt="name"
              src="https://source.unsplash.com/random/"
              sx={{ width: 80, height: 80 }}
            />
          </Box>
          <Box
            sx={{
              border: "1px solid red",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent:"space-between"
              }}
            >
              <Typography>Abraham Christopher</Typography>
              <Typography>22 january 2022</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default List;
