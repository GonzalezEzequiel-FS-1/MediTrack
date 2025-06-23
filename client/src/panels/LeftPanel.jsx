import React from "react";
import styled from "styled-components";
import { CgHomeAlt } from "react-icons/cg";
import { MdOutlineSettings } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";

export default function LeftPanel({ height, background }) {
  return (
    <Container height={height} background={background}>
      <StyledIcon as={CgHomeAlt} />
      <StyledIcon as={MdOutlineSettings} />
      <StyledIcon as={FaCalendarAlt} />
    </Container>
  );
}

const Container = styled.div`
  height: ${(props) => props.height};
  background-color: ${(props) => props.background};
  border-radius: 10px;
  border: 0.75px solid #949494d1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  padding-top: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const StyledIcon = styled.div`
  font-size: 3rem;
  color: #ababab;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  &:hover {
    color: #737373;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  & > svg {
    width: 3rem;
    height: 3rem;
  }
`;
