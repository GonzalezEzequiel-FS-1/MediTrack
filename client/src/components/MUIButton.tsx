import {
  Stack,
  IconButton,
  Button,
  ButtonGroup,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import { Form } from "react-router-dom";
const MUIButton = () => {
  const [format, setFormat] = useState<string[] | null>(null);
  const handleFormatChange = (
    _event: React.MouseEvent<HTMLElement>,
    updatedFormats: string[] | null
  ) => {
    setFormat(updatedFormats);
    console.log(format);
  };
  return (
    <Stack spacing={4}>
      <Stack spacing={2} direction="row">
        <Button variant="text" href="https://www.google.com">
          Text
        </Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>
      <Stack spacing={2} direction="row">
        <Button variant="contained" color="primary">
          Primary
        </Button>
        <Button variant="contained" color="secondary">
          Secondary
        </Button>
        <Button variant="contained" color="error">
          Error
        </Button>
        <Button variant="contained" color="warning">
          Warning
        </Button>
        <Button variant="contained" color="info">
          Info
        </Button>
        <Button variant="contained" color="success">
          success
        </Button>
      </Stack>
      <Stack display="block" spacing={2} direction="row">
        <Button variant="contained" size="small">
          Small
        </Button>
        <Button variant="contained" size="medium">
          Medium
        </Button>
        <Button variant="contained" size="large">
          Large
        </Button>
      </Stack>
      <Stack spacing={2} direction="row">
        <Button variant="contained" startIcon={<SendIcon />}>
          SEND
        </Button>
        <Button
          disableRipple
          disableElevation
          onClick={() => alert("Testing")}
          variant="contained"
          endIcon={<SendIcon />}
        >
          SEND
        </Button>
        <IconButton aria-label="Send Button" color="success" size="small">
          <SendIcon />
        </IconButton>
      </Stack>
      <Stack direction="row">
        <ButtonGroup
          variant="outlined"
          orientation="vertical"
          size="small"
          color="secondary"
          aria-label="Button Group"
        >
          <Button onClick={() => alert("Left Click")}>Left</Button>
          <Button onClick={() => alert("Center Click")}>Center</Button>
          <Button onClick={() => alert("Right Click")}>Right</Button>
        </ButtonGroup>
      </Stack>
      <Stack direction="row">
        <ToggleButtonGroup
          size="large"
          color="success"
          value={format}
          onChange={handleFormatChange}
          aria-label="text formatting"
          exclusive
        >
          <ToggleButton value="bold" aria-label="bold">
            <FormatBoldIcon />
          </ToggleButton>
          <ToggleButton value="italic" aria-label="italic">
            <FormatItalicIcon />
          </ToggleButton>
          <ToggleButton value="underlined" aria-label="underlined">
            <FormatUnderlinedIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Stack>
  );
};

export default MUIButton;
