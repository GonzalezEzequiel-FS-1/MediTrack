import {
  Box,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import React, { useState } from "react";

export default function RadialButton() {
  const [value, setValue] = useState<string>(""); // or "0-2" if you want to preselect

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.value;
    setValue(selected);
    console.log(selected);
  };

  return (
    <Box>
      <FormControl>
        <FormLabel id="jobExperience">Years of experience</FormLabel>

        <RadioGroup value={value} onChange={handleChange}>
          <FormControlLabel value="0-2" control={<Radio />} label="0-2" />
          <FormControlLabel value="3-5" control={<Radio />} label="3-5" />
          <FormControlLabel value="6-10" control={<Radio />} label="6-10" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
