"use client";
import React from 'react';
import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, Link, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import pfpimage from './Ellipse 1.png'; // Import the image file

const Profile: React.FC = () => {
    return (
        <section>
            <Box >
                
                <Box>
                    <Typography sx={{ fontSize: "1.125rem", fontWeight: "500", margin: 2, }}> Profile </Typography>
                    <Typography sx={{ margin: 2, color: '#676767', fontSize: "0.875rem", fontWeight: "400", }}>Update your photo and personal details</Typography >
                </Box>
                <Divider />
                <Box sx={{ display: 'flex' }}>
                    <Box>
                        <Typography sx={{ fontSize: "1.125rem", fontWeight: "500", margin: 2, }}> Your Photo </Typography>
                        
                        <Typography sx={{ margin: 2, color: '#676767', fontSize: "0.875rem", fontWeight: "400", }}> This is displayed on your profile</Typography>
                    </Box>
                    <Box><img  src={`${pfpimage}`} alt="profile picture" /></Box>
                    <Box sx={{ marginLeft: '30rem', marginTop: '1rem', }}>
                        <img src="+9--" alt="" />
                        <Button color="primary">Delete</Button>
                        <Button color="success" sx={{ margin: 2 }}> Change </Button>
                    </Box>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex' }}>
                    <Box >
                        <Typography sx={{ fontSize: "1.125rem", fontWeight: "500", margin: 2, }}>Your Name</Typography >
                    </Box>
                    <Box sx={{ marginLeft: '20rem', padding: '1rem' }}>
                        <TextField sx={{ marginRight: '3rem' }} id="outlined-basic" label="Firstname:" variant="outlined" />
                        <TextField id="outlined-basic" label="Lastname:" variant="outlined" />
                    </Box>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex' }}>
                    <Box>
                        <Typography sx={{ fontSize: "1.125rem", fontWeight: "500", margin: 2, }} variant="h3" > Gender </Typography>
                    </Box>

                    <Box sx={{ padding: '1rem' }}>
                        <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" >
                            <FormControlLabel sx={{ marginRight: '3rem' }} value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />

                        </RadioGroup>
                    </Box>
                </Box>
                <Divider />

                <Box sx={{ display: 'flex' }}>
                    <Box>
                        <Typography sx={{ fontSize: "1.125rem", fontWeight: "500", margin: 2, }} variant='h3'>Personal information</Typography>
                    </Box>
                    <Box sx={{ padding: '4rem' }}>

                        <form>
                            <Grid container spacing={2}>
                                {/* Date of Birth */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Date of Birth"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                    />
                                </Grid>

                                {/* Marital Status */}
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="marital-status-label">Marital Status</InputLabel>
                                        <Select
                                            labelId="marital-status-label"
                                            label="Marital Status"
                                            defaultValue="Undefined"
                                        >
                                            <MenuItem value="Undefined">Undefined</MenuItem>
                                            <MenuItem value="single">Single</MenuItem>
                                            <MenuItem value="married">Married</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Phone Number */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Phone Number"
                                        type="tel"
                                        variant="outlined"
                                    />
                                </Grid>

                                {/* Alternate Phone Number */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Alternate Phone Number (optional)"
                                        type="tel"
                                        variant="outlined"
                                    />
                                </Grid>

                                {/* Home Address */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Home Address"
                                        multiline
                                        rows={5}
                                        variant="outlined"
                                        defaultValue="Write in here..."
                                    />
                                </Grid>

                                {/* State of Origin */}
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="state-origin-label">State of Origin</InputLabel>
                                        <Select
                                            labelId="state-origin-label"
                                            label="State of Origin"
                                            defaultValue="Undefined"
                                        >
                                            <MenuItem value="Undefined">Undefined</MenuItem>
                                            <MenuItem value="single">Single</MenuItem>
                                            <MenuItem value="married">Married</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* LGA */}
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="lga-label">LGA</InputLabel>
                                        <Select
                                            labelId="lga-label"
                                            label="LGA"
                                            defaultValue="Undefined"
                                        >
                                            <MenuItem value="Undefined">Undefined</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </form>

                    </Box>
                </Box>

                <Divider />
                <Box sx={{ display: 'flex' }}>

                    <Box>
                        <Typography sx={{ fontSize: "1.125rem", fontWeight: "500", margin: 2, }} variant="h5" gutterBottom>
                            Occupation
                        </Typography>
                    </Box>
                    <Box sx={{ padding: '4rem' }}>
                        <form>


                            <Grid container spacing={2}>
                                {/* Employment Status */}
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="employment-status-label">Employment Status</InputLabel>
                                        <Select
                                            labelId="employment-status-label"
                                            label="Employment Status"
                                            defaultValue="Undefined"
                                        >
                                            <MenuItem value="Undefined">Undefined</MenuItem>
                                            {/* Add more employment status options here */}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Nature of Job */}
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="nature-of-job-label">Nature of Job</InputLabel>
                                        <Select
                                            labelId="nature-of-job-label"
                                            label="Nature of Job"
                                            defaultValue="Undefined"
                                        >
                                            <MenuItem value="Undefined">Undefined</MenuItem>
                                            {/* Add more nature of job options here */}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Annual Income */}
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1">Annual Income</Typography>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        variant="outlined"
                                        defaultValue="Currency in Naira"
                                    />
                                </Grid>

                                {/* Employer's Name */}
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1">Employer's Name</Typography>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        variant="outlined"
                                        defaultValue="Enter fullname"
                                    />
                                </Grid>

                                {/* Employer's Phone Number */}
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1">Employer's Phone Number</Typography>
                                    <TextField
                                        fullWidth
                                        type="tel"
                                        variant="outlined"
                                    />
                                </Grid>

                                {/* Employer's Address */}
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1">Employer's Address</Typography>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={5}
                                        variant="outlined"
                                        defaultValue="Write in here..."
                                    />
                                </Grid>
                            </Grid>
                        </form>
                        <Button variant="contained"  >Cancel</Button>
                        <Button variant="contained" color="primary" sx={{ margin: 2 }}> Save </Button>
                    </Box>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex' }}>

                    <Box>
                        <Typography sx={{ fontSize: "1.125rem", fontWeight: "500", margin: 5, }} variant="h3" >
                            Deactivate Account
                        </Typography>
                    </Box>
                    <Box sx={{ padding: '2rem', left: '5rem', width: '40rem' }}>
                        <Button variant="contained" color="error" sx={{ padding: '0.5rem', width: '40rem', borderRadius: '30px' }}>Deactivate My Account</Button><br />
                        <FormControlLabel required control={<Checkbox />} label="Warning by clicking this box, it means you have initiated the deactivation button." sx={{ padding: '0.5rem', width: '40rem' }} />
                    </Box>
                </Box>
            </Box>
        </section>
    );
};
export default Profile;