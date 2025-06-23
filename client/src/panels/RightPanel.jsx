import React from "react";
import styled from "styled-components";

export default function RightPanel({ width, height, background }) {
  return (
    <Container
      height={height}
      background={background}
    >
      <Calendar></Calendar>
    </Container>
  );
}

const Container = styled.div`
  width: 30%;
  height: ${(props) => props.height};
  background-color: ${(props) => props.background};
  border-radius: 10px;
  border: 0.75px solid #949494d1;
  padding:1rem;
`;

const Calendar = styled.div`
  width:100%;
  height:40%;
  background-color: red;
  border-radius: 10px;
`