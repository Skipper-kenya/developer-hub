import React from "react";
import "./spinner.css";

import spinner from "./spinner.gif";

const Spinner = () => {
  return (
    <div className="spinnerHolder">
      <img src={spinner} alt="A loading spinner" />
    </div>
  );
};

export default Spinner;
