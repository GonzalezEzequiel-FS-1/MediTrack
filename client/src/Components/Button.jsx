import styled from "styled-components";
import Button from "@mui/material/Button";

const StyledButton = styled(Button)`
  background-color: #00bcd4;
  font-size: 1.2rem;

  &:hover {
    background-color: #0097a7;
  }
`;

export default function ButtonUsage() {
  return <StyledButton variant="outlined">Hello Styled World</StyledButton>;
}
