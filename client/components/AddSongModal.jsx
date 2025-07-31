import React, { useState } from "react";
import styled from "styled-components";
import BaseModal from "./BaseModal";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: -12px;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  padding: 10px 16px;
  background-color: #6e7f6e;
  color: white;
  border: none;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: #436445;
  }
`;

const ModalContainer = styled.div`
  width: 400px;
  max-width: 90vw;
  background: #222;
  color: #fff;
  border-radius: 12px;
  padding: 24px 32px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 600px) {
    width: 98vw;
    padding: 16px 8px;
    gap: 1rem;
  }
`;

const ModalTitle = styled.h2`
  margin: 0 0 12px 0;
  font-size: 1.5rem;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

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

export default function AddSongModal({ onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!artist) newErrors.artist = "Artist is required";
    if (!album) newErrors.album = "Album is required";
    if (!genre) newErrors.genre = "Genre is required";
    if (!year) newErrors.year = "Year is required";
    else if (!/^\d{4}$/.test(year)) newErrors.year = "Enter a valid year (e.g., 2024)";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onAdd({ title, artist, album, genre, year: parseInt(year) });
    onClose();
  };

  return (
    <BaseModal title="Add New Song" subTitle={"make sure all filed are required"} onClose={onClose}>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          hasError={!!errors.title}
        />
        {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}

        <Input
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          hasError={!!errors.artist}
        />
        {errors.artist && <ErrorMessage>{errors.artist}</ErrorMessage>}

        <Input
          placeholder="Album"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          hasError={!!errors.album}
        />
        {errors.album && <ErrorMessage>{errors.album}</ErrorMessage>}

        <Input
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          hasError={!!errors.genre}
        />
        {errors.genre && <ErrorMessage>{errors.genre}</ErrorMessage>}

        <Input
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          hasError={!!errors.year}
          type="text"
        />
        {errors.year && <ErrorMessage>{errors.year}</ErrorMessage>}

        <SubmitButton type="submit">Add Song</SubmitButton>
      </Form>
    </BaseModal>
  );
}