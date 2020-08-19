import React from "react";
import championAvatarStyle from "./championAvatar.module.css";

const ChampionAvatar = (props) => {
  return (
    <div className={championAvatarStyle.avatarWrapper}>
      <img
        className={championAvatarStyle.avatarImage}
        src={props.src}
        alt="avatar"
        onClick={props.onClick}
      />
      <p className={championAvatarStyle.avatarName}>{props.name}</p>
    </div>
  );
};

export default ChampionAvatar;
