import React from "react";
import styled from "@emotion/styled";

const ClippedHeader = styled.div`
  background-color: #e96375;
  color: white;
  padding: 2.5rem 1.5rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  //   clip-path: polygon(0 0, 100% 0, 100% 65%, 0 100%);
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
`

export default function Header() {
  return (
    <ClippedHeader>
      <HeaderText>muziqa shelf</HeaderText>
      <SubHeaderText>Manage Your Music Library Effortlessly</SubHeaderText>
    </ClippedHeader>
  );
}
