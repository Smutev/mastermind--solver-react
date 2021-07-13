import React, { Component } from "react";
import ColorPoint from "../color-point";

import { COLORS, START_VALUE, MAX_CYCLES } from "../../constants/constants";
import Result from "../result";
import convertColorsToNumber from "../../helpers/colors-to-number";
import createSet from "../../helpers/create-set";
import getBlackWhiteResult from "../../helpers/get-black-white-result";
import removeExtraValues from "../../helpers/remove-extra-values";

import "./app.css";

export default class App extends Component {
  possibleValues = createSet();
  maxId = 100;
  points = COLORS.map((color, i) => this.createPoint(i, color, true));

  state = {
    selectedPoints: [],
    hiddenPoints: [],
    steps: 0
  };

  selectColor(color) {
    if (this.state.selectedPoints.length < 4) {
      this.setState(({ selectedPoints }) => {
        return {
          selectedPoints: [
            ...selectedPoints,
            this.createPoint(this.maxId++, color)
          ]
        };
      });
    }
  }

  deleteColor(id) {
    this.setState(({ selectedPoints }) => {
      const idx = selectedPoints.findIndex(point => +point.key === id);
      const before = selectedPoints.slice(0, idx);
      const after = selectedPoints.slice(idx + 1);

      return {
        selectedPoints: [...before, ...after],
        hiddenPoints: [],
        steps: 0
      };
    });
  }

  createPoint(i, color, isAdded) {
    return (
      <ColorPoint
        key={i}
        color={color}
        onColorClick={() =>
          isAdded ? this.selectColor(color) : this.deleteColor(i)
        }
      />
    );
  }

  startGame() {
    let currentNumber = START_VALUE;
    let updatedSet = [...this.possibleValues];
    const hiddenNumber = convertColorsToNumber(this.state.selectedPoints);

    while (updatedSet.length !== 1 || this.state.steps < MAX_CYCLES) {
      let { black, white } = getBlackWhiteResult(hiddenNumber, currentNumber);
      updatedSet = removeExtraValues(updatedSet, currentNumber, black, white);
      currentNumber = updatedSet[0];
      this.setState({ steps: this.state.steps++ });
      if (updatedSet.length === 1) {
        if (this.state.steps === 1) {
          alert('Я нахожу нужное число, но не понимаю почему реакт его не подтягивает ' + updatedSet)
        }
        break;
      }
    }

    this.setState(({ hiddenPoints }) => {
      return {
        hiddenPoints: [...updatedSet]
      };
    });
  }

  restartGame() {
    this.setState(({ selectedPoints }) => {
      return {
        selectedPoints: [...selectedPoints.slice(-1, -1)],
        hiddenPoints: [],
        steps: 0
      };
    });
  }

  render() {
    return (
      <div className="app__container">
        <div>
          <h2 className="points__header">Select 4 colors</h2>
          <div className="points__container">{this.points}</div>
        </div>
        <div>
          <h2 className="points__header">Selected colors:</h2>
          <div className="points__container">{this.state.selectedPoints}</div>
        </div>
        <div className="app__button-block">
          <button
            className="app__button app__button--start"
            disabled={
              this.state.selectedPoints.length !== 4 ||
              this.state.hiddenPoints.length
            }
            onClick={() => this.startGame()}
          >
            Start game!
          </button>
          <button
            className="app__button app__button--end"
            onClick={() => this.restartGame()}
          >
            Restart game!
          </button>
        </div>
        {this.state.hiddenPoints.length && this.state.steps ? (
          <Result
            hiddenNumber={this.state.hiddenPoints}
            steps={this.state.steps}
          />
        ) : null}
      </div>
    );
  }
}
