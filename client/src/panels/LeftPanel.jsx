import React from "react";
import styled from "styled-components";
import { CgHomeAlt } from "react-icons/cg";
import { MdOutlineSettings } from "react-icons/md";
import { FaCalendarAlt, FaBell, FaHome } from "react-icons/fa";
import { FaGears } from "react-icons/fa6";

export default function LeftPanel({ height, background }) {
  return (
    <Container height={height} background={background}>
      <StyledIcon as={FaHome} />
      <StyledIcon as={FaGears} />
      <StyledIcon as={FaCalendarAlt} />
      <StyledIcon as={FaBell} />
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
  filter: drop-shadow(2px 2px 5px #000000);
  transition: all 0.05s ease-in-out;
  &:hover {
    color: #737373;
  }
  &:active {
    transform: scale(0.95);
  }
  display: flex;
  align-items: center;
  justify-content: center;
  & > svg {
    width: 3rem;
    height: 3rem;
  }
`;
