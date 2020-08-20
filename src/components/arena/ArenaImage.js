import React from "react";
import bgArena from "../../images/bg-arena.png";
import arenaStyle from "./arena.module.css";

const ArenaImage = () => {
  return (
    <div>
      <img
        className={arenaStyle.arenaBackground}
        src={bgArena}
        alt="bg-arena"
      />
    </div>
  );
};

export default ArenaImage;
