import React from "react";

const Title = (props) => {
  return (
    <header>
      <h1>
        <span style={{ color: "cadetblue" }}>React</span> Battle Simulator{" "}
      </h1>
      <hr />
      <p>{props.title}</p>
    </header>
  );
};

export default Title;
