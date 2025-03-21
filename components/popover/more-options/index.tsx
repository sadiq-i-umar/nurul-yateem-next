import { List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { MoreOptionsPopoverContentProps } from "../types";

const MoreOptionsPopoverContent: React.FC<MoreOptionsPopoverContentProps> = ({
  options,
  itemClick,
}) => {
  return (
    <List sx={{ color: "#475367", fontWeight: 400, fontSize: "14px" }}>
      {options?.map((item) => (
        <ListItem
          key={item.name}
          component="button"
          sx={{
            "&:hover": { color: "#0035C3" },
          }}
          onClick={() => {
            item.onClick();
            itemClick();
          }}
        >
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default MoreOptionsPopoverContent;
