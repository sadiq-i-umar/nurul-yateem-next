import React from "react";
import LoaderBackdrop from "../common/loader";
import { Box, Typography } from "@mui/material";
import {
  EmailImageFramePlaceHolder,
  LogoImageFrame,
} from "../common/image-frames";

const passwordSent = () => {
  return (
    <>
      <Box sx={{ height: "100vh", overflow: "hidden" }}>
        <Box>
          <Box sx={{ marginBottom: "49px", mx: "5rem", mt: "2rem" }}>
            <LogoImageFrame image={"/nurul_yateem_logo.png"} />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            my: "10rem",
          }}
        >
          <Box>
            <EmailImageFramePlaceHolder />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Email on the way
            </Typography>
          </Box>
          <Box
            sx={{
              width: "25%",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                color: "#7A7A7A",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              We sent you a password reset instructions to{" "}
              <span
                style={{
                  color: "#3863FA",
                  fontWeight: "bold",
                }}
              >
                johndoe@test.com.
              </span>{" "}
              If it doesn&apos;t show up soon, you can check your spam inbox.            </Typography>
          </Box>
          <Box
            sx={{
              width: "25%",
              mt: "20px",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                color: "#7A7A7A",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              If you didn&apos;t receive any email, click on{" "}
              <span
                style={{
                  color: "#3863FA",
                  fontWeight: "bold",
                }}
              >
                Resend
              </span>{" "}
              link
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default passwordSent;
