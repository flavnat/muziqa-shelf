import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  background: #545050;
  padding: 24px;
  border-radius: 12px;
  width: 320px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
  color: white;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #ffffff;
`;

const SubTitle = styled.h4`
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: #cccccc;
`;

export default function BaseModal({ title, subTitle, onClose, children }) {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {title && <Title>{title}</Title>}
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
        {children}
      </ModalContent>
    </ModalOverlay>
  );
}
