import React, { useEffect, useState } from "react";
import {
  DashboardContainer,
  ListWrapper,
  SongsHeader,
  TextContainer,
  AddButton,
} from "./Dashboard.styles";
import SongList from "../../components/SongList/SongList";
import Pagination from "../../components/Pagination";
import Loader from "../../components/Loader";

import { useDispatch, useSelector } from "react-redux";
import {
  addSongFetch,
  deleteSongFetch,
  editSongFetch,
  getSongsFetch,
  setPage,
} from "./../../features/songs/slice";
import AddSongModal from "../../components/Modals/AddSongModal/AddSongModal";
import EditSongModal from "../../components/Modals/EditSongModal/EditSongModal";
import DeleteSongModal from "../../components/Modals/DeleteSongModal/DeleteSongModal";

function Dashboard() {
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
      <DashboardContainer>
        <ListWrapper>
          <SongsHeader>
            {/* Left: Text */}
            <TextContainer>
              <h1>Song Lists</h1>
              <h2>Manage Your Songs Effortlessly</h2>
            </TextContainer>
            <AddButton onClick={() => setIsAddModalOpen(true)}>
              + Add Song
            </AddButton>
          </SongsHeader>

          {/* Song list */}
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
        </ListWrapper>
      </DashboardContainer>

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

export default Dashboard;
