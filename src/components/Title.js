import React from "react";

const Title = (props) => {
  return (
    <header>
      <h1>
        <span style={{ color: "cadetblue" }}>React</span> Battle Simulator
      </h1>
      <hr />
      <h3>{props.title}</h3>
    </header>
  );
};

export default Title;
