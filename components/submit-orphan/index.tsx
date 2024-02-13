import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useState } from "react";

const SubmitOrphan: React.FC = () => {

    const [ showDialog, setShowDialog ] = useState(false);

    return (
        <>
            <Button 
                onClick={() => setShowDialog(true)}
                variant="contained" 
                sx={{ 
                    boxShadow: "none", 
                    width: "100%", 
                    borderRadius: "6px", 
                    textTransform: "none", 
                    paddingY: "10px", 
                    paddingX: "70px",
            }}>
                    Next
            </Button>

            <Dialog open={showDialog}>
                <DialogTitle sx={{ marginTop: "10px" }}>
                    <Typography sx={{ color: "#39353D", fontWeight: "bold", fontSize: "24px" }}>Application</Typography>
                </DialogTitle>
                <DialogContent>
                    Before submitting your Application, Make sure to verify every data is correct, if not you might be denied an approval.
                </DialogContent>
                <DialogActions sx={{ marginBottom: "10px" }}>
                    <Button sx={{ color: "#39353D", textTransform: "none" }} onClick={() => setShowDialog(false)}>
                        No, Cancel
                    </Button>
                    <Button variant="contained" sx={{ textTransform: "none" }} onClick={() => setShowDialog(false)}>
                        Yes, Continue
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default SubmitOrphan;