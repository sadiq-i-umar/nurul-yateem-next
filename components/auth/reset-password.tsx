"use client";
import { useEffect, useState } from "react";
import {
  Cancel,
  CheckCircle,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import LoaderBackdrop from "../common/loader";
import { LogoImageFrame } from "../common/image-frames";
import { useRouter } from "next/navigation";

const ForgotPassword: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLowerCase, setIsLowerCase] = useState(false);
  const [isUpperCase, setIsUpperCase] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isMax8, setIsMax8] = useState(false);
  const [isMatch, setIsMatch] = useState(false);

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }
  function handleClickShowConfirmPassword() {
    setShowConfirmPassword(!showConfirmPassword);
  }

  //here is where i want to validate the password and confirm password
  //lowercase characters
  // numbers
  //uppercase characters
  //max of 8 characters

  useEffect(() => {
    const handleCheck = () => {
      if (password.match(/[a-z]/)) {
        setIsLowerCase(true);
      } else {
        setIsLowerCase(false);
      }

      if (password.match(/[A-Z]/)) {
        setIsUpperCase(true);
      } else {
        setIsUpperCase(false);
      }

      if (password.match(/[0-9]/)) {
        setIsNumber(true);
      } else {
        setIsNumber(false);
      }

      if (password.length >= 5 && password.length <= 8) {
        setIsMax8(true);
      } else {
        setIsMax8(false);
      }
      const passwordsMatch = password === confirmPassword;
      setIsMatch(passwordsMatch);
    };
    handleCheck();
  }, [confirmPassword, password]);

  return (
    <>
      {loading && <LoaderBackdrop />}
      <Box sx={{ height: "100vh", overflow: "hidden" }}>
        <Box>
          <Box sx={{ marginBottom: "49px", mx: "5rem", mt: "2rem" }}>
            <LogoImageFrame image={"/nurul_yateem_logo.png"} />
          </Box>
        </Box>
        <Box sx={{ mx: "20vw" }}>
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
                  Almost done. Enter your new password and you are good to go.
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",

                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  New Password
                </Typography>
              </Box>
              <Box>
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
                    }}
                  />
                </FormControl>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                    gap: "10px",
                    flexDirection: "row",
                  }}
                >
                  {isLowerCase ? (
                    <CheckCircle sx={{ color: "green", marginTop: "10px" }} />
                  ) : (
                    <Cancel sx={{ color: "red", marginTop: "10px" }} />
                  )}

                  <Typography
                    sx={{
                      fontSize: "16px",
                      color: "#7A7A7A",
                      marginTop: "10px",
                    }}
                  >
                    Lowercase characters
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                    gap: "10px",
                    flexDirection: "row",
                  }}
                >
                  {isUpperCase ? (
                    <CheckCircle sx={{ color: "green", marginTop: "10px" }} />
                  ) : (
                    <Cancel sx={{ color: "red", marginTop: "10px" }} />
                  )}

                  <Typography
                    sx={{
                      fontSize: "16px",
                      color: "#7A7A7A",
                      marginTop: "10px",
                    }}
                  >
                    Uppercase characters
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                    gap: "10px",
                    flexDirection: "row",
                  }}
                >
                  {isNumber ? (
                    <CheckCircle sx={{ color: "green", marginTop: "10px" }} />
                  ) : (
                    <Cancel sx={{ color: "red", marginTop: "10px" }} />
                  )}
                  <Typography
                    sx={{
                      fontSize: "16px",
                      color: "#7A7A7A",
                      marginTop: "10px",
                    }}
                  >
                    Numbers
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                    gap: "10px",
                    flexDirection: "row",
                  }}
                >
                  {isMax8 ? (
                    <CheckCircle sx={{ color: "green", marginTop: "10px" }} />
                  ) : (
                    <Cancel sx={{ color: "red", marginTop: "10px" }} />
                  )}
                  <Typography
                    sx={{
                      fontSize: "16px",
                      color: "#7A7A7A",
                      marginTop: "10px",
                    }}
                  >
                    Max. of 8 characters.
                  </Typography>
                </Box>
                <Box
                  sx={{
                    marginBottom: "11.5px",
                    marginTop: "2rem",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",

                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}
                  >
                    Confirm New Password
                  </Typography>
                  <FormControl fullWidth variant="outlined">
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showConfirmPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="Confirm Password"
                      onChange={(event) => {
                        {
                          setConfirmPassword(event.target.value);
                        }
                      }}
                    />
                  </FormControl>
                  <Typography sx={{ color: "#DB2F2F", fontSize: "12px" }}>
                    {isMatch == false && "Passwords do not match"}
                  </Typography>
                </Box>
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
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ForgotPassword;
