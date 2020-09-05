import React, { Component } from "react";
// import PropTypes from "prop-types";
import { Button } from "antd";
import styles from "./styles.css";
import InputLabel from "./Input";
import "antd/dist/antd.css";

export default class ExampleComponent extends Component {
  // static propTypes = {
  //   text: PropTypes.string
  // };

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <InputLabel />
      </div>
    );
  }
}
