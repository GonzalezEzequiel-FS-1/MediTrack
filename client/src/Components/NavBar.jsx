import React from "react";
import styled from "styled-components";
import NavLinks from "./NavLinks";

export default function NavBar() {
  return (
    <MainContainer>
      <NavLinks linkTo="/signin" text="Hello" />
      <Divider />
      <NavLinks linkTo="/signup" text="This" />
      <Divider />
      <NavLinks linkTo="/signup" text="This" />
      <Divider />
      <NavLinks linkTo="/signup" text="This" />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: fit-content;
  padding: 0.5%;
  position: fixed;
  bottom: 1rem;
  display: flex;
  gap: 0.5rem;
  justify-content: space-around;
  align-items: center;
  background-color: #83838313;
  border-radius: 60px;
  box-shadow: 10px 5px 5px #00000039;
`;
const Divider = styled.div`
  width:.15rem;
  height:.15rem;
  background-color: #00000065;
  border-radius: 50%;
`