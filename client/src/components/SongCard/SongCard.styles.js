import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  border-radius: 12px;
  overflow: hidden;
  flex-direction: row;

  &:hover .actions {
    opacity: 1;
    transform: translateX(0);
    pointer-events: auto;
  }
`;

export const Card = styled.div`
  display: flex;
  align-items: center;
  background-color: #545050;
  color: white;
  flex-grow: 1;
  padding: 12px 16px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const AlbumArt = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 56px;
    height: 56px;
    transition: transform 1s linear;
  }

  ${Wrapper}:hover & svg {
    animation: spin 4s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 600px) {
    margin-right: 0;
    margin-bottom: 10px;
    align-self: center;
  }
`;

export const InfoLeft = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const TitleAlbum = styled.div`
  font-weight: 600;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 600px) {
    font-size: 0.95rem;
  }
`;

export const Artist = styled.div`
  font-size: 0.875rem;
  opacity: 0.7;
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 600px) {
    font-size: 0.85rem;
  }
`;

export const InfoRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  min-width: 80px;
  margin-left: 16px;

  @media (max-width: 600px) {
    align-items: flex-start;
    margin-left: 0;
    margin-top: 8px;
  }
`;

export const Year = styled.div`
  font-weight: 500;
  font-size: 1rem;
`;

export const Gener = styled.div`
  font-size: 1rem;
  opacity: 0.7;
  margin-top: 4px;

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

export const ActionButton = styled.div`
  width: 70px;
  background-color: #444;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  opacity: 0;
  transform: translateX(-10px);
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
  color: white;
  font-size: 0.85rem;
  gap: 4px;
  padding: 0 8px;

  & > button {
    background-color: transparent;
    border: none;
    color: white;
    cursor: pointer;
    padding: 8px 10px;
    border-radius: 6px;
    transition: background-color 0.2s ease;
    font-size: 1rem;
    width: 70px;
  }
`;

export const DeleteButton = styled.button`
  background-color: #e53935;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 8px 10px;
  font-size: 1rem;
  min-width: 60px;
  transition: background 0.2s;

  &:hover {
    background-color: #b71c1c;
  }
`;

export const EditButton = styled.button`
  background-color: #a4a1a1;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 8px 10px;
  font-size: 1rem;
  min-width: 60px;
  transition: background 0.2s;

  &:hover {
    background-color: #817f7f;
  }
`;
