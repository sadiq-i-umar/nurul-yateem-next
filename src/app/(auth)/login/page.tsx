"use client";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  HeroImageFramePlaceHolder,
  LogoImageFrame,
} from "../../../../components/common/image-frames";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";

const Login: React.FC = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [emailAddressError, setEmailAddressError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Define showPassword state
  const [passwordError2, setPasswordError2] = useState(false); // Define passwordError2 state

  function clearEmailAddressError() {
    setEmailAddressError(false);
  }

  function clearPasswordError() {
    setPasswordError(false);
    setPasswordError2(false); // Clear passwordError2
  }

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }

  const handleLogin = () => {
    if (emailAddress === "") {
      setEmailAddressError(true);
    }

    if (password === "") {
      setPasswordError(true);
    }

    if (password.length < 8) {
      setPasswordError2(true);
    }

    if (emailAddress && password && password.length >= 8) {
      console.log("Login");
    }
  }

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} lg={6} sx={{ backgroundColor: "#F5F5F5" }}>
          <Box sx={{ paddingX: { xs: "20px", sm: "100px" }, paddingY: "51px" }}>
            <Box sx={{ marginBottom: "49px" }}>
              <LogoImageFrame image={"/nurul_yateem_logo.png"} />
            </Box>
            <Box sx={{ display: { xs: "none", lg: "block" } }}>
              <Box
                sx={{
                  marginBottom: "27px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <HeroImageFramePlaceHolder />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                <Typography>
                  Be the change you want to see in the world – join us in
                  transforming lives and making a lasting impact.
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "16px",
                }}
              >
                Donate Now!
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            my: "5rem",
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
            <Box sx={{ marginBottom: "21.5px" }}>
              <Box sx={{ marginBottom: "11.5px" }}>
                <Typography>Password</Typography>
              </Box>
              <Grid container>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="Password"
                      onChange={(event) => {
                        setPassword(event.target.value);
                        clearPasswordError();
                      }}
                      error={passwordError || passwordError2}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Box
                sx={{
                  ...(passwordError || passwordError2
                    ? { display: "block" }
                    : { display: "none" }),
                  marginTop: "5px",
                  marginLeft: "20px",
                }}
              >
                <Typography sx={{ color: "#DB2F2F", fontSize: "12px" }}>
                  {(passwordError && "Must not be empty") ||
                    (passwordError2 &&
                      "Passwords must be at least eight characters long")}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ marginBottom: "19px" }}>
              <Button
                  onClick={handleLogin}
                variant="contained"
                sx={{
                  width: "100%",
                  borderRadius: "6px",
                  textTransform: "none",
                  paddingY: "10px",
                }}
              >
                Login
              </Button>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography>
                You don&apos;t have an account?{" "}
                <Link href="/register" style={{ color: "#268600" }}>
                  Create an account
                </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
