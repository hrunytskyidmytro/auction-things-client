import React from "react";
import {
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  Box,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link as RouterLink } from "react-router-dom";

const Breadcrumbs = ({ links }) => {
  return (
    <Box mt={5}>
      <MuiBreadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {links.map((link, index) => (
          <Link
            key={index}
            underline="hover"
            color="inherit"
            component={RouterLink}
            to={link.url}
          >
            {link.label}
          </Link>
        ))}
      </MuiBreadcrumbs>
    </Box>
  );
};

export default Breadcrumbs;
