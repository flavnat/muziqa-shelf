import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Header from "./layouts/Header";
import SongCard from "./components/SongCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addSongFetch,
  deleteSongFetch,
  editSongFetch,
  getSongsFetch,
  setPage,
} from "./features/songs/slice";
import AddSongModal from "./components/AddSongModal";
import EditSongModal from "./components/EditSongModal";
import DeleteSongModal from "./components/DeleteSongModal";

function App() {
  const dispatch = useDispatch();
  const { songs, loading, error, page, totalPages, isAddingSong } = useSelector(
    (state) => state.songs
  );

  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, [songs]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    console.log("Songs updated in App.jsx:", songs);
  }, [songs]);

  useEffect(() => {
    dispatch(getSongsFetch({ page }));
  }, [dispatch, page]);

  const handleNext = () => {
    if (page < totalPages) dispatch(setPage(page + 1));
  };

  const handlePrev = () => {
    if (page > 1) dispatch(setPage(page - 1));
  };

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

  if (loading) return <p style={{ background: yellow }}>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div
        style={{ background: "#333333", color: "#ffffff", minHeight: "100vh" }}
      >
        <button onClick={() => setIsModalOpen(true)}>Add Song</button>

        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <tr key={song.id}>
                <td>{song.title}</td>
                <td>{song.artist}</td>
                <td>{song.album}</td>
                <td>{song.year}</td>
                <td>
                  <button onClick={() => handleEditSong(song)}>Edit</button>
                  <button onClick={() => handleDeleteSong(song.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <button onClick={handlePrev} disabled={page === 1}>
            Previous
          </button>
          <span>
            {" "}
            Page {page} of {totalPages}{" "}
          </span>
          <button onClick={handleNext} disabled={page === totalPages}>
            Next
          </button>
        </div>
      </div>
      {isModalOpen && (
        <AddSongModal
          onClose={() => setIsModalOpen(false)}
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

export default App;
