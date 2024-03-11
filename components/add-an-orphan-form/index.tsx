"use client";

import { Box, Button, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import { states_in_nigeria_dropdown } from "../../utils";
import { PhotoUploadFrame } from "../common/image-frames";
import { PersonalInformation } from "../../utils/interfaces";
import { VisuallyHiddenInput } from "../common/input";
import DragUpload from "../drag-upload";
import { Add } from "@mui/icons-material";
import SubmitOrphan from "../submit-orphan";

const AddAnOrphanForm: React.FC<{onNextClick: (personalInfo: PersonalInformation | undefined) => void}> = ({onNextClick}) => {

    //Reset scroll on tab display
    window.scrollTo({
        top: 0,
    });

    const [ image, setImage ] = useState<{ url: string | null; file?: any }>({ url: '' });
    const [checkedGender, setCheckedGender] = useState('');
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ affidavit, setAffidavit ] = useState('')
    const [ stateOfOrigin, setStateOfOrigin ] = useState('')
    const [ lga, setLga ] = useState('')
    const [ dob, setDob ] = useState<Dayjs | null>(null);
    const [ schoolingStatus, setSchoolingStatus ] = useState('')
    const [ schoolName, setSchoolName ] = useState('')
    const [ schoolAddress, setSchoolAddress ] = useState('')
    const [ schoolContactPerson, setSchoolContactPerson ] = useState('')
    const [ schoolContactPersonPhone, setSchoolContactPersonPhone ] = useState('')

    const sendDataToParent = (data: PersonalInformation) => {
        onNextClick(data)
    }
    
    const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage({ file, url: reader?.result as string });
            };
            reader.readAsDataURL(file);
        }
    };
    

    if (image.url?.indexOf('data:image') != undefined) {
        if (image.url?.indexOf('data:image')  > -1) {
            // TODO: Upload image to google bucket and store response
        }
    }

    return (
        <Box>
            <Box sx={{ display: "flex", marginBottom: "20px", alignItems: "center", flexDirection: {xs: "column", md: "row"} }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", border: "1px solid #DFDFDF", borderStyle: "dashed", paddingX: "15px", paddingY: "10px", marginRight: "30px" }}>
                    <Box sx={{ marginBottom: "10px" }}><Typography>Avatar</Typography></Box>
                    <PhotoUploadFrame image={image.url || ""}/>
                    <Box sx={{ marginBottom: "10px" }}>
                        <Button component="label" variant="contained" sx={{ boxShadow: "none", width: "100%", borderRadius: "6px", textTransform: "none", paddingY: "10px", paddingX: "70px", position: 'relative', textAlign: "center" }}>
                            Choose file
                            <VisuallyHiddenInput
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                onChange={handleImageSelection}
                            />
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ marginTop: {xs: "20px", md: "-100px"}, width: {xs: "100%", sm: "320px"} }}>
                    <Typography sx={{ color: "#676767" }}>Svg, Png, Jpg are all allowed, and must not be more that 5MB</Typography>
                </Box>
            </Box>
            <Box sx={{  }}>
                <Box sx={{ marginBottom: {xs: "18px", sm: "11.5px"} }}>
                    <Typography>Gender</Typography>
                </Box>
                <RadioGroup
                    value={checkedGender}
                    sx={{ display: "flex", flexDirection: "row" }}
                >
                    <Box onClick={() => setCheckedGender("Male")} sx={{ flexShrink: 1, cursor: "pointer", border: "2px solid", paddingY: "10px", paddingX: "15px", borderRadius: "10px", marginRight: "40px", ...( checkedGender == "Male" ? {borderColor: "#268500"} : {borderColor: "#D2D2D2"} ), marginBottom: "30px" }}>
                        <FormControlLabel onClick={() => setCheckedGender("Male")} value="Male" control={<Radio />} label="Male" />
                    </Box>
                    <Box onClick={() => setCheckedGender("Female")} sx={{ cursor: "pointer", border: "2px solid", paddingY: "10px", paddingX: "15px", borderRadius: "10px", ...( checkedGender == "Female" ? {borderColor: "#268500"} : {borderColor: "#D2D2D2"} ), marginBottom: "30px" }}>
                        <FormControlLabel onClick={(e) => setCheckedGender("Female")} value="Female" control={<Radio />} label="Female" />
                    </Box>
                </RadioGroup>
            </Box>
            <Box sx={{ marginBottom: "30px" }}>
                <Grid container spacing={5}>
                    <Grid item lg={6}>
                    <Box sx={{ marginBottom: "21.5px" }}>
                        <Box sx={{ marginBottom: "11.5px" }}>
                            <Typography>Firstname</Typography>
                        </Box>
                        <Box sx={{ borderRadius: "10px" }}>
                            <TextField
                                sx={{
                                    width: "100%",
                                    borderRadius: "50px"
                                }}
                                inputProps={{
                                    sx: {
                                        borderRadius: "10px"
                                    }
                                }}
                                placeholder="Enter firstname"
                                value={firstName}
                                onChange={
                                    (event: { 
                                        target: { 
                                            value: string; 
                                        }; 
                                    }) => setFirstName(event?.target.value)}
                            />
                        </Box>
                    </Box>
                    </Grid>
                    <Grid item lg={6}>
                    <Box sx={{ marginBottom: "21.5px" }}>
                        <Box sx={{ marginBottom: "11.5px" }}>
                            <Typography>Lastname</Typography>
                        </Box>
                        <Box sx={{ borderRadius: "10px" }}>
                            <TextField
                                sx={{
                                    width: "100%",
                                    borderRadius: "50px"
                                }}
                                inputProps={{
                                    sx: {
                                        borderRadius: "10px"
                                    }
                                }}
                                placeholder="Enter lastname"
                                value={lastName}
                                onChange={
                                    (event: { 
                                        target: { 
                                            value: string; 
                                        }; 
                                    }) => setLastName(event?.target.value)}
                            />
                        </Box>
                    </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ marginBottom: "60px", width: "100%" }}>
                <DragUpload title={"Affidavit of Guardianship"} subtitle={"Drag and Drop Document"} />
            </Box>
            <Box sx={{ marginBottom: "10px" }}>
                <Grid container spacing={5}>
                    <Grid item lg={6}>
                    <Box sx={{ marginBottom: "21.5px" }}>
                        <Box sx={{ marginBottom: "11.5px" }}>
                            <Typography>State of Origin</Typography>
                        </Box>
                        <Box sx={{ borderRadius: "10px" }}>
                            <Select
                                value={stateOfOrigin}
                                sx={{
                                    borderRadius: '10px',
                                    width: '100%'
                                }}
                                onChange={ (e) => {setStateOfOrigin(e.target.value); e.target.value ? localStorage.setItem('stateOfOrigin', e.target.value) : null}}
                                >
                                    {["-- Select --", ...states_in_nigeria_dropdown].map((item, index) => (
                                        <MenuItem key={index} value={item}>
                                            {item}
                                        </MenuItem>
                                    ))}
                            </Select>
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
                                sx={{
                                    width: "100%",
                                    borderRadius: "50px"
                                }}
                                inputProps={{
                                    sx: {
                                        borderRadius: "10px"
                                    }
                                }}
                                placeholder={"Enter LGA"}
                                value={lga}
                                onChange={
                                    (event: { 
                                        target: { 
                                            value: string; 
                                        }; 
                                    }) => setLga(event?.target.value)}
                            />
                        </Box>
                    </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ marginBottom: "50px" }}>
                <Grid container spacing={5}>
                    <Grid item lg={6}>
                        <Box sx={{ marginBottom: "11.5px" }}>
                            <Typography>Date of Birth</Typography>
                        </Box>
                        <Box sx={{ borderRadius: "10px" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    value={dob}
                                    onChange={(newDate) => setDob(newDate ?? null)}
                                    format="DD/MM/YYYY"
                                    sx={{ width: "100%" }}
                                />
                            </LocalizationProvider>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ marginBottom: "50px" }}>
                <Typography variant={"h1"} sx={{ fontWeight: 400 }}>School Information</Typography>
            </Box>
            <Box sx={{ marginBottom: "10px" }}>
                <Grid container spacing={5}>
                    <Grid item lg={6}>
                    <Box sx={{ marginBottom: "21.5px" }}>
                        <Box sx={{ marginBottom: "11.5px" }}>
                            <Typography>Is he/she in school?</Typography>
                        </Box>
                        <Box sx={{ borderRadius: "10px" }}>
                            <Select
                                value={schoolingStatus}
                                sx={{
                                    borderRadius: '10px',
                                    width: '100%'
                                }}
                                onChange={ (e) => setSchoolingStatus(e.target.value)}
                                >
                                    {["-- Select --", ...states_in_nigeria_dropdown].map((item, index) => (
                                        <MenuItem key={index} value={item}>
                                            {item}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </Box>
                    </Box>
                    </Grid>
                    <Grid item lg={6}>
                    <Box sx={{ marginBottom: "21.5px" }}>
                        <Box sx={{ marginBottom: "11.5px" }}>
                            <Typography>School Name</Typography>
                        </Box>
                        <Box sx={{ borderRadius: "10px" }}>
                        <TextField 
                                sx={{
                                    width: "100%",
                                    borderRadius: "50px"
                                }}
                                inputProps={{
                                    sx: {
                                        borderRadius: "10px"
                                    }
                                }}
                                placeholder={"Enter School Name"}
                                value={schoolName}
                                onChange={
                                    (event: { 
                                        target: { 
                                            value: string; 
                                        }; 
                                    }) => setSchoolName(event?.target.value)}
                            />
                        </Box>
                    </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ marginBottom: "40px" }}>
                <Box sx={{ marginBottom: "11.5px" }}>
                    <Typography>School Address</Typography>
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
                        value={schoolAddress}
                        onChange={
                            (event: { 
                                target: { 
                                    value: string; 
                                }; 
                            }) => setSchoolAddress(event?.target.value)}
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
                            <Typography>School Contact Person</Typography>
                        </Box>
                        <Box sx={{ borderRadius: "10px" }}>
                            <TextField
                                sx={{
                                    width: "100%",
                                    borderRadius: "50px"
                                }}
                                inputProps={{
                                    sx: {
                                        borderRadius: "10px"
                                    }
                                }}
                                placeholder="Enter full name"
                                value={schoolContactPerson}
                                onChange={
                                    (event: { 
                                        target: { 
                                            value: string; 
                                        }; 
                                    }) => setSchoolContactPerson(event?.target.value)}
                            />
                        </Box>
                    </Box>
                    </Grid>
                    <Grid item lg={6}>
                    <Box sx={{ marginBottom: "21.5px" }}>
                        <Box sx={{ marginBottom: "11.5px" }}>
                            <Typography>Phone Number of Contact Person</Typography>
                        </Box>
                        <Box sx={{ borderRadius: "10px" }}>
                            <TextField
                                sx={{
                                    width: "100%",
                                    borderRadius: "50px"
                                }}
                                inputProps={{
                                    sx: {
                                        borderRadius: "10px"
                                    }
                                }}
                                placeholder="Enter phone number"
                                value={schoolContactPersonPhone}
                                onChange={
                                    (event: { 
                                        target: { 
                                            value: string; 
                                        }; 
                                    }) => setSchoolContactPersonPhone(event?.target.value)}
                            />
                        </Box>
                    </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ marginBottom: "80px" }}>
                <Box sx={{ display: "flex", alignItems: "center", color: "#007A27" }}>
                    <Add sx={{ marginRight: "10px" }}/>
                    <Typography sx={{ fontSize: "16px" }}>Add Orphan</Typography>
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
                                <SubmitOrphan />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            </Box>
        </Box>
    );
}

export default AddAnOrphanForm;