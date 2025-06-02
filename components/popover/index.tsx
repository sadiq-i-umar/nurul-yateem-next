import { Popover as MuiPopover } from "@mui/material";
import React, { useState } from "react";
import MoreOptionsPopoverContent from "./more-options";
import { PopoverProps } from "./types";

const Popover: React.FC<PopoverProps> = (props) => {
  const { getTriggerButtonClick, triggerButton, moreOptions, onCloseAction } =
    props;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    getTriggerButtonClick?.();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    onCloseAction?.();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      {React.cloneElement(triggerButton as React.ReactElement, {
        onClick: handleButtonClick,
      })}
      <MuiPopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MoreOptionsPopoverContent
          options={moreOptions}
          itemClick={handleClose}
          dataToReturnOnItemClick={props.dataToReturnOnItemClick}
        />
      </MuiPopover>
    </>
  );
};

export default Popover;
