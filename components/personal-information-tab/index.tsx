import { Box, Button, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const PersonalInformationTab: React.FC<{onNextClick: () => void}> = ({onNextClick}) => {

    window.scrollTo({
        top: 0,
    });

    const [checkedGender, setCheckedGender] = useState("Male");

    return (
        <Box>
            <Box sx={{ marginBottom: "20px" }}>
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>Step 1: Personal Information</Typography>
            </Box>
            <Box sx={{ display: "flex", marginBottom: "20px", alignItems: "center", flexDirection: {xs: "column", md: "row"} }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", border: "1px solid #DFDFDF", borderStyle: "dashed", paddingX: "15px", paddingY: "10px", marginRight: "30px" }}>
                    <Box sx={{ marginBottom: "10px" }}><Typography>Avatar</Typography></Box>
                    <Box sx={{ marginBottom: "10px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#F5F5F5", borderRadius: "50%", padding: "50px" }}><Image src={"/camera.svg"} width={30} height={30} alt={"Upload Camera Icon"}/></Box>
                    <Box sx={{ marginBottom: "10px" }}>
                        <Button variant="contained" sx={{ boxShadow: "none", width: "100%", borderRadius: "6px", textTransform: "none", paddingY: "10px", paddingX: "70px" }}>
                            Continue
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ marginTop: {xs: "20px", md: "-100px"}, width: {xs: "100%", sm: "320px"} }}>
                    <Typography sx={{ color: "#676767" }}>Svg, Png, Jpg are all allowed, and must not be more that 5MB</Typography>
                </Box>
            </Box>
            <Box sx={{ marginBottom: "30px" }}>
                <Box sx={{ marginBottom: {xs: "18px", sm: "11.5px"} }}>
                    <Typography>Gender</Typography>
                </Box>
                <RadioGroup
                    value={checkedGender}
                    sx={{ display: "flex", flexDirection: "row" }}
                >
                    <Box onClick={() => setCheckedGender("Male")} sx={{ flexShrink: 1, cursor: "pointer", border: "2px solid", paddingY: "10px", paddingX: "15px", borderRadius: "10px", marginRight: "40px", ...( checkedGender == "Male" ? {borderColor: "#268500"} : {borderColor: "#D2D2D2"} ) }}>
                        <FormControlLabel onClick={() => setCheckedGender("Male")} value="Male" control={<Radio />} label="Male" />
                    </Box>
                    <Box onClick={() => setCheckedGender("Female")} sx={{ cursor: "pointer", border: "2px solid", paddingY: "10px", paddingX: "15px", borderRadius: "10px", ...( checkedGender == "Female" ? {borderColor: "#268500"} : {borderColor: "#D2D2D2"} ) }}>
                        <FormControlLabel onClick={() => setCheckedGender("Female")} value="Female" control={<Radio />} label="Female" />
                    </Box>
                </RadioGroup>
            </Box>
            <Box sx={{ marginBottom: "10px" }}>
                <Grid container spacing={5}>
                    <Grid item lg={6}>
                    <Box sx={{ marginBottom: "21.5px" }}>
                        <Box sx={{ marginBottom: "11.5px" }}>
                            <Typography>Date of Birth</Typography>
                        </Box>
                        <Box sx={{ borderRadius: "10px" }}>
                            <TextField 
                                placeholder="DD/MM/YYYY"
                                sx={{
                                    width: "100%",
                                    borderRadius: "50px"
                                }}
                                inputProps={{
                                    sx: {
                                        borderRadius: "10px"
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                    </Grid>
                    <Grid item lg={6}>
                    <Box sx={{ marginBottom: "21.5px" }}>
                        <Box sx={{ marginBottom: "11.5px" }}>
                            <Typography>Marital Status</Typography>
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
                            <Typography>Phone Number</Typography>
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
                            />
                        </Box>
                    </Box>
                    </Grid>
                    <Grid item lg={6}>
                    <Box sx={{ marginBottom: "21.5px" }}>
                        <Box sx={{ marginBottom: "11.5px" }}>
                            <Typography>Alternate Phone Number</Typography>
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
                            />
                        </Box>
                    </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ marginBottom: "21.5px" }}>
                <Box sx={{ marginBottom: "11.5px" }}>
                    <Typography>Home Address</Typography>
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
                        rows={4}
                    />
                </Box>
            </Box>
            <Box sx={{ marginBottom: "30px" }}>
                <Grid container spacing={5}>
                    <Grid item lg={6}>
                    <Box sx={{ marginBottom: "21.5px" }}>
                        <Box sx={{ marginBottom: "11.5px" }}>
                            <Typography>State of Origin</Typography>
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
                            />
                        </Box>
                    </Box>
                    </Grid>
                    <Grid item lg={6}>
                    <Box sx={{ marginBottom: "21.5px" }}>
                        <Box sx={{ marginBottom: "11.5px" }}>
                            <Typography>LGA</Typography>
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

export default PersonalInformationTab;