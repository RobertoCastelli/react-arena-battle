import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import Title from "./components/Title";
import ChampionList from "./components/ChampionList";

function App() {
  return (
    <div className="container">
      <div className="content">
        <Title />
        <ChampionList />
      </div>
      <Footer />
    </div>
  );
}

export default App;
