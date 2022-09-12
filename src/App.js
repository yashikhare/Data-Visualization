import React from "react";
import Bar from "./Components/Graphs/Bar";
import Scatter from "./Components/Graphs/Scatter";
import Header from "./Header/Header";

function Graph() {
  return (
    <div>
      <Header />
      <Bar />
      <Scatter />
    </div>
  );
}

export default Graph;
