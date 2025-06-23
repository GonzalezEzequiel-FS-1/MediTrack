import React from "react";
import styled from "styled-components";

export default function CenterPanel({ height, background }) {
  return (
    <Container
    
      height={height}
      background={background}
    ></Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: ${(props) => props.height};
  background-color: ${(props) => props.background};
  border-radius: 10px;
  border: 0.75px solid #949494d1;
`;
