import styled from "@emotion/styled";
import React from "react";
import Header from "./layouts/Header";
import SongCard from "./components/SongCard"

function App() {
  return (
    <>
      <div style={{ background: "#f9f5f5ff", minHeight: "100vh" }}>
        <Header />
        <SongCard title={"Shape of You"} album={"Divide"} artist={"Ed Sheeran"} year={2017} gener={"Rock"} />
      </div>
    </>
  );
}

export default App;
