import { Box, Button, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const IdentityTab: React.FC<{onSubmitClick: () => void}> = ({onSubmitClick}) => {

    window.scrollTo({
        top: 0,
    });

    return (
        <Box>
            <Box sx={{ marginBottom: "20px" }}>
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>Step 3: Identity</Typography>
            </Box>
            <Box sx={{ marginBottom: "10px" }}>
                <Grid container spacing={5}>
                    <Grid item lg={6}>
                    <Box sx={{ marginBottom: "21.5px" }}>
                        <Box sx={{ marginBottom: "11.5px" }}>
                            <Typography>Means of Identification</Typography>
                        </Box>
                        <Box sx={{ borderRadius: "10px" }}>
                            <TextField 
                                placeholder="-- Select --"
                                sx={{
                                    width: "100%",
                                    borderRadius: "50px"
                                }}
                                inputProps={{
                                    sx: {
                                        borderRadius: "10px"
                                    }
                                }}
                                // onChange={
                                //     (event: { 
                                //         target: { 
                                //             value: React.SetStateAction<string>; 
                                //         }; 
                                //     }) => setFirstName(event?.target.value)}
                                // onClick={ () => clearFirstNameError()}
                                // error = {firstNameError || firstNameError2}
                                // helperText = {(firstNameError && "Must not be empty") || (firstNameError2 && "Must be a valid name input")}
                            />
                        </Box>
                    </Box>
                    </Grid>
                    <Grid item lg={6}>
                    <Box sx={{ marginBottom: "21.5px" }}>
                        <Box sx={{ marginBottom: "11.5px" }}>
                            <Typography>Identification Number</Typography>
                        </Box>
                        <Box sx={{ borderRadius: "10px" }}>
                            <TextField 
                                placeholder="Enter ID Number"
                                sx={{
                                    width: "100%",
                                    borderRadius: "50px"
                                }}
                                inputProps={{
                                    sx: {
                                        borderRadius: "10px"
                                    }
                                }}
                                // onChange={
                                //     (event: { 
                                //         target: { 
                                //             value: React.SetStateAction<string>; 
                                //         }; 
                                //     }) => setFirstName(event?.target.value)}
                                // onClick={ () => clearFirstNameError()}
                                // error = {firstNameError || firstNameError2}
                                // helperText = {(firstNameError && "Must not be empty") || (firstNameError2 && "Must be a valid name input")}
                            />
                        </Box>
                    </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ marginBottom: "100px" }}>
            <Grid container spacing={5}>
                <Grid item lg={6}>
                    <Box>
                        <Button variant="outlined" sx={{ boxShadow: "none", width: "100%", borderRadius: "6px", textTransform: "none", paddingY: "10px", paddingX: "70px" }}>
                                Save progress and continue later
                        </Button>
                    </Box>
                </Grid>
                <Grid item lg={6}>
                    <Grid container spacing={4}>
                        <Grid item lg={6}>
                            <Box>
                                <Button variant="contained" sx={{ boxShadow: "none", width: "100%", borderRadius: "6px", textTransform: "none", paddingY: "10px", paddingX: "70px", background: "#000", ":hover" : {backgroundColor: "#000"} }}>
                                        Cancel
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item lg={6}>
                            <Box>
                                <Button onClick={onSubmitClick} variant="contained" sx={{ boxShadow: "none", width: "100%", borderRadius: "6px", textTransform: "none", paddingY: "10px", paddingX: "70px" }}>
                                        Submit
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            </Box>
        </Box>
    );
}

export default IdentityTab;