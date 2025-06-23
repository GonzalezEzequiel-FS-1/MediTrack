import { Box, TextField, MenuItem, Menu } from "@mui/material";
import React, { useState } from "react";

const MUISelect = () => {
  const [countries, setCountries] = useState([]);
  const handleChange = (e: any) => {
    setCountries(e.target.value);
    console.log(countries);
  };
  return (
    <Box width="200px">
      <TextField
        label="Select Country"
        select
        value={countries}
        onChange={handleChange}
        fullWidth
        SelectProps={{
          multiple: true,
        }}
      >
        <MenuItem value="IN">India</MenuItem>
        <MenuItem value="US">USA</MenuItem>
        <MenuItem value="AU">Australia</MenuItem>
      </TextField>
    </Box>
  );
};

export default MUISelect;
