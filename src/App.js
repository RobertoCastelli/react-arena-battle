import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ChampionList from "./components/ChampionList";
import Arena from "./components/arena/Arena";
import Footer from "./components/Footer";
import PageDefault from "./components/PageDefault";
import Modal from "./components/Modal";
import ContextProvider from "./context";

function App() {
  return (
    <Router>
      <div className="container">
        <div className="content">
          <ContextProvider>
            <Switch>
              <Route exact path="/" component={ChampionList} />
              <Route path="/arena" component={Arena} />
              <Route component={PageDefault} />
            </Switch>
            <Modal />
          </ContextProvider>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

/**
 * TODO:
 * update death sequence
 * update win sequence
 * add initiative w/ speed check
 * add RIP
 * add more enemies
 * make it for cells
 */
