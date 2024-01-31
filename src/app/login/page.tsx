import { HeroImageFrame, LogoImageFrame } from "@/common/image-frames";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const Login: React.FC = () => {

    return (
        <Box>
            <Grid className="border-4 border-yellow-900" container>
                <Grid item xs={12} lg={6}>
                    <Box sx={{ paddingX: {xs: "20px", sm: "100px"}, paddingY: "51px" }}>
                        <Box sx={{ marginBottom: "49px" }}>
                            <LogoImageFrame image={"/nurul_yateem_logo.png"}/>
                        </Box>
                        <Box sx={{ display: {xs: "none", lg: "block"} }}>
                        <Box sx={{ marginBottom: "27px", display: "flex", justifyContent: "center" }}>
                            <HeroImageFrame />
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "center", textAlign: "center", fontSize: "16px" }}>
                            <Typography>
                                Be the change you want to see in the world – join us in transforming lives and making a lasting impact.
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "center", fontSize: "16px" }}>
                            Donate Now!
                        </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Box sx={{ backgroundColor: "white", minHeight: "100vh", padding: {xs: "30px", sm: "70px"} }}>
                        <Box sx={{ marginBottom: "8px" }}>
                            <Typography variant="h1">Login</Typography>
                        </Box>
                        <Box sx={{ marginBottom: "50px" }}>
                            <Typography sx={{ fontSize: "16px", color: "#8D8B90" }}>Please provide your login credentials</Typography>
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
                                        borderRadius: "10px"
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ marginBottom: "51px" }}>
                            <Box sx={{ marginBottom: "11.5px" }}>
                                <Typography>Email Address</Typography>
                            </Box>
                            <Box>
                                <TextField 
                                    placeholder="Enter your email address"
                                    sx={{
                                        width: "100%",
                                        borderRadius: "10px"
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ marginBottom: "19px" }}>
                            <Button variant="contained" sx={{ width: "100%", borderRadius: "6px", textTransform: "none" }}>
                                Login
                            </Button>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Typography>You don&apos;t have an account? <Link href="/register" style={{ color: "#268600" }}>Create an account</Link></Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Login;