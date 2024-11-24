import React, { useState } from "react";
import { Modal, Box, Typography, Checkbox, FormControlLabel, Select, MenuItem, Button } from "@mui/material";

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void; 
}

const FilterModal: React.FC<FilterModalProps> = ({ open, onClose, onApplyFilters }) => {
  const [status, setStatus] = useState<string[]>([]);
  const [schoolStatus, setSchoolStatus] = useState<string[]>([]);
  const [stateOfOrigin, setStateOfOrigin] = useState<string>("");

 
  const  handleCheckboxChange = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
  setter((prev) => (prev.includes(value) ? [] : [value])); 
};


  const handleApplyFilters = () => {
    onApplyFilters({ status, schoolStatus, stateOfOrigin });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 250,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
          borderRadius: "8px",
        }}
      >
        <Typography sx={{ mb: 2 ,textSize : '14px'}}>
          Filter by:
        </Typography>

        {/* Status Filters */}
<Typography sx={{ mb: 1 }}>Status</Typography>
{["Approved", "Pending", "Rejected"].map((item, index) => (
  <FormControlLabel
    key={index}
    control={
      <Checkbox
        checked={status.includes(item)}
        onChange={() => handleCheckboxChange(setStatus, item)}
        sx={{
          color: "lightgreen", 
          '&.Mui-checked': {
            color: "green", 
            },
        }}
      />
    }
    label={`${item}`}
  />
))}


        <Typography sx={{ mt: 2, mb: 1  }}>School Status</Typography>
        {["In School", "Not in School"].map((item, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={schoolStatus.includes(item)}
                onChange={() => handleCheckboxChange(setSchoolStatus, item)}
                 sx={{
          color: "lightgreen", 
          '&.Mui-checked': {
            color: "green", 
            },
        }}
              />
            }
            label={`${item}`}
          />
        ))}

        <Typography sx={{ mt: 2, mb: 1 }}>State of Origin</Typography>
        <Select
          value={stateOfOrigin}
          onChange={(e) => setStateOfOrigin(e.target.value)}
                  fullWidth
                  sx={{ height : "40px" }}
        >
          <MenuItem value="">Select</MenuItem>
          {["Lagos", "Abuja", "Kano", "Enugu"].map((state, index) => (
            <MenuItem  key={index} value={state}>
              {state}
            </MenuItem>
          ))}
        </Select>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FilterModal;
