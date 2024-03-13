"use client";

import {
  HeroImageFrame,
  LogoImageFrame,
} from "../../../../components/common/image-frames";
import { emailValidationRegexp, nameValidationRegexp } from "../../../../utils";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { toast } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import RegistrationSuccessMessage from "../../../../components/registration-success-message";
import { Loader } from "../../../../components/common/loader";
import { RegisterUser } from "../../../../service/register";
import { useMutation } from "@tanstack/react-query";

const Register: React.FC = () => {
  const {
    mutateAsync,
    status,
    isSuccess,
    data: Data,
  } = useMutation({
    mutationFn: (payload: any) => RegisterUser(payload), // Assuming RegisterUser is an async function returning a Promise
  });

  useEffect(() => {
    if (status === "success" && Data?.status === true) {
      toast.success("Your account has been created successfully");
    } else if (status === "success" && Data?.status === false) {
      const errors = JSON.parse(Data.errors);
      toast.error(errors.email[0]);
    }
  }, [status, Data]);

  //For storing input values
  const [checkedAccountType, setCheckedAccountType] = useState("GUARDIAN");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //For loader

  //For displaying input error messages
  const [firstNameError, setFirstNameError] = useState(false);
  const [firstNameError2, setFirstNameError2] = useState(false);

  const [lastNameError, setLastNameError] = useState(false);
  const [lastNameError2, setLastNameError2] = useState(false);

  const [emailAddressError, setEmailAddressError] = useState(false);
  const [emailAddressError2, setEmailAddressError2] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [passwordError2, setPasswordError2] = useState(false);
  const [confirmPasswordError2, setConfirmPasswordError2] = useState(false);

  //For storing visibility state of passwords
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //For validating correctness of input before sending to api. Perform a group check on the values before performing mutation
  let fNameError,
    lNameError,
    eAddressError,
    passError,
    confirmPassError: boolean;

  //For hiding passwords
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  //For showing success message

  //For hiding internet connectivity warning
  const [showInternetMessage, setShowInternetMessage] = useState(false);

  const handleInternetMessageClose = () => setShowInternetMessage(false);

  //Submitting the form
  const handleSubmitClick = async () => {
    setFirstNameError(false);
    setFirstNameError2(false);
    setLastNameError(false);
    setLastNameError2(false);
    setEmailAddressError(false);
    setEmailAddressError2(false);
    setPasswordError(false);
    setPasswordError2(false);
    setConfirmPasswordError(false);
    setConfirmPasswordError2(false);
    console.log(firstName, lastName, emailAddress, password, confirmPassword);

    if (firstName.length < 1) {
      setFirstNameError(true);
      fNameError = true;
    } else if (
      firstName.length > 0 &&
      !nameValidationRegexp.test(firstName.trim())
    ) {
      setFirstNameError2(true);
      fNameError = true;
    } else {
      fNameError = false;
    }

    if (lastName.length < 1) {
      setLastNameError(true);
      lNameError = true;
    } else if (
      lastName.length > 0 &&
      !nameValidationRegexp.test(lastName.trim())
    ) {
      setLastNameError2(true);
      lNameError = true;
    } else {
      lNameError = false;
    }

    if (emailAddress.length < 1) {
      setEmailAddressError(true);
      eAddressError = true;
    } else if (
      emailAddress.length > 0 &&
      !emailValidationRegexp.test(emailAddress.trim())
    ) {
      setEmailAddressError2(true);
      eAddressError = true;
    } else {
      eAddressError = false;
    }

    if (password.length < 1) {
      setPasswordError(true);
      passError = true;
    } else if (password.length > 1 && password.length < 8) {
      setPasswordError2(true);
      passError = true;
    } else {
      passError = false;
    }

    if (confirmPassword.length < 1) {
      setConfirmPasswordError(true);
      confirmPassError = true;
    } else if (confirmPassword.length > 1 && confirmPassword != password) {
      setConfirmPasswordError2(true);
      confirmPassError = true;
    } else {
      confirmPassError = false;
    }

    //TODO: Get trimmed valued of name and email inputs before sending to API

    // Perform Actions according to response from API

    const isInternetConnectivityError = false;

    if (
      !(
        fNameError ||
        lNameError ||
        eAddressError ||
        passError ||
        confirmPassError
      )
    ) {
      if (!isInternetConnectivityError) {
        const payload = {
          first_name: firstName,
          last_name: lastName,
          email: emailAddress,
          password: password,
          password_confirmation: confirmPassword,
          account_type: checkedAccountType,
        };

        await mutateAsync(payload);
      } else {
        setShowInternetMessage(true);
      }
    }
  };

  function clearFirstNameError() {
    setFirstNameError(false);
    setFirstNameError2(false);
  }

  function clearLastNameError() {
    setLastNameError(false);
    setLastNameError2(false);
  }

  function clearEmailAddressError() {
    setEmailAddressError(false);
    setEmailAddressError2(false);
  }

  function clearPasswordError() {
    setPasswordError(false);
    setPasswordError2(false);
  }

  function clearConfirmPasswordError() {
    setConfirmPasswordError(false);
    setConfirmPasswordError2(false);
  }

  return (
    <>
      {status === "pending" && <Loader />}
      <Box>
        <Box>
          <Grid container>
            <Grid
              item
              xs={12}
              lg={6}
              sx={{
                position: { xs: "static", lg: "fixed" },
                backgroundColor: "#F5F5F5",
                height: { xs: "auto", lg: "100vh" },
              }}
            >
              <Box
                sx={{ paddingX: { xs: "20px", lg: "100px" }, paddingY: "51px" }}
              >
                <Box sx={{ marginBottom: { xs: "0px", lg: "10px" } }}>
                  <LogoImageFrame image={"/nurul_yateem_logo.png"} />
                </Box>
                <Box sx={{ display: { xs: "none", lg: "block" } }}>
                  <Box
                    sx={{
                      marginBottom: "35px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <HeroImageFrame image={"/hero_picture_reg.png"} />
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
                      transforming lives and making a lasting impact.{" "}
                      <Link
                        href="/register"
                        style={{ color: "#268600", textDecoration: "none" }}
                      >
                        Sign up now
                      </Link>{" "}
                      to become a beacon of hope and support our mission for a
                      brighter tomorrow.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid container xs={12} lg={12}>
              <Grid item lg={6}></Grid>
              <Grid item xs={12} lg={6}>
                <Box
                  sx={{
                    backgroundColor: "white",
                    ...(status !== "success" && { minHeight: "100vh" }), // Apply minHeight only if status is not "success"
                    padding: { xs: "30px", lg: "70px" },
                  }}
                >
                  <Box
                    sx={{
                      ...(showInternetMessage
                        ? { display: "block" }
                        : { display: "none" }),
                      position: { xs: "static", lg: "fixed" },
                      top: 10,
                      right: 10,
                      width: { xs: "100%", lg: "421px" },
                      marginBottom: { xs: "20px", lg: "0px" },
                    }}
                  >
                    <Alert
                      sx={{ backgroundColor: "#FFF4E5" }}
                      severity="warning"
                      onClose={() => setShowInternetMessage(false)}
                    >
                      Check your Internet Connectivity
                    </Alert>
                  </Box>

                  {status === "success" && Data?.status === true ? (
                    <Box
                      sx={{
                        marginTop: "50px",
                      }}
                    >
                      <RegistrationSuccessMessage />
                    </Box>
                  ) : (
                    <Box>
                      <Box sx={{ marginBottom: "15px" }}>
                        <Typography variant="h1">Get Started</Typography>
                      </Box>
                      <Box sx={{ marginBottom: "50px" }}>
                        <Typography sx={{ fontSize: "16px", color: "#8D8B90" }}>
                          Create your account now
                        </Typography>
                      </Box>
                      <Box sx={{ marginBottom: "21.5px" }}>
                        <Box
                          sx={{ marginBottom: { xs: "18px", sm: "11.5px" } }}
                        >
                          <Typography>
                            What account are you creating?
                          </Typography>
                        </Box>
                        <RadioGroup value={checkedAccountType}>
                          <Grid container rowSpacing={3} columnSpacing={5}>
                            <Grid item xs={12} sm={6}>
                              <Box
                                onClick={() =>
                                  setCheckedAccountType("GUARDIAN")
                                }
                                sx={{
                                  cursor: "pointer",
                                  border: "2px solid",
                                  paddingY: "10px",
                                  paddingX: "15px",
                                  borderRadius: "5px",
                                  ...(checkedAccountType == "GUARDIAN"
                                    ? { borderColor: "#268500" }
                                    : { borderColor: "#D2D2D2" }),
                                }}
                              >
                                <FormControlLabel
                                  onClick={() =>
                                    setCheckedAccountType("GUARDIAN")
                                  }
                                  value="GUARDIAN"
                                  control={<Radio />}
                                  label="Guardian"
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box
                                onClick={() => setCheckedAccountType("SPONSOR")}
                                sx={{
                                  cursor: "pointer",
                                  border: "2px solid",
                                  paddingY: "10px",
                                  paddingX: "15px",
                                  borderRadius: "5px",
                                  ...(checkedAccountType == "SPONSOR"
                                    ? { borderColor: "#268500" }
                                    : { borderColor: "#D2D2D2" }),
                                }}
                              >
                                <FormControlLabel
                                  onClick={() =>
                                    setCheckedAccountType("SPONSOR")
                                  }
                                  value="SPONSOR"
                                  control={<Radio />}
                                  label="Sponsor"
                                />
                              </Box>
                            </Grid>
                          </Grid>
                        </RadioGroup>
                      </Box>
                      <Box sx={{ marginBottom: "21.5px" }}>
                        <Box sx={{ marginBottom: "11.5px" }}>
                          <Typography>Firstname</Typography>
                        </Box>
                        <Box sx={{ borderRadius: "10px" }}>
                          <TextField
                            placeholder="Enter your firstname"
                            sx={{
                              width: "100%",
                              borderRadius: "50px",
                            }}
                            inputProps={{
                              sx: {
                                borderRadius: "10px",
                              },
                            }}
                            onChange={(event: {
                              target: {
                                value: React.SetStateAction<string>;
                              };
                            }) => {
                              setFirstName(event?.target.value);
                              clearFirstNameError();
                            }}
                            error={firstNameError || firstNameError2}
                            helperText={
                              (firstNameError && "Must not be empty") ||
                              (firstNameError2 && "Must be a valid name input")
                            }
                          />
                        </Box>
                      </Box>
                      <Box sx={{ marginBottom: "21.5px" }}>
                        <Box sx={{ marginBottom: "11.5px" }}>
                          <Typography>Lastname</Typography>
                        </Box>
                        <Box>
                          <TextField
                            placeholder="Enter your lastname"
                            sx={{
                              width: "100%",
                              borderRadius: "10px",
                            }}
                            onChange={(event: {
                              target: {
                                value: React.SetStateAction<string>;
                              };
                            }) => {
                              setLastName(event.target.value);
                              clearLastNameError();
                            }}
                            error={lastNameError || lastNameError2}
                            helperText={
                              (lastNameError && "Must not be empty") ||
                              (lastNameError2 && "Must be a valid name input")
                            }
                          />
                        </Box>
                      </Box>
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
                            onChange={(event: {
                              target: {
                                value: React.SetStateAction<string>;
                              };
                            }) => {
                              setEmailAddress(event.target.value);
                              clearEmailAddressError();
                            }}
                            error={emailAddressError || emailAddressError2}
                            helperText={
                              (emailAddressError && "Must not be empty") ||
                              (emailAddressError2 && "Must be a valid email")
                            }
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
                                onChange={(event: {
                                  target: {
                                    value: React.SetStateAction<string>;
                                  };
                                }) => {
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
                          <Typography
                            sx={{ color: "#DB2F2F", fontSize: "12px" }}
                          >
                            {(passwordError && "Must not be empty") ||
                              (passwordError2 &&
                                "Passwords must be at least eight characters long")}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ marginBottom: "50px" }}>
                        <Box sx={{ marginBottom: "11.5px" }}>
                          <Typography>Confirm Password</Typography>
                        </Box>
                        <Grid container>
                          <Grid item xs={12}>
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
                                placeholder="Password"
                                onChange={(event: {
                                  target: {
                                    value: React.SetStateAction<string>;
                                  };
                                }) => {
                                  setConfirmPassword(event.target.value);
                                  clearConfirmPasswordError();
                                }}
                                error={confirmPasswordError}
                              />
                            </FormControl>
                          </Grid>
                        </Grid>
                        <Box
                          sx={{
                            ...(confirmPasswordError || confirmPasswordError2
                              ? { display: "block" }
                              : { display: "none" }),
                            marginTop: "5px",
                            marginLeft: "20px",
                          }}
                        >
                          <Typography
                            sx={{ color: "#DB2F2F", fontSize: "12px" }}
                          >
                            {(confirmPasswordError && "Must not be empty") ||
                              (confirmPasswordError2 &&
                                "Passwords do not match")}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ marginBottom: "19px" }}>
                        <Button
                          onClick={() => handleSubmitClick()}
                          variant="contained"
                          sx={{
                            width: "100%",
                            borderRadius: "6px",
                            textTransform: "none",
                            paddingY: "10px",
                          }}
                        >
                          Create Account
                        </Button>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          textAlign: "center",
                        }}
                      >
                        <Typography>
                          You already have an account?{" "}
                          <Link
                            href="/login"
                            style={{ color: "#268600", textDecoration: "none" }}
                          >
                            Login
                          </Link>
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Register;
