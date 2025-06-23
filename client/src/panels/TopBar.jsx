import React from "react";
import styled from "styled-components";

export default function TopBar({ background }) {
  return <MainContainer background={background}></MainContainer>;
}

const MainContainer = styled.div`
  height: 4rem;
  width: 100%;
  background-color: ${(props) => props.background};
  border-radius: 10px;
  border: 0.75px solid #949494d1;
`;
