import React, { Component } from "react";
import { COLORS_DICTIONARY } from "../../constants/constants";

import "./result.css";
import ColorPoint from "../color-point";

export default class Result extends Component {
  createPoint(i, color) {
    return <ColorPoint key={i} color={color} />;
  }
  render() {
    const { steps, hiddenNumber } = this.props;
    const hiddenPoints = [...hiddenNumber[0]]
      .map(number => COLORS_DICTIONARY[number])
      .map((color, i) => this.createPoint(i, color));

    return (
      <div className="app__counter">
        <div className="app__container">
          <h2 className="points__header">Hidden colors:</h2>
          <div className="points__container">{hiddenPoints}</div>
        </div>
        <span>The algorithm was solved in {steps} steps</span>
      </div>
    );
  }
}
