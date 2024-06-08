import React from "react";
import { Box, Pagination } from "@mui/material";

const PaginationSection = ({ totalPages, page, handleChangePage }) => {
  return (
    <Box
      sx={{
        mt: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChangePage}
        variant="outlined"
        color="primary"
      />
    </Box>
  );
};

export default PaginationSection;
