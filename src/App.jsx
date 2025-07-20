import styled from "@emotion/styled";
import React, { useEffect } from "react";
import Header from "./layouts/Header";
import SongCard from "./components/SongCard";
import { useDispatch, useSelector } from "react-redux";
import { getSongsFetch , setPage } from "./songState";

function App() {
  const dispatch = useDispatch();
  const { songs, loading, error, page, totalPages } = useSelector(
    (state) => state.songs
  );

  useEffect(() => {
    dispatch(getSongsFetch({ page }));
  }, [dispatch, page]);

  const handleNext = () => {
    if (page < totalPages) dispatch(setPage(page + 1));
  };

  const handlePrev = () => {
    if (page > 1) dispatch(setPage(page - 1));
  };

  if (loading) return <p style={{background: yellow}}>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div
        style={{ background: "#333333", color: "#ffffff", minHeight: "100vh" }}
      >
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
    </>
  );
}

export default App;
