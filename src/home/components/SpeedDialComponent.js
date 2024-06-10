import React from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

const SpeedDialComponent = ({ actions }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: "fixed", bottom: 16, right: 16 }}
      icon={<AddIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => {
            action.onClick();
            handleClose();
          }}
        />
      ))}
    </SpeedDial>
  );
};

export default SpeedDialComponent;
