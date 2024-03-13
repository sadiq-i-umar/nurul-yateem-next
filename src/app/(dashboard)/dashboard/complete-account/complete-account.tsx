"use client";

import { LogoImageFrame, ProfileImageFrame } from "../../../../../components/common/image-frames";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import PersonalInformationTab from "../../../../../components/personal-information-tab";
import OccupationTab from "../../../../../components/occupation-tab";
import IdentityTab from "../../../../../components/identity-tab";
import ProfileSubmitSuccess from "../../../../../components/profile-submit-success";
import { ArrowLeft } from "@mui/icons-material";
import { Identity, Occupation, PersonalInformation } from "../../../../../utils/interfaces";
import { Loader } from "../../../../../components/common/loader";

const CompleteAccount: React.FC = () => {

    localStorage.clear();

    const [activeTab, setActiveTab] = useState(0);
    const [ isLoading, setIsLoading ] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    let image: { url: string | null; file?: any } | undefined;
    let gender : string | null | undefined;
    let dob: string | undefined;
    let maritalStatus : string | null | undefined;
    let phone : string | null | undefined;
    let altPhone : string | null | undefined;
    let homeAddress : string | null | undefined;
    let stateOfOrigin : string | null | undefined;
    let lga : string | null | undefined;

    let employmentStatus : string | null | undefined;
    let natureOfJob : string | null | undefined;
    let annualIncome : string | null | undefined;
    let employerName : string | null | undefined;
    let employerPhone : string | null | undefined;
    let employerAddress : string | null | undefined;

    let meansOfIdentification : string | null | undefined;
    let identificationNumber : string | null | undefined;

    const handleNextClick = () => {
        setActiveTab(activeTab+1)
    };

    const handleSubmitClick = () => {
        setIsLoading(true)
        setTimeout( () => {
            setIsLoading(false)
            setShowSuccessMessage(true)
        }, 4000);
    };

    const handleDataFromTabOne = (personalInfo: PersonalInformation | undefined) => {
        image = personalInfo?.image
        gender = personalInfo?.gender 
        if (personalInfo?.dob != undefined) {
            dob = personalInfo?.dob
        }
        maritalStatus = personalInfo?.maritalStatus
        phone = personalInfo?.phone
        altPhone = personalInfo?.altPhone
        homeAddress = personalInfo?.homeAddress
        stateOfOrigin = personalInfo?.stateOfOrigin
        lga = personalInfo?.lga
        console.log("Data from Tab One: ", image?.url, gender, dob, maritalStatus, phone, altPhone, homeAddress, stateOfOrigin, lga)
        handleNextClick()
    }

    const handleDataFromTabTwo = (occupation: Occupation | undefined) => {
        employmentStatus = occupation?.employmentStatus
        natureOfJob = occupation?.natureOfJob
        annualIncome = occupation?.annualIncome
        employerName = occupation?.employerName
        employerPhone = occupation?.employerPhone
        employerAddress = occupation?.employerAddress
        console.log("Data from Tab Two: ", employmentStatus, natureOfJob, annualIncome, employerName, employerPhone, employerAddress)
        handleNextClick()
    }

    const handleDataFromTabThree = (identity: Identity | undefined) => {
        meansOfIdentification = identity?.meansOfIdentification
        identificationNumber = identity?.identificationNumber
        console.log("Data from Tab Three: ", meansOfIdentification, identificationNumber)
        handleSubmitClick()
    }

    return (
        <>
        <Box sx={{ ...(isLoading ? {display: "block"} : {display: "none"})}}>
            <Loader />
        </Box>
        <Box>
            <Box sx={{ display: "flex", paddingTop: "30px", paddingBottom: "20px", paddingX: {xs: "10px", sm: "40px", md: "80px"}, alignItems: "center", borderBottom: "1px solid #DFDFDF", position: "sticky", top: 0, backgroundColor: "white", zIndex: 1, flexDirection: {xs: "column", sm: "row"} }}>
                <Box>
                    <LogoImageFrame image={"/nurul_yateem_logo.png"}/>
                </Box>
                <Box sx={{ flexGrow: 1, ...(showSuccessMessage ? { display: "none" } : {display: "flex"}), flexDirection: "column", alignItems: "center", justifyContent: "center", marginX: "30px", marginTop: {xs: "20px", sm: "0px"} }}>
                    <Box sx={{ marginBottom: "20px", textAlign: 'center' }}>
                        <Typography variant="h1" sx={{ fontSize: "20px", display: {xs: "block", sm: "none"} }}>Complete your Account Setup</Typography>
                        <Typography variant="h1" sx={{ display: {xs: "none", sm: "block"} }}>Complete your Account Setup</Typography>
                    </Box>
                    <Box sx={{ textAlign: "center", marginBottom: {xs: "10px", sm: "none"} }}>
                        <Typography sx={{ color: "#8D8B90", display: {xs: "none", sm: "block"} }}>Follow the sample guide to create your account</Typography>
                        <Typography sx={{ color: "#8D8B90", fontSize: "14px", display: {xs: "block", sm: "none"} }}>Follow the sample guide to create your account</Typography>
                    </Box>
                </Box>
                <Box sx={{ ...(showSuccessMessage ? { display: "none" } : {display: "flex"}), alignItems: "center" }}>
                    <Box sx={{ marginRight: "15px" }}>
                        <Typography>Welcome, Sadiq Umar</Typography>
                    </Box>
                    <Box>
                        <ProfileImageFrame initials={"SU"}/>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ ...(showSuccessMessage ? { display: "block" } : {display: "none"}), paddingTop: "100px" }}>
                <ProfileSubmitSuccess />
            </Box>
            <Grid sx={{ ...(showSuccessMessage ? { display: "none" } : {display: "block"}) }} container>
            <Grid sx={{ display: {xs: "none", sm: "block"}, position: "fixed", height: "100vh", borderRight: "1px solid #DFDFDF", paddingRight: {xs: "250px", md: "330px"} }} item xs={0.5} sm={1} md={2} lg={3}>
            <Box sx={{ paddingTop: "0px", paddingBottom: "25px", borderLeft: "3px solid #E9F3E6", marginLeft: {xs: "20px", md: "90px"}, marginRight: "30px",   marginY: "30px" }}>
                <Box sx={{ display: "flex", alignItems: "center", marginBottom: "50px", marginLeft: "-7.5px" }}>
                    <Box sx={{ marginRight: "15px" }}>
                        <Box
                            sx={{ 
                                ...(activeTab == 0 ? {backgroundColor: "primary.main"} : {backgroundColor: "#AEAEAE"}),
                                width: "14px",
                                height: "14px",
                                borderRadius: "50%"
                             }}
                        />
                    </Box>
                    <Box sx={{ marginRight: "20px" }}>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "15px", borderRadius: "50%", ...(activeTab == 0 ? {bgcolor: "#E9F3E6", fill: "#268600"} : {bgcolor: "#F5F5F5", fill: "#676767"} )}}>
                            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 18C1.5 18 0 18 0 16.5C0 15 1.5 10.5 9 10.5C16.5 10.5 18 15 18 16.5C18 18 16.5 18 16.5 18H1.5ZM9 9C10.1935 9 11.3381 8.52589 12.182 7.68198C13.0259 6.83807 13.5 5.69347 13.5 4.5C13.5 3.30653 13.0259 2.16193 12.182 1.31802C11.3381 0.474106 10.1935 0 9 0C7.80653 0 6.66193 0.474106 5.81802 1.31802C4.97411 2.16193 4.5 3.30653 4.5 4.5C4.5 5.69347 4.97411 6.83807 5.81802 7.68198C6.66193 8.52589 7.80653 9 9 9Z"/>
                            </svg>
                        </Box>
                    </Box>
                    <Box>
                        <Box><Typography sx={{ fontWeight: "bold" }}>Personal Information</Typography></Box>
                        <Box><Typography sx={{ color: "#8D8B90" }}>Fill in your personal details</Typography></Box>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", marginBottom: "50px", marginLeft: "-7.5px" }}>
                    <Box sx={{ marginRight: "15px" }}>
                        <Box
                            sx={{ 
                                ...(activeTab == 1 ? {backgroundColor: "primary.main"} : {backgroundColor: "#AEAEAE"}),
                                width: "14px",
                                height: "14px",
                                borderRadius: "50%"
                             }}
                        />
                    </Box>
                    <Box sx={{ marginRight: "20px" }}>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "15px", borderRadius: "50%", ...(activeTab == 1 ? {bgcolor: "#E9F3E6", fill: "#268600"} : {bgcolor: "#F5F5F5", fill: "#676767"} )}}>
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 6V5H14V6H16V5C15.9995 4.46973 15.7886 3.96133 15.4136 3.58637C15.0387 3.21141 14.5303 3.00053 14 3H10C9.46973 3.00053 8.96133 3.21141 8.58637 3.58637C8.21141 3.96133 8.00053 4.46973 8 5V6H10Z" />
                                <path opacity="0.25" d="M9 15C8.73478 15 8.48043 14.8946 8.29289 14.7071C8.10536 14.5196 8 14.2652 8 14V12C8 11.7348 8.10536 11.4804 8.29289 11.2929C8.48043 11.1054 8.73478 11 9 11C9.26522 11 9.51957 11.1054 9.70711 11.2929C9.89464 11.4804 10 11.7348 10 12V14C10 14.2652 9.89464 14.5196 9.70711 14.7071C9.51957 14.8946 9.26522 15 9 15ZM15 15C14.7348 15 14.4804 14.8946 14.2929 14.7071C14.1054 14.5196 14 14.2652 14 14V12C14 11.7348 14.1054 11.4804 14.2929 11.2929C14.4804 11.1054 14.7348 11 15 11C15.2652 11 15.5196 11.1054 15.7071 11.2929C15.8946 11.4804 16 11.7348 16 12V14C16 14.2652 15.8946 14.5196 15.7071 14.7071C15.5196 14.8946 15.2652 15 15 15Z" />
                                <path opacity="0.5" d="M20 6H4C3.46957 6 2.96086 6.21071 2.58579 6.58579C2.21071 6.96086 2 7.46957 2 8V11C2 11.5304 2.21071 12.0391 2.58579 12.4142C2.96086 12.7893 3.46957 13 4 13H8V12C8 11.7348 8.10536 11.4804 8.29289 11.2929C8.48043 11.1054 8.73478 11 9 11C9.26522 11 9.51957 11.1054 9.70711 11.2929C9.89464 11.4804 10 11.7348 10 12V13H14V12C14 11.7348 14.1054 11.4804 14.2929 11.2929C14.4804 11.1054 14.7348 11 15 11C15.2652 11 15.5196 11.1054 15.7071 11.2929C15.8946 11.4804 16 11.7348 16 12V13H20C20.5304 13 21.0391 12.7893 21.4142 12.4142C21.7893 12.0391 22 11.5304 22 11V8C22 7.46957 21.7893 6.96086 21.4142 6.58579C21.0391 6.21071 20.5304 6 20 6Z" />
                                <path d="M20 13H16V14C16 14.2652 15.8946 14.5196 15.7071 14.7071C15.5196 14.8946 15.2652 15 15 15C14.7348 15 14.4804 14.8946 14.2929 14.7071C14.1054 14.5196 14 14.2652 14 14V13H10V14C10 14.2652 9.89464 14.5196 9.70711 14.7071C9.51957 14.8946 9.26522 15 9 15C8.73478 15 8.48043 14.8946 8.29289 14.7071C8.10536 14.5196 8 14.2652 8 14V13H4C3.46957 13 2.96086 12.7893 2.58579 12.4142C2.21071 12.0391 2 11.5304 2 11V19C2 19.5304 2.21071 20.0391 2.58579 20.4142C2.96086 20.7893 3.46957 21 4 21H20C20.5304 21 21.0391 20.7893 21.4142 20.4142C21.7893 20.0391 22 19.5304 22 19V11C22 11.5304 21.7893 12.0391 21.4142 12.4142C21.0391 12.7893 20.5304 13 20 13Z" />
                            </svg>
                        </Box>
                    </Box>
                    <Box>
                        <Box><Typography sx={{ fontWeight: "bold" }}>Occupation</Typography></Box>
                        <Box><Typography sx={{ color: "#8D8B90" }}>Your means of identification</Typography></Box>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", marginLeft: "-7.5px" }}>
                    <Box sx={{ marginRight: "15px" }}>
                        <Box
                            sx={{ 
                                ...(activeTab == 2 ? {backgroundColor: "primary.main"} : {backgroundColor: "#AEAEAE"}),
                                width: "14px",
                                height: "14px",
                                borderRadius: "50%"
                             }}
                        />
                    </Box>
                    <Box sx={{ marginRight: "20px" }}>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "15px", borderRadius: "50%", ...(activeTab == 2 ? {bgcolor: "#E9F3E6", fill: "#268600", stroke: "#268600"} : {bgcolor: "#F5F5F5", fill: "#676767", stroke: "#676767"} ) }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 8V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8M4 16V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H8M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V8M16 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V16M7 12H17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </Box>
                    </Box>
                    <Box>
                        <Box><Typography sx={{ fontWeight: "bold" }}>Identity</Typography></Box>
                        <Box><Typography>Add an orphan profile</Typography></Box>
                    </Box>
                </Box>
            </Box>
            </Grid>
            <Grid container lg={12}>
            <Grid item xs={0} sm={5} md={4} lg={3}></Grid>
            <Grid sx={{ paddingLeft: {xs: "40px", sm: "50px"}, paddingRight: {xs: "40px", md: "200px"}, paddingTop: "40px" }} item xs={12} sm={7} md={8} lg={9}>
                {activeTab == 0 && <PersonalInformationTab onNextClick={handleDataFromTabOne}/>}
                {activeTab == 1 && <OccupationTab onNextClick={handleDataFromTabTwo}/>}
                {activeTab == 2 && <IdentityTab onSubmitClick={handleDataFromTabThree}/>}
                {activeTab == 1 && <Box sx={{ display: "block", marginBottom: "30px" }}>
                    <Button onClick={() => setActiveTab(activeTab-1)} variant="outlined" sx={{ boxShadow: "none", width: "100%", borderRadius: "6px", textTransform: "none", paddingY: "10px", paddingX: "70px", marginTop: {xs: "-70px", sm: "-100px"} }}>
                            <ArrowLeft />
                            Back to Step 1: Personal Information
                    </Button>
                </Box>}
                {activeTab == 2 && <Box sx={{ display: "block", marginBottom: "30px" }}>
                    <Button onClick={() => setActiveTab(activeTab-1)} variant="outlined" sx={{ boxShadow: "none", width: "100%", borderRadius: "6px", textTransform: "none", paddingY: "10px", paddingX: "70px", marginTop: { xs: "-80px", sm: "-110px"} }}>
                            <ArrowLeft />
                            Back to Step 2: Occupation
                    </Button>
                </Box>}
            </Grid>
            </Grid>
            </Grid>
        </Box>
        </>
    );
}

export default CompleteAccount;