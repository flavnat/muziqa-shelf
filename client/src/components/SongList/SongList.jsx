import React from "react";
import SongCard from "../SongCard/SongCard";
import { SongListContainer } from "./SongList.styles";

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
