import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";

const Login: React.FC = () => {

    return (
        <Box>
            <Grid container>
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
                            <Typography>You don't have an account? Create an account</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

const LogoImageFrame: React.FC<{image:string}> = ({image}) => {

    return (
        <Box 
            sx={{ 
                backgroundImage: `url(${image})`,
                backgroundSize: "100% 100%",
                width: "154px",
                height: "70px"
             }}
        />
    );
}

const HeroImageFrame: React.FC = () => {

    return (
        <Box 
            sx={{ 
                backgroundColor: "#519E33",
                width: "300px",
                height: "300px"
             }}
        />
    );
}

export default Login;