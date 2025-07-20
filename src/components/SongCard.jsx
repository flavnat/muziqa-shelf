import React from "react";
import styled from "@emotion/styled";

const Card = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  color: #000080;
  border-radius: 12px;
  padding: 12px 16px;
  max-width: 600px;
  margin: 2px 10px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const AlbumArt = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #000080;
  flex-shrink: 0;
  margin-right: 16px;
`;

const Info = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TitleAlbum = styled.div`
  font-weight: 600;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Artist = styled.div`
  font-size: 0.875rem;
  opacity: 0.7;
  margin-top: 4px;
`;

const Year = styled.div`
  font-weight: 500;
  font-size: 1rem;
  flex-shrink: 0;
`;

const Gener = styled.div`
  font-size: 1rem;
  opacity: 0.7;
  margin-top: 4px;
`;

export default function SongCard({ title, album, artist, year, gener }) {
  return (
    <Card>
      <AlbumArt />
      <Info>
        <TitleAlbum>
          {title} | {album}
        </TitleAlbum>
        <Artist>{artist}</Artist>
      </Info>
      <Info>
        <Year>{year}</Year>
        <Gener>{gener}</Gener>
      </Info>
    </Card>
  );
}
