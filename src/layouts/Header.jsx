import React from "react";
import styled from "styled-components";

const ClippedHeader = styled.div`
  background-color: none;
  color: white;
  padding: 0 1.5rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  /* clip-path: polygon(0 0, 100% 0, 100% 65%, 0 100%); */
  position: relative;
`;

const HeaderText = styled.h1`
  font-weight: 500;
  text-transform: uppercase;
  font-size: 2.5rem;
  letter-spacing: 0.1em;
`;

const SubHeaderText = styled.h2`
  font-weight: 300;
  font-size: 1.3rem;
`;

const HeaderContainer = styled.header`
  width: 100%;
  background: #333;
  color: #fff;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 14px 10px;
    gap: 8px;
  }
`;

export default function Header() {
  return (
    <ClippedHeader>
      <>
        <HeaderText>muziqa shelf</HeaderText>
        <SubHeaderText>Manage Your Music Library Effortlessly</SubHeaderText>
      </>
    </ClippedHeader>
  );
}
