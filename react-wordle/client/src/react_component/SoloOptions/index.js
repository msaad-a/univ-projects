import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import '../../App.js';

class SoloOptions extends React.Component {
  render() {

    return (
      <div className = "solo-options center">
          <div className = "options-bg center">
          <Link className = "op1-link" to = {{pathname: "./../SoloGame", state: {configNum: 1}}}>
            <Button className = "button solo-button">5 x 6</Button>
          </Link>
          <Link className = "op2-link" to = {{pathname: "./../SoloGame", state: {configNum: 2}}}>
            <Button className = "button solo-button">6 x 6</Button>
          </Link>
          <Link className = "op3-link" to = {{pathname: "./../SoloGame", state: {configNum: 3}}}>
            <Button className = "button solo-button">7 x 6</Button>
          </Link>
          </div>
          <Link className = "menu-link" to = {"./"}>
            <Button className = "button menu-button"> Menu </Button>
          </Link>
      </div>
    );
  }
}

export default SoloOptions;
