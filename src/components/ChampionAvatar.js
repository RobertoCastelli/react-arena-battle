import React from "react";
import championAvatarStyle from "./championAvatar.module.css";

const ChampionAvatar = (props) => {
  return (
    <div className={championAvatarStyle.avatarWrapper}>
      <img
        className={championAvatarStyle.avatarImage}
        src="https://via.placeholder.com/100"
        alt="avatar"
      />
      <p className={championAvatarStyle.avatarName}>{props.name}</p>
    </div>
  );
};

export default ChampionAvatar;
