import React from "react";

const Title = (props) => {
  return (
    <header>
      <h1>Arena Battle Simulator</h1>
      <hr />
      <p>{props.title}</p>
    </header>
  );
};

export default Title;
