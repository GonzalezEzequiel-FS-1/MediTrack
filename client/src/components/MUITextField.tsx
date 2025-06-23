import { InputAdornment, Stack, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";

const MUITextField = () => {
  const [value, setValue] = useState("");
  return (
    <Stack spacing={4}>
      <Stack direction="row" spacing={2}>
        <TextField label="Outlined" variant="outlined" />
        <TextField label="Filled" variant="filled" />
        <TextField label="Standard" variant="standard" />
      </Stack>
      <Stack direction="row" spacing={2}>
        <TextField label="Small Secondary" size="small" color="secondary" />
      </Stack>
      <Stack direction="row" spacing={2}>
        <TextField
          label="Secondary Required"
          size="small"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          error={!value}
          color="secondary"
          helperText={!value ? "Required" : "Do not Share your password"}
          required
        />
        <TextField
          label="Type your Password"
          size="small"
          color="secondary"
          required
          type="password"
          helperText="Do not share your password with anyone"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <VisibilityIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField label="Read Only" InputProps={{ readOnly: true }} />
      </Stack>
      <Stack direction="row" spacing={2}>
        <TextField
          label="Weight"
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
            },
          }}
        />
        <TextField
          label="Ammount"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            },
          }}
        />
      </Stack>
    </Stack>
  );
};

export default MUITextField;
