import React from "react";
import { Box, MenuItem, Select, FormControl, TextField } from "@mui/material";

const SearchAndSortPanel = ({
  search,
  handleSearch,
  sortBy,
  handleChangeSort,
}) => {
  return (
    <Box
      sx={{
        mt: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        mb: 1,
      }}
    >
      <FormControl sx={{ flex: 1, mr: 4 }}>
        <TextField
          label="Пошук по назві лоту"
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            mt: 1,
            mb: 2,
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
          }}
          value={search}
          onChange={handleSearch}
        />
      </FormControl>
      <FormControl sx={{ minWidth: 120 }}>
        <Select
          labelId="sort-label"
          id="sort-select"
          value={sortBy}
          onChange={handleChangeSort}
          displayEmpty
          sx={{
            border: "none",
            borderRadius: 30,
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <MenuItem value="">Без сортування</MenuItem>
          <MenuItem value="price_asc">Поточна ціна: за зростанням</MenuItem>
          <MenuItem value="price_desc">Поточна ціна: за спаданням</MenuItem>
          <MenuItem value="created_asc">Дата: за зростанням</MenuItem>
          <MenuItem value="created_desc">Дата: за спаданням</MenuItem>
          <MenuItem value="end_asc">Кінець лоту: за зростанням</MenuItem>
          <MenuItem value="end_desc">Кінець лоту: за спаданням</MenuItem>
          <MenuItem value="buy_now_asc">Купити відразу: за зростанням</MenuItem>
          <MenuItem value="buy_now_desc">Купити відразу: за спаданням</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SearchAndSortPanel;
