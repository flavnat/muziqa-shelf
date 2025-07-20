import React from "react";
import styled from "styled-components";
import BaseModal from "./BaseModal";

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`;

const Message = styled.p`
  font-size: 1rem;
  margin-bottom: 0;
  text-align: center;
  color: #ccc;
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: -12px;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  padding: 10px 16px;
  background-color: #e74c3c;
  color: white;
  border: none;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: #c0392b;
  }
`;

const CancelButton = styled(SubmitButton)`
  background-color: #777;

  &:hover {
    background-color: #555;
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.5rem;
    button {
      width: 100%;
      font-size: 1rem;
      padding: 10px 0;
    }
  }
`;

export default function DeleteSongModal({ songId, onClose, onDelete }) {
  return (
    <BaseModal title="Delete Song" subTitle={"This action cannot be undone."} onClose={onClose}>
      <>
        {/* <ModalTitle>Confirm Deletion</ModalTitle> */}
        {/* <Message>Are you sure you want to delete this song?</Message> */}
        <ModalActions>
          <SubmitButton onClick={() => onDelete(songId)}>Delete</SubmitButton>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
        </ModalActions>
      </>
    </BaseModal>
  );
}