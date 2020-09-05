import React, { Component } from "react";
import { Input } from "antd";
import "./styles.scss";
import styles from "./styles.css";

export default class InputLabel extends Component {
  state = {
    focusInput: true,
  };

  onblurInput = () => {
    this.setState({
      focusInput: false,
    });
  };
  focusInput = () => {
    this.setState({
      focusInput: true,
    });
  };

  render() {
    const { focusInput } = this.state;
    console.log("focusInput", focusInput);
    return (
      <div className={styles.boxInputLabel}>
        <Input
          className={styles.inputLable}
          onBlur={this.onblurInput}
          onFocus={this.focusInput}
          placeholder={!focusInput && "Nhập Input"}
          {...this.props}
        />
        {focusInput && <span className={styles.labelBorder}>Nhập Input</span>}
      </div>
    );
  }
}
