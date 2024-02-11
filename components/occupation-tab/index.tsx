import { Box, Button, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const OccupationTab: React.FC<{onNextClick: () => void}> = ({onNextClick}) => {

    window.scrollTo({
        top: 0,
    });

    const [checkedGender, setCheckedGender] = useState("Male");

    return (
        <Box>
            <Box sx={{ marginBottom: "20px" }}>
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>Step 2: Occupation</Typography>
            </Box>
            <Box sx={{ marginBottom: "10px" }}>
                <Grid container spacing={5}>
                    <Grid item lg={6}>
                    <Box sx={{ marginBottom: "21.5px" }}>
                        <Box sx={{ marginBottom: "11.5px" }}>
                            <Typography>Employment Status</Typography>
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
                            <Typography>Nature of Job</Typography>
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
                </Grid>
            </Box>
            <Box sx={{ marginBottom: "10px" }}>
                <Grid container spacing={5}>
                    <Grid item lg={6}>
                    <Box sx={{ marginBottom: "21.5px" }}>
                        <Box sx={{ marginBottom: "11.5px" }}>
                            <Typography>Annual Income</Typography>
                        </Box>
                        <Box sx={{ borderRadius: "10px" }}>
                            <TextField 
                                placeholder="Currency in Naira"
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
                            <Typography>Employer's Name</Typography>
                        </Box>
                        <Box sx={{ borderRadius: "10px" }}>
                            <TextField 
                                placeholder="Enter Fullname"
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
            <Box sx={{ marginBottom: "15px" }}>
                <Grid container spacing={5}>
                    <Grid item lg={6}>
                    <Box sx={{ marginBottom: "21.5px" }}>
                        <Box sx={{ marginBottom: "11.5px" }}>
                            <Typography>Employer's Phone Number</Typography>
                        </Box>
                        <Box sx={{ borderRadius: "10px" }}>
                            <TextField 
                                placeholder="08109875634"
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
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ marginBottom: "50px" }}>
                <Box sx={{ marginBottom: "11.5px" }}>
                    <Typography>Employer's Address</Typography>
                </Box>
                <Box sx={{ borderRadius: "10px" }}>
                    <TextField 
                        placeholder="Write in here..."
                        sx={{
                            width: "100%",
                            borderRadius: "50px"
                        }}
                        inputProps={{
                            sx: {
                                borderRadius: "10px"
                            }
                        }}
                        multiline
                        rows={3}
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
                                <Button onClick={onNextClick} variant="contained" sx={{ boxShadow: "none", width: "100%", borderRadius: "6px", textTransform: "none", paddingY: "10px", paddingX: "70px" }}>
                                        Next
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

export default OccupationTab;