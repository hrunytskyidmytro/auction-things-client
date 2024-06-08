import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Typography,
} from "@mui/material";

const StepList = ({ steps }) => {
  return (
    <Paper elevation={5} sx={{ p: 2, mt: 2 }} id="registration">
      <Typography variant="h4" component="h2" align="center" sx={{ mt: 6 }}>
        Як це працює?
      </Typography>
      <List>
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText primary={step.primary} secondary={step.secondary} />
            </ListItem>
            {index < steps.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default StepList;
