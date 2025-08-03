import React from "react";
import {
  ActionButton,
  AlbumArt,
  Artist,
  Card,
  DeleteButton,
  EditButton,
  Gener,
  InfoLeft,
  InfoRight,
  TitleAlbum,
  Wrapper,
  Year,
} from "./SongCard.styles";
export default function SongCard({
  title,
  album,
  artist,
  year,
  genre,
  onEdit,
  onDelete,
}) {
  return (
    <Wrapper>
      <Card>
        <AlbumArt> {/* <CdIcon />{" "} */}</AlbumArt>
        <InfoLeft>
          <TitleAlbum>
            {title} | {album}
          </TitleAlbum>
          <Artist>{artist}</Artist>
        </InfoLeft>
        <InfoRight>
          <Year>{year}</Year>
          <Gener>{genre}</Gener>
        </InfoRight>
      </Card>
      <ActionButton className="actions">
        <EditButton onClick={onEdit}>Edit</EditButton>
        <DeleteButton onClick={onDelete}>Delete</DeleteButton>
      </ActionButton>
    </Wrapper>
  );
}
