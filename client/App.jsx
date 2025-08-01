import styled from "styled-components";
import React, { useEffect, useState } from "react";
import Header from "./layouts/Header";
import SongCard from "./components/SongCard";
import SongList from "./components/SongList";
import AddSongModal from "./components/AddSongModal";
import Pagination from "./components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { addSongFetch, deleteSongFetch, editSongFetch, getSongsFetch, setPage } from "./features/songs/slice";
import Loader from "./components/Loader";
import EditSongModal from "./components/EditSongModal";
import DeleteSongModal from "./components/DeleteSongModal";
import Footer from "./layouts/Footer";

const Page = styled.div`
  background: #333333;
  color: #ffffff;
  min-height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 650px;
`;
const AddButton = styled.button`
  background-color: #6e7f6e;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 1rem;
  font-weight: 600;
  align-self: flex-end;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #436445;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 500px) {
    align-self: stretch;
  }
`;

export default function App() {
  const dispatch = useDispatch();
  const { songs, loading, error, page, totalPages, isAddingSong, isLoading } =
    useSelector((state) => state.songs);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(getSongsFetch({ page }));
    console.log(songs);
  }, [dispatch, page]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleAddSong = (song) => {
    dispatch(addSongFetch(song));
  };

  const handleEditSong = (song) => {
    setSelectedSong(song);
    setIsEditModalOpen(true);
  };

  const handleConfirmEdit = (updatedSong) => {
    dispatch(editSongFetch(updatedSong));
    setIsEditModalOpen(false);
  };

  const handleDeleteSong = (songId) => {
    setSelectedSong({ id: songId });
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = (songId) => {
    dispatch(deleteSongFetch(songId));
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <Page>
        <ContentWrapper>
          <HeaderWrapper>
            <Header />
            <AddButton onClick={() => setIsAddModalOpen(true)}>
              {" "}
              + Add Song
            </AddButton>
          </HeaderWrapper>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <SongList
                songs={songs}
                onEdit={handleEditSong}
                onDelete={handleDeleteSong}
              />
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={(newPage) => dispatch(setPage(newPage))}
              />
            </>
          )}
        </ContentWrapper>
        {/* <Footer /> */}
      </Page>

      {isAddModalOpen && (
        <AddSongModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddSong}
        />
      )}

      {isEditModalOpen && selectedSong && (
        <EditSongModal
          song={selectedSong}
          onClose={() => setIsEditModalOpen(false)}
          onEdit={handleConfirmEdit}
        />
      )}

      {isDeleteModalOpen && selectedSong && (
        <DeleteSongModal
          songId={selectedSong.id}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={handleConfirmDelete}
        />
      )}

    </>
  );
}
