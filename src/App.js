import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Title from "./components/Title";
import ChampionList from "./components/ChampionList";
import Modal from "./components/Modal";
import Arena from "./Arena";
import Footer from "./components/Footer";
import PageDefault from "./components/PageDefault";

function App() {
  return (
    <Router>
      <div className="container">
        <div className="content">
          <Title />
          <Switch>
            <Route exact path="/" component={ChampionList} />
            <Route path="/arena" component={Arena} />
            <Route path="/modal" component={Modal} />
            <Route component={PageDefault} />
          </Switch>
          <Modal />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
