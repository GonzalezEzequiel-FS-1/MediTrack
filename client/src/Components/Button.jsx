import styled from "styled-components";

export default function DefaultButton({ onClick, text }) {
  return (
    <Button type="button" onClick={onClick}>
      {text}
    </Button>
  );
}

const Button = styled.button`
  border: 0.75px solid #949494d1;
  border-radius: 5px;
  padding: 0.25rem 0.5rem;
  background-color: #333333a2;
  font-weight: 300;
  letter-spacing: 0.15rem;
  font-size: 2rem;
  cursor: pointer;
  color: #ffffff;
  transition: all 0.15s ease-in-out;
  &:hover {
    background-color: #171717e4;
    font-weight: 700;
    letter-spacing: 0.05rem;
  }
  &:active {
    transform: scale(0.95);
  }
`;
