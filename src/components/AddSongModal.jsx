import styled from "@emotion/styled";
import React, { useState } from "react";

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
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
`;

const Input = styled.input`
  width: 100%;
  margin: 8px 0;
  padding: 8px;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 8px 12px;
  background: #333;
  color: white;
  border: none;
  cursor: pointer;
`;

export default function AddSongModal({ onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = () => {
    if (!title || !artist || !album || !year) return;
    onAdd({ title, artist, album, year: parseInt(year) });
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h3>Add New Song</h3>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <Input
          placeholder="Album"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
        />
        <Input
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <Button onClick={handleSubmit}>Add Song</Button>
      </ModalContent>
    </ModalOverlay>
  );
}
