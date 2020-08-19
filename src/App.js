import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Title from "./components/Title";
import ChampionList from "./components/ChampionList";
import Arena from "./Arena";
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
            <Title />
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
