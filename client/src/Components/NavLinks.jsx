import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function NavLinks({ linkTo }) {
  return <LinkText to={linkTo}></LinkText>;
}

const LinkText = styled(Link)`
  font-size: 2rem;
  color: #dedede;
  background-color: #2a2a2a;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  transition: all 0.5s ease-in-out;
  &:hover {
    width: 2.5rem;
    height:2.5rem;
  }
`;
