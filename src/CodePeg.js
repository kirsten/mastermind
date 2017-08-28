import React, { Component } from 'react';
import './CodePeg.css';

class CodePeg extends Component {
  render() {
    return (
      <div
        className={`code-peg ${this.props.active ? 'active' : ''}`}
        style={{backgroundColor: this.props.color}}
        onClick={() => this.props.onClick()}
      ></div>
    );
  }
}

export default CodePeg;
