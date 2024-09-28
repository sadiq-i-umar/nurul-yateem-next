import { Box, MenuItem, Select } from "@mui/material";

export const MonthsSelectOnlyInputBox: React.FC<{ placeholder: string }> = ({
  placeholder,
}) => {
  return (
    <Box>
      <Select
        value={placeholder}
        sx={{
          borderRadius: "10px",
          width: "100%",
          fontSize: "11px",
          fontWeight: "900",
          color: "#18181B",
          border: "1px solid #A1A1AA",
          padding: "-10px",
        }}
        inputProps={{
          sx: {},
        }}
      >
        <MenuItem value={placeholder} disabled>
          {placeholder}
        </MenuItem>
      </Select>
    </Box>
  );
};
