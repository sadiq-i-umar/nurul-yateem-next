"use client";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  HeroImageFramePlaceHolder,
  LogoImageFrame,
} from "../../../../components/common/image-frames";
import { toast } from "react-hot-toast";
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
import { Session } from "next-auth";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { baseUrl } from "../../../../utils/constant";
import { Loader } from "../../../../components/common/loader";

const Login: React.FC = () => {
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState("");
  const [loading, setLoading] = useState(false); // Define loading state
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

  const handleLogin = async () => {
    setLoading(true); // Set loading state to true when login process starts

    if (emailAddress === "") {
      setEmailAddressError(true);
      setLoading(false); // Set loading state to false when an error occurs
      return;
    }

    if (password === "") {
      setPasswordError(true);
      setLoading(false); // Set loading state to false when an error occurs
      return;
    }

    if (password.length < 8) {
      setPasswordError2(true);
      setLoading(false); // Set loading state to false when an error occurs
      return;
    }

    if (emailAddress && password && password.length >= 8) {
      try {
        const res = await signIn("credentials", {
          email: emailAddress,
          password: password,
          redirect: false,
        });

        if (res && res.ok) {
          const user: Session | null | undefined = await getSession();
          if (user !== undefined) {
            if (user?.user?.account === "ADMIN") {
              toast.success("Login successful!");
              router.push("/dashboard/admin");
            } else if (user?.user?.account === "SPONSOR") {
              toast.success("Login successful!");
              router.push("/dashboard/home");
            } else if (user?.user?.account === "GUARDIAN") {
              try {
                const profileRes = await axios.get(`${baseUrl}/user-profile`, {
                  headers: {
                    Authorization: `Bearer ${user?.token}`,
                  },
                });

                const { orphans } = profileRes?.data;

                if (orphans.length === 0) {
                  toast.success(
                    "Please complete your profile first. You have no orphans."
                  );
                  router.push("/dashboard/add-an-orphan");
                } else {
                  toast.success("Login successful!");
                  router.push("/dashboard/home");
                }
              } catch (error: any) {
                if (
                  error.response &&
                  error.response.data &&
                  error.response.data.error ===
                    "Guardian profile not found for this user."
                ) {
                  toast.success("Please complete your profile first.");
                  router.push("/dashboard/complete-account");
                } else {
                  console.error("Error during fetching user profile:", error);
                  toast.error("Invalid email or password.");
                }
              }
            }
          } else {
            toast.error("Invalid email or password.");
          }
        } else {
          toast.error("Invalid email or password.");
        }
      } catch (error: any) {
        toast.error("An error occurred. Please try again.");
      } finally {
        setLoading(false); // Set loading state to false when login process finishes
      }
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Box sx={{ height: "100vh", overflow: "hidden" }}>
        <Grid container>
          <Grid item xs={12} lg={6} sx={{ backgroundColor: "#F5F5F5" }}>
            <Box
              sx={{ paddingX: { xs: "20px", sm: "100px" }, paddingY: "51px" }}
            >
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
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
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
    </>
  );
};

export default Login;
