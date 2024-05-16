import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Stack } from "@mui/material";

const NewLot = () => {
  const [lotPosition, setLotPosition] = useState({
    name: "",
    description: "",
    capacity: "",
    startTime: "",
    endTime: "",
  });

  const handleInputChange = (e) => {
    setLotPosition({
      ...lotPosition,
      [e.target.name]: e.target.value,
    });
  };

//   const handleTimeChange = (name, newValue) => {
//     setLotPosition({
//       ...lotPosition,
//       [name]: newValue,
//     });
//   };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", lotPosition);
  };

  return (
    <>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{
          mt: 15,
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={lotPosition.name}
            onChange={handleInputChange}
            required
            margin="normal"
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={lotPosition.description}
            onChange={handleInputChange}
            required
            margin="normal"
            fullWidth
          />
          <FormControl margin="normal" fullWidth>
            <InputLabel id="capacity-label">Capacity</InputLabel>
            <Select
              labelId="capacity-label"
              name="capacity"
              value={lotPosition.capacity}
              onChange={handleInputChange}
              required
            >
              <MenuItem value="">Select capacity</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="More Info"
            name="Info"
            value={lotPosition.name}
            onChange={handleInputChange}
            required
            margin="normal"
            fullWidth
          />
          <br />
          <br />
          <TextField
            label="Description"
            multiline
            rows={4}
            defaultValue="Your Description"
            variant="filled"
            fullWidth
          />
          <br />
          <br />
          <Button type="submit" variant="contained" color="primary">
            Create Lot Position
          </Button>
        </form>
      </Stack>
    </>
  );
};

export default NewLot;
