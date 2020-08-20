import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

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
