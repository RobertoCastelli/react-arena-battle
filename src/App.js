import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import Title from "./components/Title";
import ChampionSelect from "./components/ChampionSelect";

function App() {
  return (
    <div className="container">
      <div className="content">
        <Title />
        <ChampionSelect />
      </div>
      <Footer />
    </div>
  );
}

export default App;
