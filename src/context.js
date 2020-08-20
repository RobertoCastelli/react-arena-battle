import React, { useState, createContext } from "react";
import { champions } from "./data";

export const Context = createContext();

const ContextProvider = (props) => {
  //--> GLOBAL STATE
  const [modalState, setModalState] = useState(false);
  const [modal, setModal] = useState(champions);

  //--> GET SELECTED CHAMPION OBJECT
  const getChampion = (champName) => {
    const champion = champions.filter((champ) => champ.name === champName);
    return champion;
  };

  //--> OPEN CHAMPION MODAL CARD
  const openModal = (champName) => {
    const champion = getChampion(champName);
    return setModal(champion), setModalState(true);
  };

  //--> CLOSE CHAMPION MODAL CARD
  const closeModal = () => setModalState(false);

  //--> SHOW RULES
  const showRules = () => alert("Survive all 10 levels, with one life only");

  //--> RENDER
  return (
    <Context.Provider
      value={{
        modal,
        setModal,
        modalState,
        setModalState,
        getChampion,
        openModal,
        closeModal,
        showRules,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
