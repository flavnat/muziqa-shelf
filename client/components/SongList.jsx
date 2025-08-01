import React from "react";
import SongCard from "./SongCard";
import styled from "styled-components";

const SongListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1rem;

  @media (max-width: 600px) {
    gap: 0.5rem;
    padding: 0 0.5rem;
  }
`;

export default function SongList({ songs, onEdit, onDelete }) {
  return (
    <SongListContainer>
      {songs.map((song, index) => (
        <SongCard
          key={index}
          title={song.title}
          album={song.album}
          artist={song.artist}
          year={song.year}
          genre={song.genre}
          onEdit={() => onEdit(song)}
          onDelete={() => onDelete(song._id)}
        />
      ))}
    </SongListContainer>
  );
}
