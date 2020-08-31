import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ChampionList from "./components/ChampionList";
import Arena from "./components/arena/Arena";
import Footer from "./components/Footer";
import PageDefault from "./components/PageDefault";
import ContextProvider from "./context";
import Modal from "./components/Modal";

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
 * FIXME:
 * add CSS animation to hit
 * add CSS animation appear on every spawn enemy
 * update death sequence
 * update win sequence
 * add sounds
 * calibrate DMG DEF REST
 * add no def < 0
 * add no hit with 0 energy
 *
 */
