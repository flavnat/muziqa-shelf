import styled from '@emotion/styled';
import React from 'react';


const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
`;

const Button = styled.button`
  margin: 10px 5px;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
`;

export default function DeleteSongModal({ songId, onClose, onDelete }) {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h3>Are you sure you want to delete this song?</h3>
        <Button style={{ background: 'red' }} onClick={() => onDelete(songId)}>Delete</Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalContent>
    </ModalOverlay>
  );
}