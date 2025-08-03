import React from "react";
import { ModalContent, ModalOverlay, SubTitle, Title } from "./Modal.styles";
export default function Modal({ title, subTitle, onClose, children }) {
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
