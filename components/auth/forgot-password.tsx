"use client";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  HeroImageFramePlaceHolder,
  LogoImageFrame,
} from "../common/image-frames";
import { toast } from "react-hot-toast";
import { Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";

import { useRouter } from "next/navigation";
import axios from "axios";
import { baseUrl } from "../../utils/constant";
import LoaderBackdrop from "../common/loader";

const ForgotPassword: React.FC = () => {
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState("");
  const [loading, setLoading] = useState(false); // Define loading state
  const [emailAddressError, setEmailAddressError] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Define showPassword state

  function clearEmailAddressError() {
    setEmailAddressError(false);
  }

  return (
    <>
      {loading && <LoaderBackdrop />}
      <Box sx={{ height: "100vh", overflow: "hidden" }}>
        <Box>
          <Box sx={{ marginBottom: "49px", mx: "5rem", mt: "2rem" }}>
            <LogoImageFrame image={"/nurul_yateem_logo.png"} />
          </Box>
        </Box>
        <Box
          sx={{
            mx: "20vw",
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              minHeight: "100vh",
              padding: { xs: "30px", sm: "70px" },
            }}
          >
            <Box sx={{ marginBottom: "21.5px" }}>
              <Box sx={{ marginBottom: "11.5px" }}>
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  Reset Password
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#7A7A7A",
                    marginBottom: "10px",
                  }}
                >
                  Enter your account email address and we'll send you a link to
                  reset your password
                </Typography>
                <Typography>Email Address</Typography>
              </Box>
              <Box>
                <TextField
                  placeholder="Enter your email address"
                  sx={{
                    width: "100%",
                    borderRadius: "10px",
                  }}
                  onChange={(event) => {
                    setEmailAddress(event.target.value);
                    clearEmailAddressError();
                  }}
                  error={emailAddressError}
                  helperText={emailAddressError && "Must not be empty"}
                />
              </Box>
            </Box>

            <Box sx={{ marginBottom: "19px" }}>
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  borderRadius: "1rem",
                  textTransform: "none",
                  paddingY: "10px",
                  backgroundColor: "#335AE4",
                  "&:hover": {
                    backgroundColor: "#335AE4",
                  },
                }}
                onClick={() => {
                  router.push("/password-sent-success");
                }}
              >
                Send Password Reset Link
              </Button>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography>
                <Link href="/login" style={{ color: "#335AE4" }}>
                  Return to Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ForgotPassword;
