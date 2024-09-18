"use client";
import React from 'react';
import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, Link, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import Image1 from './image 1.png'; // Import the image file

const TwoFA: React.FC = () => {
    return (
        <section>
            <Box >

                <Box>
                    <Typography sx={{ fontSize: "1.125rem", fontWeight: "500", margin: 2, }}> Two-way Factor Authentication </Typography>
                    <Typography sx={{ margin: 2, color: '#676767', fontSize: "0.875rem", fontWeight: "400", }}>Download the free google authenticator app on your mobile device, click add and then scan the QR code to set up your account</Typography >
                    <img  src={`${Image1}`} alt="QR Code" />
                   
        

                </Box>
               
                <Box >
                    <Box >
                        <Typography sx={{ fontSize: "1.125rem", fontWeight: "500", margin: 2, }}>Enter the code that was generated</Typography >
                    </Box>
                    <Box sx={{ margin: 2, }} >
                        <TextField id="outlined-basic" label="Six digit code" variant="outlined" />
                    </Box>
                </Box>
                <Box sx={{ marginLeft: 2,marginTop:4 }}>
                    <Button variant="contained" >Cancel</Button>
                    <Button variant="contained" color="primary" sx={{ marginLeft: '3rem' }}> Validate </Button>

                </Box>
            </Box>
        </section>
    )
}
export default TwoFA;