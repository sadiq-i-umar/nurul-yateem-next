import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Grid,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { states_in_nigeria_dropdown } from "@/utils";
import { PhotoUploadFrame } from "@/components/common/image-frames";
import DragUpload from "@/components/drag-upload";
import LoaderBackdrop from "../../common/loader";
import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "@/config/FirebaseConfig"; // Adjust based on your Firebase config
import { createOrphan } from "@/src/app/api/orphan";

interface FormData {
  picture: string;
  gender: string;
  firstName: string;
  middleName: string;
  lastName: string;
  stateOfOrigin: string;
  localGovernment: string;
  dateOfBirth: string;
  inSchool: boolean;
  schoolName: string;
  schoolAddress: string;
  affidavitOfGuardianship: string;
  schoolContactPerson: string;
  schoolContactPhone: string;
}

interface AddAnOrphanFormProps {
  onSuccess: () => void;
}

const AddAnOrphanForm: React.FC<AddAnOrphanFormProps> = ({ onSuccess }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      picture: "",
      firstName: "",
      middleName: "",
      lastName: "",
      stateOfOrigin: "",
      localGovernment: "",
      dateOfBirth: "",
      schoolName: "",
      schoolAddress: "",
      affidavitOfGuardianship: "",
      schoolContactPerson: "",
      schoolContactPhone: "",
    },
  });

  const [image, setImage] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const [uploading, setUploading] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const [, setAffidavitUrl] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState<boolean>(false); // State to manage dialog visibility

  const [schoolName, setSchoolName] = useState<string>("");
  const [class_, setClass] = useState<string>("");
  const [schoolAddress, setSchoolAddress] = useState<string>("");

  const handleAffidavitUpload = (fileName: string, fileUrl: string) => {
    setAffidavitUrl(fileUrl);
    setValue("affidavitOfGuardianship", fileUrl);
  };

  const picture = watch("picture");

  const inSchool = watch("inSchool");

  const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadImageToFirebase(file);
    }
  };

  const uploadImageToFirebase = async (file: File) => {
    setUploading(true);
    const storageRef = ref(storage, `avatars/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      () => {},
      (error) => {
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setImage(downloadURL);
        setValue("picture", downloadURL, { shouldValidate: true }); // Ensure validation occurs here
        setUploading(false);
      },
    );
  };

  useEffect(() => {
    if (inSchool === false) {
      // Use strict comparison to boolean
      // Clear school-related fields when 'No' is selected
      setSchoolName("");
      setClass("");
      setSchoolAddress("");
      setValue("schoolName", ""); // Reset form fields
      setValue("schoolAddress", ""); // Reset form fields
    }
  }, [inSchool, setValue]); // Including setValue to avoid direct state manipulation

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const handleYesClick = async () => {
    handleSubmit(onSubmit)(); // Call onSubmit with form data
    setShowDialog(false); // Close the dialog
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!data.picture) {
      toast.error("Image is required.");
      return;
    }

    if (data.dateOfBirth) {
      data.dateOfBirth = dayjs(data.dateOfBirth).toISOString(); // Convert to ISO format
    }

    // Ensure inSchool is a boolean, handle string 'true' or 'false' values
    if (typeof data.inSchool === "string") {
      data.inSchool = data.inSchool === "true"; // Converts 'true' to true, anything else to false
    } else {
      data.inSchool = !!data.inSchool; // This ensures it is a boolean if it's already a boolean
    }

    try {
      setLoading(true);
      const response = await createOrphan(data);
      if (response.message) {
        toast.error("Failed to create orphan.");
      } else {
        toast.success("Orphan created successfully!");
        onSuccess(); // Notify parent component of success
      }
    } catch (error) {
      toast.error("An error occurred while creating orphan.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = () => {
    setShowDialog(true); // Show the confirmation dialog
  };

  return (
    <>
      {loading && <LoaderBackdrop />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center", // Centers horizontally
            alignItems: "center", // Centers vertically
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              padding: "24px",
              width: "100%",
              maxWidth: "800px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                marginBottom: "80px",
                alignItems: "center",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: "1px dashed #DFDFDF",
                  paddingX: "15px",
                  paddingY: "10px",
                  marginRight: "30px",
                }}
              >
                <Typography>Picture</Typography>
                <PhotoUploadFrame image={image || ""} />
                <Button
                  component="label"
                  variant="contained"
                  sx={{ width: "100%", borderRadius: "6px" }}
                >
                  Choose file
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    hidden
                    onChange={handleImageSelection}
                  />
                </Button>
                {errors.picture && (
                  <Typography component="p" color="error">
                    {errors.picture.message}
                  </Typography>
                )}
              </Box>
              <Box
                sx={{
                  marginTop: { xs: "20px", md: "-100px" },
                  width: { xs: "100%", sm: "320px" },
                }}
              >
                <Typography sx={{ color: "#676767" }}>
                  Svg, Png, Jpg are all allowed, and must not be more than 5MB
                </Typography>
              </Box>
            </Box>

            {/* Gender Selection */}
            <Grid container spacing={2}>
              <Grid item xs={12} lg={12}>
                <Controller
                  control={control}
                  name="gender"
                  defaultValue={gender}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          flexGrow: 1,
                          cursor: "pointer",
                          border: "1px solid",
                          paddingY: "5px",
                          paddingX: "10px",
                          borderRadius: "8px",
                          marginRight: "10px",
                          borderColor:
                            field.value === "MALE" ? "#268500" : "#D2D2D2",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FormControlLabel
                          value="MALE"
                          control={<Radio />}
                          label="Male"
                          sx={{
                            cursor: "pointer",
                            fontSize: "0.875rem",
                            margin: 0,
                          }}
                        />
                      </Box>

                      <Box
                        sx={{
                          flexGrow: 1, // Make the box take full width available
                          cursor: "pointer",
                          border: "1px solid",
                          paddingY: "5px",
                          paddingX: "16px",
                          borderRadius: "8px",
                          borderColor:
                            field.value === "FEMALE" ? "#268500" : "#D2D2D2",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FormControlLabel
                          value="FEMALE"
                          control={<Radio />}
                          label="Female"
                          sx={{
                            cursor: "pointer",
                            fontSize: "0.875rem",
                            margin: 0,
                          }}
                        />
                      </Box>
                    </RadioGroup>
                  )}
                  rules={{ required: "Gender is required" }}
                />
                {errors.gender && (
                  <Typography color="error">{errors.gender.message}</Typography>
                )}
              </Grid>
            </Grid>

            <Box sx={{ marginTop: 3 }} />

            {/* Name Inputs */}
            <Grid container spacing={2}>
              <Grid item xs={12} lg={4}>
                <Controller
                  control={control}
                  name="firstName"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="First Name"
                      placeholder="Enter First Name"
                      fullWidth
                      error={!!errors.firstName}
                      helperText={
                        errors.firstName ? "First Name is required" : ""
                      }
                      sx={{ borderRadius: "10px" }}
                    />
                  )}
                  rules={{ required: "First Name is required" }}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <Controller
                  control={control}
                  name="middleName"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Middle Name"
                      placeholder="Enter Middle Name"
                      fullWidth
                      error={!!errors.middleName}
                      helperText={
                        errors.middleName ? "Middle Name is required" : ""
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <Controller
                  control={control}
                  name="lastName"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Last Name"
                      placeholder="Enter Last Name"
                      fullWidth
                      error={!!errors.lastName}
                      helperText={
                        errors.lastName ? "Last Name is required" : ""
                      }
                      sx={{ borderRadius: "10px" }}
                    />
                  )}
                  rules={{ required: "Last Name is required" }}
                />
              </Grid>
            </Grid>

            <Box sx={{ marginTop: 3 }} />

            {/* State of Origin and LGA */}
            <Grid container spacing={2}>
              <Grid item lg={6}>
                <Controller
                  control={control}
                  name="stateOfOrigin"
                  render={({ field }) => (
                    <Select
                      {...field}
                      fullWidth
                      displayEmpty
                      error={!!errors.stateOfOrigin}
                      value={field.value || ""} // Ensure controlled state
                    >
                      <MenuItem value="" disabled>
                        -- Select --
                      </MenuItem>
                      {states_in_nigeria_dropdown.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  rules={{ required: "State of Origin is required" }}
                />
                {errors.stateOfOrigin && (
                  <Typography component="p" color="error">
                    {errors.stateOfOrigin.message}
                  </Typography>
                )}
              </Grid>
              <Grid item lg={6}>
                <Controller
                  control={control}
                  name="localGovernment"
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="LGA"
                      placeholder="Enter LGA"
                      fullWidth
                      error={!!errors.localGovernment}
                      helperText={
                        errors.localGovernment
                          ? "Local government area is required"
                          : ""
                      }
                      sx={{ borderRadius: "10px" }}
                    />
                  )}
                  rules={{ required: "Local government area is required" }}
                />
              </Grid>
            </Grid>

            <Box sx={{ marginTop: 3 }} />

            {/* Date of Birth */}
            <Box sx={{ marginBottom: "20px" }}>
              <Typography>Date of Birth</Typography>
              <Controller
                control={control}
                name="dateOfBirth"
                rules={{ required: "Date of Birth is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="date"
                    fullWidth
                    error={!!errors.dateOfBirth}
                    helperText={
                      errors.dateOfBirth ? "Date of Birth is required" : ""
                    }
                    sx={{ borderRadius: "10px" }}
                  />
                )}
              />
            </Box>

            {/* Document Upload */}
            <Box sx={{ marginBottom: "40px" }}>
              <DragUpload
                title="Affidavit of Guardianship"
                subtitle="Drag and Drop Document"
                onFileUpload={handleAffidavitUpload}
              />
            </Box>

            {/* School Status */}
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <Controller
                  control={control}
                  name="inSchool"
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between", // Ensure equal spacing between buttons
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          flexGrow: 1, // Make the box take full width available
                          cursor: "pointer",
                          border: "1px solid",
                          paddingY: "5px", // Adjust padding
                          paddingX: "10px", // Adjust padding
                          borderRadius: "8px",
                          marginRight: "10px", // Reduce spacing between buttons
                          borderColor:
                            String(field.value) == "true"
                              ? "#268500"
                              : "#D2D2D2",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FormControlLabel
                          value="true"
                          control={<Radio />}
                          label="In School"
                          sx={{
                            cursor: "pointer",
                            fontSize: "0.875rem",
                            margin: 0,
                          }}
                        />
                      </Box>

                      <Box
                        sx={{
                          flexGrow: 1, // Make the box take full width available
                          cursor: "pointer",
                          border: "1px solid",
                          paddingY: "5px",
                          paddingX: "16px",
                          borderRadius: "8px",
                          borderColor:
                            String(field.value) == "false"
                              ? "#268500"
                              : "#D2D2D2",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FormControlLabel
                          value="false"
                          control={<Radio />}
                          label="Not in School"
                          sx={{
                            cursor: "pointer",
                            fontSize: "0.875rem",
                            margin: 0,
                          }}
                        />
                      </Box>
                    </RadioGroup>
                  )}
                  rules={{ required: "Please select the school status" }}
                />
                {errors.inSchool && (
                  <Typography component="p" color="error">
                    {errors.inSchool.message}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Box sx={{ marginTop: 3 }} />

            {/* Conditional Rendering for School Info */}
            {typeof inSchool === "boolean"
              ? inSchool === true
              : inSchool === "true" && (
                  <Grid container spacing={3}>
                    {" "}
                    {/* Increased spacing between the fields */}
                    {/* School Name */}
                    <Grid item lg={12} xs={12}>
                      <Controller
                        control={control}
                        name="schoolName"
                        defaultValue=""
                        rules={{ required: "School Name is required" }}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            label="School Name"
                            placeholder="Enter School Name"
                            fullWidth
                            error={!!error}
                            helperText={error ? error.message : ""}
                            sx={{ borderRadius: "10px" }}
                          />
                        )}
                      />
                    </Grid>
                    {/* Class */}
                    <Grid item lg={6} xs={12}>
                      <Controller
                        control={control}
                        name="schoolContactPerson"
                        defaultValue=""
                        rules={{
                          required: "School contact person is required",
                        }}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            label="School Contact Person"
                            placeholder="Enter Contact Person Name"
                            fullWidth
                            error={!!error}
                            helperText={error ? error.message : ""}
                            sx={{ borderRadius: "10px" }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                      <Controller
                        control={control}
                        name="schoolContactPhone"
                        defaultValue=""
                        rules={{ required: "School contact phone is required" }}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            label="School Contact Phone"
                            placeholder="Enter Contact Phone Number"
                            fullWidth
                            error={!!error}
                            helperText={error ? error.message : ""}
                            sx={{ borderRadius: "10px" }}
                            type="tel" // To specify it's a phone number field
                          />
                        )}
                      />
                    </Grid>
                    {/* School Address */}
                    <Grid item lg={12} xs={12}>
                      <Controller
                        control={control}
                        name="schoolAddress"
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="School Address"
                            placeholder="Enter School Address"
                            fullWidth
                            multiline
                            rows={4}
                            sx={{ borderRadius: "10px" }}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                )}

            {/* Submit Button */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                marginY: "16px",
              }}
            >
              <Button
                variant="contained"
                onClick={handleFormSubmit}
                disabled={uploading}
                sx={{
                  width: "80%",
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
        <Dialog open={showDialog} onClose={handleDialogClose}>
          <DialogTitle sx={{ marginTop: "10px" }}>
            <Typography
              sx={{ color: "#39353D", fontWeight: "bold", fontSize: "24px" }}
            >
              Confirm Submission
            </Typography>
          </DialogTitle>
          <DialogContent>
            Before submitting the orphan's details, please ensure all the
            information is correct.
          </DialogContent>
          <DialogActions sx={{ marginBottom: "10px" }}>
            <Button
              sx={{ color: "#39353D", textTransform: "none" }}
              onClick={handleDialogClose}
            >
              No, Cancel
            </Button>
            <Button
              variant="contained"
              disabled={uploading || loading}
              sx={{ textTransform: "none" }}
              onClick={handleYesClick}
            >
              Yes, Submit
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </>
  );
};

export default AddAnOrphanForm;
