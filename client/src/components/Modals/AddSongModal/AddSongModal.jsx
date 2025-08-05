import { useState } from "react";
import Modal from "../Modal";
import { ErrorMessage, Form, Input, SubmitButton } from "./AddSongModal.styles";

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
    <Modal title="Add New Song" subTitle={"make sure all filed are required"} onClose={onClose}>
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
    </Modal>
  );
}